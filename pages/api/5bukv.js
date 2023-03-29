const { words } = require("./rus-words");

const handler = async (req, res) => {
  words.filter((item) => !item.includes("ё"));

  if (req.method === "GET") {
    res.status(200).json({
      randomWord: words[Math.floor(Math.random() * (2128 - 1 + 1) + 1)],
    });
  } else if (req.method === "POST") {
    try {
      let word = req.body.word.toLowerCase();
      res.status(200).json({ isWordExists: words.includes(word) });
    } catch (error) {
      res.status(400).json({ message: "Error" });
    }
  } else {
    res.status(400).json({ message: "method invalid" });
  }
};
export default handler;
