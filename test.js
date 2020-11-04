const fs = require("fs");

// const readFile = async () => {
//   try {
//     let data = await fs.readFile("./_data/TechniAfric.json");
//     console.log(data.toString());
//   } catch (error) {
//     console.log(error);
//   }
// };

// try {
//   fs.readFile("./_data/TechniAfric.json", (err, data) => {
//     let jsonData = JSON.parse(data);
//     jsonData.push(dataSet);
//     fs.writeFile(
//       "./_data/TechniAfric.json",
//       JSON.stringify(jsonData),
//       (err) => {
//         if (err) {
//           throw err;
//         } else {
//           console.log("file written");
//         }
//       }
//     );
//   });
// } catch (error) {
//   console.log(error);
// }

const data = [
  { name: "george" },
  { name: "george" },
  { name: "george" },
  { name: "george" },
];

let dataObj = { data: data };

let today = new Date();

let fullDate =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
let fullTime =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
console.log(fullDate, fullTime);
