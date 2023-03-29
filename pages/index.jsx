import Head from "next/head";
import { Inter } from "next/font/google";
import FiveBukv from "../components/5bukv/5bukv";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Игра 5 букв - отгадай слово из 5 букв</title>
        <meta
          name="description"
          content="Игра 5 букв - отгадай слово из 5 букв"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FiveBukv />
    </>
  );
}
