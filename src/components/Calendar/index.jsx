import React, { useState, useRef } from 'react';
import { DateRange } from 'react-date-range';
// redux
import { useSelector } from 'react-redux';
// material
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// format
import * as locales from 'react-date-range/dist/locale';
import moment from 'moment';
// elements
import { Button, Grid, SubTitle } from '../../elements';
// style
import './calendar.css';

const Calendar = ({ setSelectDate }) => {
  const tripList = useSelector(state => state.mypage.tripList);
  const format = 'YYYY-MM-DD';

  const disabledDates = tripList.reduce((acc, cur) => {
    acc.push({
      startDate: moment.utc(cur.startDate).format(format),
      endDate: moment.utc(cur.endDate).format(format),
    });
    return acc;
  }, []);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [open, setOpen] = useState(false);

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const dateInterval = [
    {
      title: '시작일',
      dateInfo: moment(date[0].startDate).format(format),
      ref: startDateRef,
    },
    {
      title: '종료일',
      dateInfo: moment(date[0].endDate).format(format),
      ref: endDateRef,
    },
  ];

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (
      (startDateRef.current && startDateRef.current.contains(event.target)) ||
      (endDateRef.current && endDateRef.current.contains(event.target))
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid position="relative">
      <Grid display="flex" hoz="space-between">
        {dateInterval.map((dateInfo, idx) => (
          <Grid
            key={(idx / Date.now() + Math.random()).toString(36)}
            width="48%"
          >
            <SubTitle fs="la" margin="0 0 12px">
              {dateInfo.title}
            </SubTitle>

            <Button
              _onClick={handleToggle}
              bgColor="white"
              width="100%"
              color="black"
              shadow="none"
              border="0.5px solid #E7E7E7"
              ref={dateInfo.ref}
            >
              {dateInfo.dateInfo}
            </Button>
          </Grid>
        ))}
      </Grid>

      {open ? (
        <ClickAwayListener onClickAway={handleClose}>
          <DateRange
            locale={locales.ko}
            showMonthAndYearPickers={false}
            showDateDisplay={false}
            onChange={selectDate => {
              setDate([selectDate.selection]);
              setSelectDate([selectDate.selection]);
            }}
            moveRangeOnFirstSelection={false}
            minDate={new Date()}
            ranges={date}
            rangeColors={['#D4F0FF']}
            direction="horizontal"
            disabledDay={current => {
              return disabledDates.some(disabledDate => {
                const curDate = moment(current).format(format);

                return moment(curDate).isBetween(
                  moment(disabledDate.startDate).format(format),
                  moment(disabledDate.endDate).format(format),
                );
              });
            }}
          />
        </ClickAwayListener>
      ) : null}
    </Grid>
  );
};

export default Calendar;
