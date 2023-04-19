import React, { useState, useEffect, ReactNode, Component } from "react";

type DictionaryDataProp = {
  data?: any;
};

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

export default function DictionaryData({
  data,
}: DictionaryDataProp): JSX.Element {
  if (data.length > 0) {
    [...data].map((item, i) => {
      <h3 className="font-bold italic text-2xl">{item.word}</h3>;
      [...item.meanings].map((meanings, i) => {
        <span>${meanings.partOfSpeech}</span>;
        [...meanings.definitions].map((definition, i) => {
          const currentDefinition:
            | MyObjectWithExample
            | MyObjectWithoutExample = definition;
          <h3 className="font-bold italic text-xl">
            {currentDefinition.definition}
          </h3>;

          "example" in currentDefinition ? (
            <p className="">{currentDefinition.example}</p>
          ) : (
            ""
          );
        });
      });
    });
  }

  return <div>
    
  </div>
}
