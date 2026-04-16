const moment=require("moment");
//Creation
const nowDate = moment();
const dateString = moment("2026-04-15");
const dateArray = moment([2026, 3, 15]);
const dateObject = moment({ year: 2026, month: 3, day: 15 });

//Formatting
console.log("Default format:", nowDate.format());
console.log("Date:", nowDate.format("DD-MM-YYYY"));
console.log("Time:", nowDate.format("hh:mm:ss A"));
console.log("Custom:", nowDate.format("dddd, MMMM Do YYYY"));

//Validation
console.log("Valid date:", moment("2026-04-15").isValid());

//Getters

console.log("Year:", nowDate.year());
console.log("Month:", nowDate.month());
console.log("Date:", nowDate.date());
console.log("Hour:", nowDate.hour());
console.log("Minute:", nowDate.minute());
console.log("Second:", nowDate.second());
console.log("Day of week:", nowDate.day());
console.log("Week of year:", nowDate.week());
console.log("Unix timestamp:", nowDate.unix());
console.log("Milliseconds:", nowDate.valueOf());
console.log("Clone date:", nowDate.clone().format());

//queries
console.log("Days in month:", dateObject.daysInMonth());
console.log("Is leap year:", dateObject.isLeapYear());

//manipulation
console.log("Add 5 days:", dateString.clone().add(5, "days").format("DD-MM-YYYY"));
console.log("Subtract 1 year:", dateString.clone().subtract(1, "year").format("DD-MM-YYYY"));

//start and end of
console.log("Start of day:", dateArray.clone().startOf("day").format());
console.log("End of day:", dateArray.clone().endOf("day").format());

//comparision
const date1 = moment("2026-01-01");
const date2 = moment("2026-12-31");

console.log("isBefore:", date1.isBefore(date2));
console.log("isAfter:", date2.isAfter(date1));
console.log("isSame:", date1.isSame(date2));
console.log("isSame (year):", date1.isSame(date2, "year"));
console.log("isBetween:", nowDate.isBetween(date1, date2));

//difference
console.log("Difference in days:", date2.diff(date1, "days"));
console.log("Difference in months:", date2.diff(date1, "months"));
console.log("Difference in years:", date2.diff(date1, "years"));

//starting from nodemon index.js
