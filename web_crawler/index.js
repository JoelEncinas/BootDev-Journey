const { crawlPage } = require("./crawl.js");

function main() {
  const args = process.argv.slice(2); // First two arguments are node and the script name

  if (args.length < 1) {
    console.log("invalid syntax!");
    console.log("npm run start YOUR_URL");
    process.exit(1);
  }

  if (args.length > 1) {
    console.log("invalid syntax! the script only accepts 1 url at a time");
    console.log("npm run start YOUR_URL");
    process.exit(1);
  }

  const baseURL = args[0];
  console.log("Initializing the crawler...");

  let pages = {};

  crawlPage(baseURL, baseURL, pages);
}

main();
