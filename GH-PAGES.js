const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "GH-PAGES-404.html");
const destination = path.join(
  __dirname,
  "dist",
  "example",
  "browser",
  "404.html"
);

fs.copyFile(source, destination, (err) => {
  if (err) {
    console.error("Error copying 404.html:", err);
  } else {
    console.log("404.html copied successfully!");
  }
});
