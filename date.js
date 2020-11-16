//get full date and time
const returnDate = () => {
  let today = new Date();
  let fullDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let fullTime =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let currentDate = `${fullDate} / ${fullTime}`;
  return currentDate;
};

module.exports = returnDate;
