import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getUser } from "../services/user";
import { IUser } from "../types";
import Header from "../components/Header";
import { Categories } from "../data";
import Select from "react-select";

export default function Home() {
  const [profile, setProfile] = useState<IUser>();
  const [difficulty, setDifficulty] = useState<string | any>("easy");
  const router = useRouter();
  const options = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Intermediate" },
    { value: "hard", label: "Expert" },
  ];
  useEffect(() => {
    const user = getUser();

    if (user) {
      setProfile(user);
    } else {
      router.push("/login");
    }
  }, []);

  if (!profile) return null;

  const getQuiz = (category: string) => {
    router.push({
      pathname: "/quiz",
      query: { category, difficulty },
    });
  };
  return (
    <>
      <Head>
        <title>Quiz App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Test your Knowledge of Programming Languages"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <div className="w-full">
        <Header profile={profile} />
        <div className="md:w-11/12 p-1 sm:p-6 m-auto z-10 xl:max-w-7xl text-center m-auto md:mt-8">
          <div className="flex my-8 md:mt-0 md:mb-6 items-center gap-4 justify-center md:justify-end">
            <p className="font-bold text-lg md:text-xl">Level :</p>
            <Select
              isSearchable={false}
              defaultValue={options[0]}
              className="w-36 text-black border-none outline-none"
              options={options}
              onChange={(selected) => setDifficulty(selected?.value)}
            />
          </div>
          <h1 className="font-bold text-xl md:text-[2em] my-8">
            Take Quiz
          </h1>

          <div className="my-4 md:my-16 flex-wrap flex items-center justify-center gap-4 md:gap-8">
            {Categories.map((item) => {
              return (
                <button
                  aria-label={item.name}
                  key={item.id}
                  onClick={() => getQuiz(item.name)}
                  className="w-28 h-28 sm:w-56 md:h-64 md:w-72 text-white flex flex-col
                   justify-center items-center bg-light-secondary rounded-lg p-4 md:p-12
          cursor-pointer text-center hover:scale-125 hover:bg-gradient-to-r from-primary to-pink-500 hover:text-tourquise hover:border-none"
                >
                  <p className="font-bold text-sm md:text-2xl mb-2">
                    {item.name.toUpperCase()}
                  </p>
                  <item.Icon className="text-tourquise text-xl sm:text-4xl md:text-6xl m-0" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

// todo
// do quiz selection base on categories ( request will retrive with it),
// show category bar or tooltips
// a timer exist
// Show score board

// error handling when there is no network

// add random 10questions

// Leadership board
// support leave a star, link to github, contribute by adding questions here

// add pagination
// filter for the boards


// fix the quiz option circles