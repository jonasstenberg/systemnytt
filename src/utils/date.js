// const formatDate = (date) => {
//   const d = new Date(date);
//   let month = `${(d.getMonth() + 1)}`;
//   let day = `${d.getDate()}`;
//   const year = `${d.getFullYear()}`;
//
//   if (month.length < 2) {
//     month = `0${month}`;
//   }
//   if (day.length < 2) {
//     day = `0${day}`;
//   }
//
//   return [year, month, day].join('-');
// };
//
// export const getStartDate = () => formatDate(Date.now());
//
// export const getEndDate = () => {
//   const date = new Date(Date.now());
//   date.setDate(date.getDate() + 7);
//
//   return formatDate(date);
// };

export const getStartDate = () => '2018-10-01';
export const getEndDate = () => '2018-10-10';
