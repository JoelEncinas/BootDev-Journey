function printReport(pages) {
  const pagesArray = Object.entries(pages);
  pagesArray.sort((a, b) => b[1] - a[1]);
  const sortedPages = {};

  pagesArray.forEach(([key, value]) => {
    sortedPages[key] = value;
  });

  console.log("\n");
  Object.entries(sortedPages).forEach(([key, value]) => {
    console.log(`${key} : ${value}`);
  });
}

module.exports = {
  printReport,
};
