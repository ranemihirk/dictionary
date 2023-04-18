import React, { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import axios from "axios";

interface MyObjectWithExample {
  definition: string;
  synonyms: never[];
  antonyms: never[];
  example: string;
}

interface MyObjectWithoutExample {
  definition: string;
  synonyms: never[];
  antonyms: never[];
}

let dictionaryHTML = ``;

const dictionaryData = {
  data: [
    {
      word: "hey",
      phonetic: "/heɪ/",
      phonetics: [
        {
          text: "/heɪ/",
          audio:
            "https://api.dictionaryapi.dev/media/pronunciations/en/hey-au.mp3",
          sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=75271853",
          license: {
            name: "BY-SA 4.0",
            url: "https://creativecommons.org/licenses/by-sa/4.0",
          },
        },
        {
          text: "/heɪ/",
          audio:
            "https://api.dictionaryapi.dev/media/pronunciations/en/hey-us.mp3",
          sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=268428",
        },
      ],
      meanings: [
        {
          partOfSpeech: "interjection",
          definitions: [
            {
              definition: "An exclamation to get attention.",
              synonyms: [],
              antonyms: [],
              example: "Hey! Listen!",
            },
            {
              definition: "A protest or reprimand.",
              synonyms: [],
              antonyms: [],
              example: "Hey! Stop that!",
            },
            {
              definition: "An expression of surprise.",
              synonyms: [],
              antonyms: [],
              example: "Hey! This is new!",
            },
            {
              definition: "An informal greeting, similar to hi.",
              synonyms: [],
              antonyms: [],
              example: "Hey! How's it going?",
            },
            {
              definition:
                "A request for repetition or explanation; an expression of confusion.",
              synonyms: [],
              antonyms: [],
              example: "Hey? How's that?",
            },
            {
              definition:
                "A meaningless beat marker or extra, filler syllable in song lyrics.",
              synonyms: [],
              antonyms: [],
              example:
                'The chorus is "nana na na, nana na na hey hey hey, goodbye".',
            },
          ],
          synonyms: [
            "oi",
            "yo",
            "blimey",
            "gee whiz",
            "yowzah",
            "eh",
            "huh",
            "hi",
            "howdy",
            "wotcher",
          ],
          antonyms: [],
        },
      ],
      license: {
        name: "CC BY-SA 3.0",
        url: "https://creativecommons.org/licenses/by-sa/3.0",
      },
      sourceUrls: ["https://en.wiktionary.org/wiki/hey"],
    },
    {
      word: "hey",
      phonetic: "/heɪ/",
      phonetics: [
        {
          text: "/heɪ/",
          audio:
            "https://api.dictionaryapi.dev/media/pronunciations/en/hey-au.mp3",
          sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=75271853",
          license: {
            name: "BY-SA 4.0",
            url: "https://creativecommons.org/licenses/by-sa/4.0",
          },
        },
        {
          text: "/heɪ/",
          audio:
            "https://api.dictionaryapi.dev/media/pronunciations/en/hey-us.mp3",
          sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=268428",
        },
      ],
      meanings: [
        {
          partOfSpeech: "noun",
          definitions: [
            {
              definition:
                "(country dancing) A choreographic figure in which three or more dancers weave between one another, passing by left and right shoulder alternately.",
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: [],
          antonyms: [],
        },
      ],
      license: {
        name: "CC BY-SA 3.0",
        url: "https://creativecommons.org/licenses/by-sa/3.0",
      },
      sourceUrls: ["https://en.wiktionary.org/wiki/hey"],
    },
    {
      word: "hey",
      phonetic: "/heɪ/",
      phonetics: [
        {
          text: "/heɪ/",
          audio:
            "https://api.dictionaryapi.dev/media/pronunciations/en/hey-au.mp3",
          sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=75271853",
          license: {
            name: "BY-SA 4.0",
            url: "https://creativecommons.org/licenses/by-sa/4.0",
          },
        },
        {
          text: "/heɪ/",
          audio:
            "https://api.dictionaryapi.dev/media/pronunciations/en/hey-us.mp3",
          sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=268428",
        },
      ],
      meanings: [
        {
          partOfSpeech: "noun",
          definitions: [
            {
              definition:
                "The name of the fifth letter of many Semitic alphabets (Phoenician, Aramaic, Hebrew, Syriac, Arabic and others).",
              synonyms: [],
              antonyms: [],
            },
            {
              definition:
                "The name of the first letter of the Old South Arabian abjad.",
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: [],
          antonyms: [],
        },
      ],
      license: {
        name: "CC BY-SA 3.0",
        url: "https://creativecommons.org/licenses/by-sa/3.0",
      },
      sourceUrls: [
        "https://en.wiktionary.org/wiki/he",
        "https://en.wiktionary.org/wiki/hey",
      ],
    },
  ],
  status: 200,
  statusText: "",
  headers: {
    "content-type": "application/json; charset=utf-8",
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ["xhr", "http"],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: "application/json, text/plain, */*",
    },
    method: "get",
    url: "https://api.dictionaryapi.dev/api/v2/entries/en/hey",
  },
  request: {},
};
type DictionaryDataProp = {
  data?: any;
};

export default function Dictionary() {
  let currentDictionaryData = {};
  const [searchBoxActive, setSearchBoxActive] = useState(false);
  const [dictionaryWord, setDictionaryWord] = useState("");
  const [dictionaryData, setDictionaryData] = useState({data: []});

  useEffect(() => {
    if (dictionaryWord != "") {
      setTimeout(() => {
        // axios
        //   .get(
        //     `https://api.dictionaryapi.dev/api/v2/entries/en/` + dictionaryWord
        //   )
        //   .then(function (response) {
        //     // handle success
        //     console.log("response: ", response);
        //     console.log("dictionaryWord: ", dictionaryWord);
        //     setDictionaryData(response);
        //   })
        //   .catch(function (error) {
        //     // handle error
        //     console.log(error);
        //   })
        //   .finally(function () {
        //     // always executed
        //   });
      }, 2000);
    }
  }, [dictionaryWord]);

  return (
    <div className="dictionary h-screen">
      <motion.div
        className={`search-box flex flex-col justify-center items-center bg-new-purple`}
        initial={{ height: "60vh" }}
        animate={{
          height: searchBoxActive ? "100vh" : "60vh",
        }}
      >
        <h1 className="text-new-white text-5xl italic mb-16">
          Just Dictionary
        </h1>
        <input
          type="text"
          placeholder="What would you like to search?"
          className="input w-3/5 max-w-3/5"
          onFocus={(e) => {
            setSearchBoxActive(true);
          }}
          onBlur={(e) => {
            setSearchBoxActive(false);
          }}
          onChange={(e) => {
            setDictionaryWord(e.target.value);
          }}
        />
      </motion.div>
      <motion.div
        className="search-result w-full"
        initial={{ height: "40vh" }}
        animate={{
          height: searchBoxActive ? "0vh" : "auto",
        }}
      >
        <div className="container mx-auto">
			{/* {dictonaryDataHTML({ data: dictionaryData})} */}
		</div>
      </motion.div>
    </div>
  );
}

const dictonaryDataHTML = (prop: DictionaryDataProp) => {
  return [...prop.data].map((item, i) => {
    <h3 className="font-bold italic text-2xl">{item.word}</h3>;
    [...item.meanings].map((meanings, i) => {
      <span>${meanings.partOfSpeech}</span>;
      [...meanings.definitions].map((definition, i) => {
        const currentDefinition: MyObjectWithExample | MyObjectWithoutExample =
          definition;
        <h3 className="font-bold italic text-xl">
          {currentDefinition.definition}
        </h3>;

        "example" in currentDefinition ? (
          <p className="">{currentDefinition.example}</p>
        ) : (
          ""
        )
      })
    })
  })
};
