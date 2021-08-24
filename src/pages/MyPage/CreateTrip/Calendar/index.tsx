import React from 'react';
import { DateRange } from 'react-date-range';
// redux
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/configureStore';
// material
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// format
import * as locales from 'react-date-range/dist/locale';
import moment from 'moment';
// elements
import { Button, Grid, Span, Image } from '../../../../elements';
// style
import './calendar.css';
// image
import Arrow from '../../../../Images/arrow.svg';

const Calendar = ({ setSelectDate }) => {
  const tripList: any = useSelector<RootState>(
    (state) => state.mypage.tripList,
  );
  const today = new Date();
  const format = 'YYYY-MM-DD';

  const disabledDates = tripList.reduce((acc, cur) => {
    acc.push({
      startDate: moment.utc(cur.startDate).format(format),
      endDate: moment.utc(cur.endDate).format(format),
    });

    return acc;
  }, []);

  const [date, setDate] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(today.setDate(today.getDate() + 1)),
      key: 'selection',
    },
  ]);

  const [open, setOpen] = React.useState(false);
  const [angle, setAngle] = React.useState(0);

  const dateRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    setAngle(angle ? 0 : 180);
  };

  const handleClose = (e: React.MouseEvent<Document, MouseEvent>) => {
    if (dateRef.current && dateRef.current.contains(e.target)) {
      return;
    }

    setOpen(false);
    setAngle(0);
  };

  return (
    <Grid position="relative">
      <Grid isFlex hoz="space-between">
        <Button
          _onClick={handleToggle}
          bgColor="white"
          color="black"
          shadow="none"
          border="0.5px solid #E7E7E7"
          fw="lg"
          ref={dateRef}
          isFlex
          hoz="space-between"
          ver="center"
          padding="13px 15px 13px 45px"
        >
          <Span fw="regular">{moment(date[0].startDate).format(format)}</Span>

          <Span fw="regular" margin="0 50px">
            -
          </Span>

          <Span fw="regular" margin="0 20px 0 0">
            {moment(date[0].endDate).format(format)}
          </Span>

          <Image width="10px" src={Arrow} alt="arrow button" />
        </Button>
      </Grid>

      {open ? (
        <ClickAwayListener onClickAway={handleClose}>
          <DateRange
            locale={locales.ko}
            showMonthAndYearPickers={false}
            showDateDisplay={false}
            onChange={(selectDate) => {
              setDate([selectDate.selection]);
              setSelectDate([selectDate.selection]);
            }}
            moveRangeOnFirstSelection={false}
            minDate={new Date()}
            ranges={date}
            rangeColors={['#D4F0FF']}
            direction="horizontal"
            disabledDay={(current) => {
              return disabledDates.some((disabledDate) => {
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
