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
      </Head>
      <div className="w-full">
        <Header profile={profile} />
        <div className="p-2 md:w-3/4 text-center m-auto mt-4">
          <h1 className="font-bold text-xl md:text-[2em]">Play Quiz</h1>
          <div className="my-8 flex justify-center flex-wrap gap-10">
            {Categories.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => getQuiz(item.name, item.id)}
                  className="bg-light-secondary rounded-lg w-36 p-4 md:p-12 md:w-72 
          cursor-pointer text-center hover:scale-125 hover:bg-gradient-to-r from-primary to-pink-500 hover:text-tourquise hover:border-none"
                >
                  <p className="font-bold text-base md:text-2xl mb-4">
                    {item.name}
                  </p>
                  <item.Icon className="text-tourquise text-4xl md:text-6xl m-auto" />
                </div>
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
