const { normalizeURL } = require("./crawl.js");

test("pass url and normalize it", () => {
  expect(normalizeURL("https://www.wikipedia.org/")).toBe("www.wikipedia.org");
});

test("log err if no url is provided", () => {
  expect(normalizeURL()).toBe("no url provided");
});
