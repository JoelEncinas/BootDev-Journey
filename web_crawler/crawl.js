const { JSDOM } = require("jsdom");

function normalizeURL(url) {
  if (!url) {
    return "no url provided";
  }

  const urlToNormalize = new URL(url);
  fullPath = `${urlToNormalize.host}${urlToNormalize.pathname}`;

  if (fullPath.length > 0 && fullPath.slice(-1) === "/") {
    fullPath = fullPath.slice(0, -1);
  }

  return fullPath;
}

function getHostFromUrl(url) {
  if (!url) {
    return "no url provided";
  }

  const urlToNormalize = new URL(url);
  fullPath = `${urlToNormalize.host}`;

  if (fullPath.length > 0 && fullPath.slice(-1) === "/") {
    fullPath = fullPath.slice(0, -1);
  }

  return fullPath;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  aElements = dom.window.document.querySelectorAll("a");
  const urls = [];
  for (const aElement of aElements) {
    if (aElement.href.slice(0, 1) === "/") {
      try {
        urls.push(new URL(aElement.href, baseURL).href);
      } catch (err) {
        console.log(`${err.message}: ${aElement.href}`);
      }
    } else {
      try {
        urls.push(new URL(aElement.href).href);
      } catch (err) {
        console.log(`${err.message}: ${aElement.href}`);
      }
    }
  }
  return urls;
}

function crawlPage(baseURL, currentURL, pages = {}) {
  return new Promise((resolve, reject) => {
    if (pages[currentURL]) {
      pages[currentURL] = pages[currentURL] + 1;
      resolve(pages);
    } else {
      pages[currentURL] = 1;

      fetch(currentURL)
        .then((response) => {
          if (!response.ok) {
            if (response.status >= 400 && response.status < 500) {
              throw new Error("Client error: " + response.status);
            } else if (response.status >= 500 && response.status < 600) {
              throw new Error("Server error: " + response.status);
            } else {
              throw new Error("Unknown error: " + response.status);
            }
          }

          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("text/html")) {
          } else {
            return response.text();
          }
        })
        .then((html) => {
          links = getURLsFromHTML(html, baseURL);

          const promises = [];

          for (const link of links) {
            if (link.startsWith("/")) {
              const absoluteUrl = new URL(link, baseURL).href;
              if (absoluteUrl.startsWith(baseURL)) {
                promises.push(crawlPage(baseURL, absoluteUrl, pages));
              }
            } else if (link.startsWith(baseURL)) {
              promises.push(crawlPage(baseURL, link, pages));
            }
          }

          Promise.all(promises).then(() => resolve(pages));
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  });
}

function validateArgs(args) {
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
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
  validateArgs,
  getHostFromUrl,
};
