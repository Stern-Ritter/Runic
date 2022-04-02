function getDateWithoutTimeWithShift(shift: number) {
  const initDate = new Date();
  const dateWithoutTime = new Date(
    initDate.getFullYear(),
    initDate.getMonth(),
    initDate.getDate()
  );
  dateWithoutTime.setDate(dateWithoutTime.getDate() + shift);
  return dateWithoutTime;
}

function getFirstAndLastWeekDaysWithoutTime() {
  const currentDate =  new Date();
  const first = currentDate.getDate() - currentDate.getDay() + 1;
  const last = first + 6;
  const minDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  )
  const maxDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  )
  return [
    new Date(minDate.setDate(first)),
    new Date(maxDate.setDate(last))
  ]
}

export { getDateWithoutTimeWithShift, getFirstAndLastWeekDaysWithoutTime };
