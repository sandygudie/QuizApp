import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { login, logOut, setUser } from "../services/user";
import { CgSpinner } from "react-icons/cg";

import { ILoginRequest } from "../types";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState(" ");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    logOut();
  }, []);

  const OnChangeLoginHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    let value = e.target.value.replace(/\s/g, "");
    setUsername(value);

    const regex = /^[a-z0-9A-Z]/;
    if (regex.test(value)) {
      e.target.value.length <= 4
        ? setError("username not less than 5 characters")
        : setError("");
    } else {
      setError("No specials characters at beginning");
    }

    if (e.target.value.length === 0) {
      setError("");
    }
  };

  const onLoginHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = localStorage.getItem("userId"); // this should be in the cookies
      const loginDetails: ILoginRequest = {
        username,
        userId,
      };
      let response = await login(loginDetails);
      if (!response.ok) {
        return response.json().then((response) => {
          setError(response.message);
        });
      }
      const data = await response.json();
      setUser(data.data);
      router.push("/");
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-secondary absolute top-2/4 left-2/4 translate-x-2/4 translate-y-2/4 w-full lg:w-9/12">
      <div className="mt-12 lg:mt-0 text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome</h1>
        <div className="flex justify-center items-center gap-x-2">
          <form onSubmit={onLoginHandler} className="relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Username?"
                className="p-3 w-80 border-tourquise border-[1px] border-solid"
                name="username"
                onChange={(e) => OnChangeLoginHandler(e)}
                value={username}
                required
              />
              {error && (
                <p className="text-red absolute mt-1 top-50 text-[0.7rem] italic">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              // disabled={error !== " "}
              className={`text-center py-3 w-1/2 m-auto mt-14 block cursor-pointer px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 lg:-right-32
               text-base text-white font-bold hover:from-tourquise hover:to-tourquise ${
                 loading && "disabled:hover"
               }`}
            >
              {loading ? (
                <CgSpinner className="animate-spin block m-auto w-6 h-6" />
              ) : (
                "Continue"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
