const monthsName = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const getDate = (date: string, time = true): string => {
  const newDate = new Date(date);

  const hours =
    newDate.getHours() > 12 ? newDate.getHours() - 12 : newDate.getHours();
  const meridiam = newDate.getHours() > 12 ? "PM" : "AM";
  const minutes = newDate.getMinutes();

  return time
    ? `${
        monthsName[newDate.getMonth()]
      } ${newDate.getDate()}, ${newDate.getFullYear()} at ${String(
        hours
      ).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${meridiam}`
    : `${
        monthsName[newDate.getMonth()]
      } ${newDate.getDate()}, ${newDate.getFullYear()}`;
};

export const printReviewDate = (db_date: string) => {
  // console.log('printReviewDate:', db_date, typeof db_date);
  const date = new Date(db_date);

  const day = date.getDate();
  const month = monthsName[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};
