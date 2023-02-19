import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getUser } from "../services/user";
import { TiArrowBack } from "react-icons/ti";
import Link from "next/link";
import { useTable } from "react-table";

export default function leaderboard() {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="">
      <div className="bg-primary text-white text-lg p-4 w-full">
        <Link href="/">
          <TiArrowBack className="text-4xl absolute  cursor-pointer left-0 fill-white" />
        </Link>
        Leaderboard
      </div>
    </div>
  );
}
