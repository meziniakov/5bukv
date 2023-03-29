import React from "react";

// type Props = {
//   variant: {
//     i: number
//     letter: number
//   }
//   ix: number
// }

const Letter = ({
  variant,
  currentTry,
  i,
  lettersNotInWord,
  lettersInWord,
  lettersMatchInTargetWord,
}) => {
  console.log('variant ', variant)
  console.log('currentTry ', currentTry)
  console.log('lettersNotInWord ', lettersNotInWord[currentTry])
  console.log('lettersInWord ', lettersInWord[currentTry])
  return (
    <div className="flex justify-center mt-3 gap-2">
      {[0, 1, 2, 3, 4].map((letter) => (
        <div
          key={letter}
          className={`flex text-3xl justify-center border-yellow-300 font-light border items-center h-[72px] w-20 rounded-md ${
            lettersNotInWord[currentTry] &&
            lettersNotInWord[letter]?.includes(variant[i][letter])
             &&
            "bg-gray-400 border-gray-400 text-white"
          } ${lettersInWord[currentTry] &&
            lettersInWord[letter]?.includes(variant[i][letter])
             && "bg-white border-white text-black"
          } ${lettersMatchInTargetWord[currentTry] &&
            lettersMatchInTargetWord[letter]?.includes(variant[i][letter])
             && "bg-yellow-300 text-black"
          } `}
        >
          {variant[i][letter]}
        </div>
      ))}
    </div>
  );
};

export default Letter;
