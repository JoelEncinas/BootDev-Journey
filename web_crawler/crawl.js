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
  return urls;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
