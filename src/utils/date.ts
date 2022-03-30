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

export { getDateWithoutTimeWithShift };
