import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdNotifications } from "react-icons/io";
import { IUser } from "../types";

interface HeaderProps {
  profile: IUser;
}
function Header({ profile }: HeaderProps) {
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
        <IoMdNotifications className="text-2xl " />

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
