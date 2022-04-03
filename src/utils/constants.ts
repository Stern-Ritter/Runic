const createdDateTimeFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};

const filterDateTimeFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "2-digit",
};

const yearMonthDateFormat: Intl.DateTimeFormatOptions = {
  month: "short",
  year: "numeric",
};

const monthCount = 6;

export {
  createdDateTimeFormat,
  filterDateTimeFormat,
  yearMonthDateFormat,
  monthCount,
};
