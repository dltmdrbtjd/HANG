import React, { useState, useRef } from 'react';
import { DateRange } from 'react-date-range';
// material
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// format
import * as locales from 'react-date-range/dist/locale';
import * as dateFns from 'date-fns';
// elements
import { Button, Grid, SubTitle } from '../../elements';
// style
import './calendar.css';

const Calendar = ({ setSelectDate }) => {
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
      dateInfo: dateFns.format(date[0].startDate, 'yyyy-MM-dd'),
      ref: startDateRef,
    },
    {
      title: '종료일',
      dateInfo: dateFns.format(date[0].endDate, 'yyyy-MM-dd'),
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
          />
        </ClickAwayListener>
      ) : null}
    </Grid>
  );
};

export default Calendar;
