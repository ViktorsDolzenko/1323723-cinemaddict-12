import moment from "moment";

const checkOnLeadingZero = (someDate) => {
  return someDate < 10 ? `0${someDate}` : someDate;
};

export const formatCommentDate = (date) => {
  const updatedDate = new Date(date);
  const year = updatedDate.getFullYear();
  const month = checkOnLeadingZero(updatedDate.getMonth() + 1);
  const day = checkOnLeadingZero(updatedDate.getDay() + 1);
  const hours = checkOnLeadingZero(updatedDate.getHours());
  const minutes = checkOnLeadingZero(updatedDate.getMinutes());
  return moment(`${year}${month}${day} ${hours}${minutes}`).format(`YYYY/MM/DD H:mm`);
};


