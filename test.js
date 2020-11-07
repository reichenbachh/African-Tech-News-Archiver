const fs = require("fs");

// const readFile = async () => {
//   try {
//     let data = await fs.readFile("./_data/TechniAfric.json");
//     console.log(data.toString());
//   } catch (error) {
//     console.log(error);
//   }
// };

const data1 = [
  { name: "george" },
  { name: "george" },
  { name: "george" },
  { name: "george" },
];

const data2 = [
  { name: "george" },
  { name: "george" },
  { name: "george" },
  { name: "george" },
];

const dataSet1 = { dataSet1: { ...data1 } };
const dataSet2 = { dataSet2: { ...data2 } };

fs.readFile("./_data/TechniAfric.json", "utf-8", function (err, data) {
  if (err) throw err;

  let arrayOfObjects = JSON.parse(data);
  arrayOfObjects.push(dataSet1);

  console.log(arrayOfObjects);

  fs.writeFile(
    "./_data/TechniAfric.json",
    JSON.stringify(arrayOfObjects),
    "utf-8",
    function (err) {
      if (err) throw err;
      console.log("Done!");
    }
  );
});

fs.readFile("./_data/TechniAfric.json", "utf-8", function (err, data) {
  if (err) throw err;

  let arrayOfObjects = JSON.parse(data);
  arrayOfObjects.push(dataSet2);

  console.log(arrayOfObjects);

  fs.writeFile(
    "./_data/TechniAfric.json",
    JSON.stringify(arrayOfObjects),
    "utf-8",
    function (err) {
      if (err) throw err;
      console.log("Done!");
    }
  );
});

// let today = new Date();

// let fullDate =
//   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
// let fullTime =
//   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// console.log(fullDate, fullTime);

//append to json file
// fs.readFile("./_data/TechniAfric.json", "utf-8", function (err, data) {
//   if (err) throw err;

//   let arrayOfObjects = JSON.parse(data);
//   arrayOfObjects.push(dataObject);

//   fs.writeFile(
//     "./_data/TechniAfric.json",
//     JSON.stringify(arrayOfObjects),
//     "utf-8",
//     function (err) {
//       if (err) throw err;
//       console.log("file written!");
//     }
//   );
// });
