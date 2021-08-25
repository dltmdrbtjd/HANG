import React from 'react';
import { DateRange } from 'react-date-range';
// redux
import { useSelector } from 'react-redux';
import { getDisabledDates } from 'src/redux/modules/MyPageModule/mypage';
// material
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// format
import * as locales from 'react-date-range/dist/locale';
import moment from 'moment';
// elements
import { Button, Grid, Span, Image } from '../../../../elements';
// style
import './calendar.css';
import CalendarSelectButtonStyle, { SetArrowAngle } from './style';
// image
import Arrow from '../../../../Images/arrow.svg';

const Calendar = ({ setSelectDate }) => {
  const today = new Date();
  const format = 'YYYY-MM-DD';

  const disabledDates = useSelector(getDisabledDates);

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
      <Button
        _onClick={handleToggle}
        bgColor="white"
        color="black"
        shadow="none"
        border="0.5px solid #E7E7E7"
        fw="lg"
        ref={dateRef}
        padding="13px 20px"
        addstyle={CalendarSelectButtonStyle}
      >
        <Span fw="regular">{moment(date[0].startDate).format(format)}</Span>

        <Span fw="regular">-</Span>

        <Span fw="regular">{moment(date[0].endDate).format(format)}</Span>

        <Span addstyle={SetArrowAngle(angle)}>
          <Image width="10px" src={Arrow} alt="arrow button" />
        </Span>
      </Button>

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
