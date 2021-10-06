import express from "express";
import { promises as fs } from "fs";
import data from "./data.js";

const app = express();

// create object variable to store array
let obj = {};
let json;

// 1.
const highestMileageVehicle = data
  .map((person) => person.vehicles.sort((a, b) => b.mileage - a.mileage)[0])
  .sort((a, b) => b.mileage - a.mileage)[0];

obj = highestMileageVehicle;
json = JSON.stringify(obj);
fs.writeFile("./highest-mileage-vehicle.json", json);

// 2.
const totalMileage = data.reduce((total, item) => {
  total += item.vehicles.reduce((totalNested, itemNested) => {
    totalNested += itemNested.mileage;
    return totalNested;
  }, 0);
  return total;
}, 0);

obj = totalMileage;
json = JSON.stringify(obj);
fs.writeFile("./total-mileage.json", json);

// 3.
function filterYahooEmails(array) {
  return array
    .filter(({ email }) => email.includes("@yahoo.com"))
    .map(({ email }) => email);
}

obj = filterYahooEmails(data);
json = JSON.stringify(obj);
fs.writeFile("./yahoo-emails.json", json);

// 4.
const highMilVehicles = data
  .map(({ vehicles }) => vehicles.filter(({ mileage }) => mileage > 36000))
  .flat();

obj = highMilVehicles;
json = JSON.stringify(obj);
fs.writeFile("./high-mileage-vehicles.json", json);

// 5.
const highMilForIL = data
  .map(({ vehicles }) => vehicles.filter(({ st }) => st === "Florida"))
  .flat()
  .reduce((total, { mileage }) => {
    total += mileage;
    return total;
  }, 0);

obj = highMilForIL;
json = JSON.stringify(obj);
fs.writeFile("./high-mileage-illinois.json", json);

app.get("/:page", (req, res) => {
  fs.readFile(`${req.params.page}.json`, "utf-8")
    .then((contents) => {
      res.json(contents);
    })
    .catch(() => {
      res.statusCode = 404;
      res.end("404!");
    });
});

app.listen(3000, () => {
  console.log("Server running");
});
