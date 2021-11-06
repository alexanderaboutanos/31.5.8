/**
 * Textual markov chain generator
 *
 * @format
 */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let vals = Object.values(this.words);
    let chains = {};
    for (let i = 0; i < vals.length; i++) {
      if (vals[i + 1] == undefined) {
        if (!chains[vals[i]]) {
          chains[vals[i]] = [null];
        } else {
          chains[vals[i]].push(null);
        }
      } else {
        if (!chains[vals[i]]) {
          chains[vals[i]] = [vals[i + 1]];
        } else {
          chains[vals[i]].push(vals[i + 1]);
        }
      }
    }
    this.chains = chains;
    // console.log("Chains:", this.chains);
    return chains;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // prep the return text
    let text = "";

    // randomly select first word and add it to string.
    let startWord = this.words[Math.floor(Math.random() * this.words.length)];
    text.concat(startWord);

    for (let i = 0; i < numWords; i++) {
      if (
        startWord == null ||
        (this.chains[startWord].length == 1 &&
          this.chains[startWord][0] == null)
      ) {
        text += ". ";
        startWord = this.words[Math.floor(Math.random() * this.words.length)];
        continue;
      } else {
        let nextWord =
          this.chains[startWord][
            Math.floor(Math.random() * this.chains[startWord].length)
          ];
        text += nextWord + " ";
        startWord = nextWord;
      }
    }
    console.log("Final Product:", text);
    return text;
  }
}

// let mm = new MarkovMachine("the cat in the hat is in the hat");
let mm = new MarkovMachine(
  "so yesterday I went to the store and purchased a large box of things and there were so many things to choose from and I just loved it so much that I want to go back so so badly"
);

// mm.makeText();
mm.makeText((numWords = 50));
