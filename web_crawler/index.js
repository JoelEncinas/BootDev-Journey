const { crawlPage, validateArgs } = require("./crawl.js");

function main() {
  const args = process.argv.slice(2); // First two arguments are node and the script name

  validateArgs(args);

  const baseURL = args[0];
  console.log("Initializing the crawler...");

  crawlPage(baseURL, baseURL)
    .then((pages) => {
      console.log(pages);
    })
    .catch((error) => {
      console.error("Crawling failed:", error);
    });
}

main();
