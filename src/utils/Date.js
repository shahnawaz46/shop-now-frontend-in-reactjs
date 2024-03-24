const monthsName = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const getDate = (date, time = true) => {
  const newDate = new Date(date);

  const hours =
    newDate.getHours() > 12 ? newDate.getHours() - 12 : newDate.getHours();
  const meridiam = newDate.getHours() > 12 ? 'PM' : 'AM';

  return time
    ? `${
        monthsName[newDate.getMonth()]
      } ${newDate.getDate()}, ${newDate.getFullYear()} at ${hours}:${newDate.getMinutes()} ${meridiam}`
    : `${
        monthsName[newDate.getMonth()]
      } ${newDate.getDate()}, ${newDate.getFullYear()}`;
};
