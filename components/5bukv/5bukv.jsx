import "react-simple-keyboard/build/css/index.css";

import { useEffect, useRef, useState } from "react";
import KeyboardReact from "react-simple-keyboard";

import WordList from "./WordList";

// type Variant = {
//   [key: number]: string[]

// }

// export type CurrentTry = 1 | 2 | 3 | 4 | 5

const FiveBukv = () => {
  const keyboard = useRef();
  const [targetWord, setTargetWord] = useState("");
  const initialState = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  };
  const [lettersMatchInTargetWord, setLettersMatchInTargetWord] =
    useState(initialState);
  const [lettersInWord, setLettersInWord] = useState(initialState);
  const [lettersNotInWord, setLettersNotInWord] = useState(initialState);
  const [variant, setVariant] = useState(initialState);
  const [currentTry, setCurrentTry] = useState(1);
  const [isWin, setIsWin] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    (async () => {
      await fetch("/api/5bukv")
        .then((res) => res.json())
        .then(({ randomWord }) => {
          setTargetWord(randomWord.toUpperCase());
          setFetching(false);
        });
    })();
  }, [fetching]);

  const startAgain = () => {
    setCurrentTry(1);
    setVariant(initialState);
    setLettersMatchInTargetWord(initialState);
    setLettersInWord(initialState);
    setLettersNotInWord(initialState);
    setIsWin(!isWin);
    setFetching(true);
  };

  const isWordExists = async (awaitWord) => {
    const res = await fetch("/api/5bukv", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word: awaitWord }),
    });
    const data = await res.json();
    return data.isWordExists;
  };

  const handleWord = async (awaitWord) => {
    if (targetWord === awaitWord) return startAgain();
    if (await isWordExists(awaitWord)) {
      keyboard?.current?.clearInput();
      setCurrentTry((prev) => prev + 1);
      Object.keys(awaitWord).forEach((i) => {
        if (targetWord.includes(awaitWord[+i])) {
          if (targetWord[+i] === awaitWord[+i]) {
            setLettersMatchInTargetWord((prev) => ({
              ...prev,
              [currentTry]: [...(prev[currentTry] ?? []), awaitWord[+i]],
            }));
          } else {
            setLettersInWord((prev) => ({
              ...prev,
              [currentTry]: [...(prev[currentTry] ?? []), awaitWord[+i]],
            }));
          }
        } else {
          setLettersNotInWord((prev) => ({
            ...prev,
            [currentTry]: [...prev[currentTry], awaitWord[+i]],
          }));
        }
      });
    } else {
      return console.log("такого слова не существует");
    }
  };

  const onKeyPress = (button) => {
    if (button === "{enter}" && currentTry === 5) {
      return setIsWin(true);
    }
    if (button === "{bksp}" && variant[currentTry].length > 0) {
      return setVariant((prev) => ({
        ...prev,
        [currentTry]: [...prev[currentTry].slice(0, -1)],
      }));
    }
    if (variant[currentTry].length <= 5) {
      if (
        button !== "{enter}" &&
        button !== "{bksp}" &&
        variant[currentTry].length < 5
      ) {
        return setVariant((prev) => {
          return {
            ...prev,
            [currentTry]: [...(prev[currentTry] ?? []), button],
          };
        });
      }

      if (button === "{enter}" && variant[currentTry]?.length === 5) {
        return handleWord(variant[currentTry]?.join(""));
      }
    }
    return null;
  };

  return isWin ? (
    <div className="h-full items-center w-full bg-black">
      <div className="mx-auto h-full flex w-full place-content-center flex-col text-white">
        <div className="text-center">
          <span className=" text-4xl">🥳</span>
          <h2 className="text-2xl mb-4">Вы выиграли</h2>
          <span className=" mt-5 cursor-pointer" onClick={startAgain}>
            Начать заново?
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-full w-full bg-black">
      <div className="mx-auto flex flex-col w-[400px] bg-black">
        <h1 className="text-white text-center font-extrabold items-center p-3 text-3xl">
          Игра 5 БУКВ
        </h1>
        <WordList
          targetWord={targetWord}
          variant={variant}
          currentTry={currentTry}
          lettersNotInWord={lettersNotInWord}
          lettersInWord={lettersInWord}
          lettersMatchInTargetWord={lettersMatchInTargetWord}
        />
        <div className="mx-auto mt-4 w-[400px] bottom-0">
          <KeyboardReact
            keyboardRef={(e) => {
              keyboard.current = e;
            }}
            layoutName="default"
            theme={"hg-theme-default hg-layout-default myTheme"}
            disableButtonHold={true}
            layout={{
              default: [
                "Й Ц У К Е Н Г Ш Щ З Х Ъ",
                "Ф Ы В А П Р О Л Д Ж Э",
                "{enter} Я Ч С М И Т Ь Б Ю {bksp}",
              ],
            }}
            display={{
              "{bksp}": "←",
              "{enter}": "✓",
            }}
            buttonTheme={[
              {
                class: "enterClass",
                buttons: "{enter}",
              },
              {
                class: "bkspClass",
                buttons: "{bksp}",
              },
              {
                class: "hg-red",
                buttons: Object.values(lettersNotInWord)
                  ?.join(" ")
                  .replaceAll(",", " "),
              },
              {
                class: "hg-orange",
                buttons: Object.values(lettersMatchInTargetWord)
                  ?.join(" ")
                  .replaceAll(",", " "),
              },
              {
                class: "hg-gray",
                buttons: Object.values(lettersInWord)
                  ?.join(" ")
                  .replaceAll(",", " "),
              },
            ]}
            onKeyPress={onKeyPress}
          />
        </div>
      </div>
    </div>
  );
};

export default FiveBukv;
