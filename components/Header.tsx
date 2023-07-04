import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BiHelpCircle } from "react-icons/bi";
import { IUser } from "../types";
import Tippy from "@tippyjs/react";

interface HeaderProps {
  profile: IUser;
}
function Header({ profile }: HeaderProps) {
  const JSXContent = () => (
    <Tippy
      content={
        <div className="bg-white  text-center rounded-lg p-3  text-black">
          <h1 className="text-center text-base font-bold">Instructions</h1>
          <p className="text-sm">
            Each quiz has 10 questions, you have 10seconds to answer each
            questions.{" "}
          </p>
        </div>
      }
    >
      <span>
        {" "}
        <BiHelpCircle className="text-2xl " />
      </span>
    </Tippy>
  );

  return (
    <div className="z-20 shadow-2xl">
      <div className="flex py-3 px-4 lg:px-8 xl:max-w-7xl w-full m-auto items-center justify-between item-center ">
        <div className="flex items-center">
          {" "}
          <img
            className="w-14 lg:w-16 rounded-full inline p-2"
            src={profile?.image}
            alt="profile"
          />
          <span className="text-tourquise text-2xl font-bold ml-4">
            {profile?.username}
          </span>
        </div>
        <div className="flex items-center justify-between w-32 flex text-center cursor-pointer">
          <JSXContent />

          <Link
            href="/profile"
            className="text-base font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded-lg"
          >
            {" "}
            profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
