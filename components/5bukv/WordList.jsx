const WordList = ({
  variant,
  currentTry,
  targetWord,
  lettersNotInWord,
  lettersInWord,
  lettersMatchInTargetWord,
}) => {
  return (
    <div className="flex-col flex mx-auto w-[350px]">
      {[1, 2, 3, 4, 5].map((item) => (
        <div className="flex justify-center mt-3 gap-2" key={item}>
          {[0, 1, 2, 3, 4].map((letter) => (
            <div
              key={letter}
              className={`flex text-3xl justify-center border-yellow-300 font-light border items-center h-[72px] w-20 rounded-md 
          ${
            lettersNotInWord[item]?.includes(variant[item][letter])
              ? "bg-gray-400 border-gray-400 text-white"
              : "text-black"
          } ${
                lettersInWord[item]?.includes(variant[item][letter]) &&
                targetWord[letter] !== variant[item][letter]
                  ? "bg-white border-white text-black"
                  : "text-white"
              } ${
                lettersMatchInTargetWord[item]?.includes(
                  variant[item][letter]
                ) &&
                targetWord[letter] == variant[item][letter] &&
                "bg-yellow-300 text-black"
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
