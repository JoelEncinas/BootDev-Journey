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
  console.log(urls);

  return urls;
}

function crawlPage(baseURL, currentURL, pages) {
  fetch(baseURL)
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
        throw new Error("Content needs to be html");
      }

      return response.text();
    })
    .then((html) => {
      // add all the urls to the pages object
      getURLsFromHTML(html, baseURL);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  // call the function recursively here
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
