const { crawlPage, validateArgs } = require("./src/crawl.js");
const { printReport } = require("./src/report.js");

function main() {
  const args = process.argv.slice(2); // First two arguments are node and the script name

  validateArgs(args);

  const baseURL = args[0];
  console.log("Initializing the crawler...");

  crawlPage(baseURL, baseURL)
    .then((pages) => {
      printReport(pages);

      console.log("\nCrawler finished the job!");
    })
    .catch((error) => {
      console.error("\nCrawling failed:", error);
    });
}

main();
