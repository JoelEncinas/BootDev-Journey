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

module.exports = {
  normalizeURL,
  getHostFromUrl,
};
