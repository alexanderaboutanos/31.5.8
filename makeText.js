/**
 * Command-line tool to generate Markov text.
 *
 * @format
 */

const fs = require("fs");
const axios = require("axios");
const markov = require("./markov");
const argv = process.argv;
const action = argv[2];

async function cat() {
  if (action === "file") {
    fs.readFile(argv[3], "utf-8", (err, data) => {
      if (err) {
        console.log("ERROR:", err);
        process.kill(1);
      }
      mm = new markov.MarkovMachine(data);
      mm.makeText();
    });
  } else {
    try {
      res = await axios.get(argv[3]);
      mm = new markov.MarkovMachine(res.data);
      mm.makeText();
    } catch (err) {
      console.log("ERROR:", err);
    }
  }
}

cat();
