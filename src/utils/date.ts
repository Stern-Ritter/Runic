import moment from "moment";

function getDateWithoutTimeWithShift(shift: number) {
  return moment().startOf("day").add(shift, "days").toDate();
}

function getFirstAndLastWeekDaysWithoutTime() {
  return [
    moment().startOf("isoWeek").toDate(),
    moment().endOf("isoWeek").toDate(),
  ];
}

function formatTime(ms: number) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor(((ms % 360000) % 60000) / 1000);
  return (
    `${hours}:${minutes < 10 ? `0${minutes}` : minutes}` +
    `:${seconds < 10 ? `0${seconds}` : seconds}`
  );
}

export { 
  getDateWithoutTimeWithShift,
  getFirstAndLastWeekDaysWithoutTime,
  formatTime 
};