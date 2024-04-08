function normalizeURL(url) {
  if (!url) {
    return "no url provided";
  }

  const urlToNormalize = new URL(url);
  return urlToNormalize.host;
}

module.exports = {
  normalizeURL,
};
