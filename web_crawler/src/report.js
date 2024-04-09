function printReport(pages) {
  console.log("\n");
  Object.entries(pages).forEach(([key, value]) => {
    console.log(`${key} : ${value}`);
  });
}

module.exports = {
  printReport,
};
