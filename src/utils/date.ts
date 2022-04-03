import moment from "moment";

function getDateWithoutTimeWithShift(shift: number) {
  return moment().startOf('day').add(shift, 'days').toDate();
}

function getFirstAndLastWeekDaysWithoutTime() {
  return [
    moment().startOf('isoWeek').toDate(),
    moment().endOf('isoWeek').toDate()
  ]
}

export { getDateWithoutTimeWithShift, getFirstAndLastWeekDaysWithoutTime };
