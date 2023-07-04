import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getUser } from "../services/user";
import { IUser } from "../types";
import Header from "../components/Header";
import { Categories } from "../data";

export default function Home() {
  const [profile, setProfile] = useState<IUser>();
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    if (user) {
      setProfile(user);
    } else {
      router.push("/login");
    }
  }, []);

  if (!profile) return null;

  const getQuiz = (category: string, id: number) => {
    router.push({
      pathname: "/quiz",
      query: { category, id },
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
        <div className="xl:max-w-7xl p-2 text-center m-auto mt-8 flex justify-center items-center h-[90vh] flex-col">
          <h1 className="font-bold text-xl md:text-[2em] my-4">Take Quiz</h1>

          <div className="my-8 flex justify-center flex-wrap gap-10">
            {Categories.map((item) => {
              return (
                <button
                  aria-label={item.name}
                  key={item.id}
                  onClick={() => getQuiz(item.name, item.id)}
                  className="text-white h-64 md:h-auto flex flex-col justify-center items-center bg-light-secondary rounded-lg w-36 p-4 md:p-12 md:w-80
          cursor-pointer text-center hover:scale-125 hover:bg-gradient-to-r from-primary to-pink-500 hover:text-tourquise hover:border-none"
                >
                  <p className="font-bold text-lg md:text-2xl mb-2">
                    {item.name}
                  </p>
                  <item.Icon className="text-tourquise text-5xl md:text-6xl md:m-auto" />
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
// session do expire set up for token retrival
// show category bar or tooltips
// a timer exist
// Show score board

// error handling when there is no network

// add instruction page with select for difficulty level
// support leave a star, link to github

// install litter