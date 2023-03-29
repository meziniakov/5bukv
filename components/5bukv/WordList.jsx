import React from "react";

import Letter from "./Letter";

const WordList = ({
  variant,
  currentTry,
  targetWord,
  lettersNotInWord,
  lettersInWord,
  lettersMatchInTargetWord,
}) => {
  // console.log('variant [currentTry]', variant[currentTry + 1])
  // console.log('currentTry ', currentTry)
  // console.log('lettersNotInWord ', lettersNotInWord)
  // console.log('lettersInWord ', lettersInWord)
  // console.log('lettersMatchInTargetWord ', lettersMatchInTargetWord)
  console.log('lettersInWord[item].length == 0 ', lettersInWord[currentTry])
  return (
    <div className="flex-col flex mx-auto w-[350px]">
      {[1, 2, 3, 4, 5].map((item) => (
        // <Letter
        //   key={item}
        //   variant={variant}
        //   currentTry={currentTry}
        //   i={item}
        //   lettersNotInWord={lettersNotInWord}
        //   lettersInWord={lettersInWord}
        //   lettersMatchInTargetWord={lettersMatchInTargetWord}
        // />
        
        <div className="flex justify-center mt-3 gap-2">
      {[0, 1, 2, 3, 4].map((letter) => (
        <div
          key={letter}
          data={letter}
          className={`flex text-3xl justify-center border-yellow-300 font-light border items-center h-[72px] w-20 rounded-md 
          ${lettersNotInWord[item]?.includes(variant[item][letter])
             ? "bg-gray-400 border-gray-400 text-white" : "text-black"
          } ${lettersInWord[item]?.includes(variant[item][letter]) && targetWord[letter] !== variant[item][letter]
             ? "bg-white border-white text-black": "text-white"
          } ${lettersMatchInTargetWord[item]?.includes(variant[item][letter]) && targetWord[letter] == variant[item][letter]
             && "bg-yellow-300 text-black"
          }`}
        >
          {variant[item][letter]}
        </div>
      ))}
    </div>
      ))}
    </div>
  );
};

export default WordList;
