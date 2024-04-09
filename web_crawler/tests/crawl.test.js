const { normalizeURL, getURLsFromHTML } = require("../src/crawl.js");
const { test, expect } = require("@jest/globals");

test("pass url and normalize it", () => {
  expect(normalizeURL("https://www.wikipedia.org/")).toBe("www.wikipedia.org");
});

test("log err if no url is provided", () => {
  expect(normalizeURL()).toBe("no url provided");
});

// boot dev tests
test("normalizeURL protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://BLOG.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL http", () => {
  const input = "http://BLOG.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

// JSDOM tests
test("getURLsFromHTML absolute", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev/path/one"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [
    "https://blog.boot.dev/path/one",
    "https://other.com/path/one",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML handle error", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
