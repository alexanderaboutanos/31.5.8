/** @format */

const { MarkovMachine } = require("./markov");

describe("make chains", function () {
  beforeEach(function () {
    let mm = new MarkovMachine("the cat in the hat");
    global.mm = mm;
  });

  test("returns object", function () {
    chains = mm.makeChains();
    expect(typeof chains === "object").toBe(true);
  });

  test("returns object with 4 keys", function () {
    chains = mm.makeChains();
    expect(Object.keys(chains).length).toEqual(4);
  });
});

describe("make text", function () {
  beforeEach(function () {
    let mm = new MarkovMachine("the cat in the hat");
    mm.makeChains();
    global.mm = mm;
  });

  test("returns string", function () {
    text = mm.makeText();
    expect(typeof text === "string").toBe(true);
  });

  test("returns at least 1 of the 4 words in the object", function () {
    text = mm.makeText();
    expect(text).toContain("the" || "cat" || "in" || "hat");
  });
});
