const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const headers = Object.keys(data[0]);
const csvRows = [];

csvRows.push(headers.join(","));

for (const row of data) {
  const values = headers.map(h =>
    `"${String(row[h]).replace(/"/g, '""')}"`
  );
  csvRows.push(values.join(","));
}

const outPath = path.join(__dirname, "..", "data.csv");
fs.writeFileSync(outPath, csvRows.join("\n"));

console.log("data.csv created successfully at:", outPath);
