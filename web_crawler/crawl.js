function normalizeURL(url) {
  if (!url) {
    return "no url provided";
  }

  return url.replace("https://", "").replace(/\/$/, "");
}

module.exports = {
  normalizeURL,
};
