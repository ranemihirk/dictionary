import React, { useState, useEffect, useRef, ReactNode, Component } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import DictionaryData from "./dictionaryData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons'

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

let dictionaryHTML = {};

const dictionaryData = [
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
];

type DictionaryProps = {
  isTop: boolean;
};

let currentDictionaryData: Array<[]> = [];

const meaningList = [
  { def: "An exclamation to get attention.", example: "Hey! Listen!" },
  { def: "A protest or reprimand.", example: "Hey! Stop that!" },
  { def: "An expression of surprise.", example: "Hey! This is new!" },
  {
    def: "An informal greeting, similar to hi.",
    example: "Hey! How's it going?",
  },
  {
    def: "A request for repetition or explanation; an expression of confusion.",
    example: "Hey? How's that?",
  },
  {
    def: "A meaningless beat marker or extra, filler syllable in song lyrics.",
    example: "The chorus is 'nana na na, nana na na hey hey hey, goodbye'.",
  },
];
const synonyms = [
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
  antonyms: any[] = [];

export default function Dictionary({ isTop }: DictionaryProps): JSX.Element {
  const [searchBoxActive, setSearchBoxActive] = useState(false);
  const [dictionaryWord, setDictionaryWord] = useState("");
  // const [dictionaryData, setDictionaryData] = useState({ data: [] });
  const [audioStatus, changeAudioStatus] = useState(false);
  const inputRef = useRef<HTMLAudioElement>(null);

  function handleClick() {
    if(!audioStatus){
      inputRef.current?.play();
    }
    else{
      inputRef.current?.pause();
    }
    changeAudioStatus(!audioStatus);
  }

  dictionaryData.map((value) => {
    let currentitem = {
      word: value.word,
      meanings: value.meanings,
      phonetics: value.phonetics,
    };
    console.log("currentitem: ", currentitem);
    // currentDictionaryData.push(currentitem);
  });

  console.log(
    "currentDictionaryData: ",
    typeof currentDictionaryData,
    currentDictionaryData
  );

  useEffect(() => {
    // if (dictionaryWord != "") {
    //   setTimeout(() => {
    //     axios
    //       .get(
    //         `https://api.dictionaryapi.dev/api/v2/entries/en/` + dictionaryWord
    //       )
    //       .then(function (response) {
    //         // handle success
    //         console.log("response: ", response);
    //         console.log("dictionaryWord: ", dictionaryWord);
    //         setDictionaryData(response.data);
    //       })
    //       .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //       })
    //       .finally(function () {
    //         // always executed
    //       });
    //   }, 2000);
    // }
  }, [dictionaryWord]);

  return (
    <div className="dictionary min-h-screen">
      <motion.div
        className={`search-box flex flex-col justify-center items-center bg-new-purple`}
        initial={{ height: "60vh" }}
        animate={{
          height: searchBoxActive ? "100vh" : isTop ? "60vh" : "25vh",
        }}
      >
        <motion.h1
          className="text-new-white text-5xl italic"
          initial={{ margin: "64px" }}
          animate={{
            margin: isTop ? "64px" : "24px",
          }}
        >
          Just Dictionary
        </motion.h1>
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
        className="search-result w-full py-16"
        initial={{ height: "40vh" }}
        animate={{
          height: searchBoxActive ? "0vh" : "auto",
        }}
      >
        <div className="w-5/6 mx-auto">
          <div>
            <div className="flex items-center">
              <audio
                ref={inputRef}
                src="https://api.dictionaryapi.dev/media/pronunciations/en/hey-au.mp3"
                loop
              />
              
              <div><h3 className="font-bold italic text-2xl text-sky-500">hey</h3>
              <span className="text-slate-600">interjection</span></div>
              <div className="ml-8">
              {audioStatus ? (
                <button onClick={handleClick}><FontAwesomeIcon icon={faCirclePause} size="2xl" /></button>
              ) : (
                <button onClick={handleClick}><FontAwesomeIcon icon={faCirclePlay} size="2xl" /></button>
              )}
              </div>
            </div>
            <ol style={{ listStyleType: "decimal" }} className="my-6">
              {meaningList.map((value) => (
                <li className="my-4">
                  <div className="text-lg font-medium">{value.def}</div>
                  <div className="text-slate-500">{value.example}</div>
                </li>
              ))}
            </ol>
          </div>
          {synonyms.length > 0 && (
            <div className="my-16">
              <h3 className="font-bold uppercase">synonyms</h3>
              <div className="flex flex-wrap">
                {synonyms.map((item) => (
                  <div className="text-3xl font-bold italic w-1/3 m-w-1/3 my-2 text-new-purple">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
          {antonyms.length > 0 && (
            <div className="my-16">
              <h3 className="font-bold uppercase">antonyms</h3>
              <div className="">
                {antonyms.map((item) => (
                  <div className="text-3xl font-bold italic w-1/3 m-w-1/3 my-2 text-new-purple">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// const dictonaryDataHTML = (prop: DictionaryDataProp) => {
//   return [...prop.data].map((item, i) => {
//     <h3 className="font-bold italic text-2xl">{item.word}</h3>;
//     [...item.meanings].map((meanings, i) => {
//       <span>${meanings.partOfSpeech}</span>;
//       [...meanings.definitions].map((definition, i) => {
//         const currentDefinition: MyObjectWithExample | MyObjectWithoutExample =
//           definition;
//         <h3 className="font-bold italic text-xl">
//           {currentDefinition.definition}
//         </h3>;

//         "example" in currentDefinition ? (
//           <p className="">{currentDefinition.example}</p>
//         ) : (
//           ""
//         );
//       });
//     });
//   });
// };
