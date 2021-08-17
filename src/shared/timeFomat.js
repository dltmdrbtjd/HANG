import moment from 'moment';

const timeFormat = time => {
  const pastTime = moment(time);
  const now = moment();

  const diffTime = moment.duration(now.diff(pastTime));

  switch (true) {
    case diffTime.asMinutes() < 60:
      return `${diffTime.minutes()}분 전`;

    case diffTime.asHours() < 24:
      return `${diffTime.hours()}시간 전`;

    case diffTime.asDays() < 8:
      return `${diffTime.days()}일 전`;

    case diffTime.asMonths() < 12:
      return pastTime.format('M.D');

    default:
      return pastTime.format('YYYY.M.D');
  }
};

export default timeFormat;
