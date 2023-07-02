import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { login, logOut, setUser } from "../services/user";
import { CgSpinner } from "react-icons/cg";
import Signup from "../components/Signup";
import { ILoginRequest } from "../types";

export default function Login() {
  const router = useRouter();
  const [username, setusername] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    logOut();
  }, []);

  const OnChangeLoginHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginError("");
    let value = e.target.value;
    setusername(value);
  };

  const onLoginHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const loginDetails: ILoginRequest = {
        username,
        userId,
      };
      let response = await login(loginDetails);
      // get the data
      let data = await response.json();
      if (data.message) {
        setUser(data.quizuser);
        router.push("/");
      } else {
        setLoading(false);
        setLoginError(data.error);
      }
    } catch (error) {
      setLoading(false);
      setLoginError("Try Again");
    }
  };
  return (
    <div className="bg-secondary absolute top-2/4 left-2/4 translate-x-2/4 translate-y-2/4 w-full lg:w-9/12">
      <div className="lg:flex justify-between items-center">
        <hr className="bg-indigo-500 lg:w-1 lg:h-screen" />
        <div className="mt-12 lg:mt-0 text-center">
          <h1 className="text-2xl font-bold mb-4">Existing User</h1>
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
                {loginError && (
                  <p className="text-red absolute mt-1 top-50 text-[0.7rem] italic">
                    {loginError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={`text-center py-3 w-1/2 m-auto mt-14 block cursor-pointer px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 lg:-right-32
               text-base text-white font-bold hover:from-tourquise hover:to-tourquise ${
                 loading && "disabled:hover"
               }`}
              >
                {loading ? (
                  <CgSpinner className="animate-spin block m-auto w-6 h-6" />
                ) : (
                  " Continue"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
