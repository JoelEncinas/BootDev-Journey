const { normalizeURL } = require("./crawl.js");

test("pass url and normalize it", () => {
  expect(normalizeURL("https://www.wikipedia.org/")).toBe("www.wikipedia.org");
});

test("pass no url and it should log a err message", () => {
  expect(normalizeURL()).toBe("no url provided");
});
