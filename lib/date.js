
const yymmdd = date => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return `${year}-${month}-${day}`;
};

const format = (date, formatString) => {
  if (formatString === "yy-mm-dd") return yymmdd(date);

  console.warn("given date format is not found");
  return yymmdd(date);
};

const withinNHour = (_targetDate, n = 10) => {
  const targetDate = typeof _targetDate === 'string' ? new Date(_targetDate) : _targetDate
  
  const ONE_HOUR = 60 * 60 * 1000; /* ms */
  return ((new Date()) - targetDate) < n * ONE_HOUR
}

module.exports = {
  format,
  withinNHour
}