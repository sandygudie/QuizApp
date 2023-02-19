import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { setUser, signup } from "../services/user";

export default function () {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [touched, setTouched] = useState(false);
  const [regexValid, setRegexValid] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [loading, setLoading] = useState(false);

  let isValid = username !== "" && username.length > 4 && regexValid === false;
  const regex = /^[a-z0-9]/;

  const OnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpError("");
    let value = e.target.value.replace(/\s/g, "");
    regex.test(value) ? setRegexValid(false) : setRegexValid(true);
    setUsername(value);
    username.length >= 0 ? setTouched(true) : setTouched(false);
  };

  const onSignupHandler = async (e: FormEvent) => {
    e.preventDefault();
    let payload = {
      username,
      createdDate: Date(),
      category: [],
      image: "images/avatar/baddie.png",
    };

    try {
      setLoading(true);
      let response = await signup(payload);
      // get the data
      let data = await response.json();
      if (data.message) {
        setUser(data.quizuser);
        router.push("/");
      } else {
        setLoading(false);
        setSignUpError(data.error);
      }
    } catch (error) {
      setLoading(false);
      setSignUpError("Try Again");
    }
  };

  return (
    <div className="mb-12 lg:mb-0  text-center">
      <h1 className="text-2xl font-bold mb-3">
        New User
        <span role="img" aria-label="wave">
          👋
        </span>
      </h1>
      <div className="flex justify-center items-center gap-x-2">
        <form onSubmit={onSignupHandler} className="relative">
          <input
            type="text"
            placeholder="What should we call you?"
            className="p-3 w-80 border-tourquise border-[1px] border-solid block"
            onChange={(e) => OnChangeHandler(e)}
            value={username}
            required
          />

          <div className="absolute mt-1 top-50">
            {signUpError && (
              <p className="text-red text-xs italic">{signUpError}</p>
            )}
            <div className="">
              {touched && (
                <div className="text-red text-xs italic">
                  {username.length <= 4 && (
                    <p>❌name should be more than 4 digits </p>
                  )}
                  {regexValid && <p> ❌ No specials characters at beginning</p>}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`disabled:opacity-30 cursor-pointer py-3 px-4 bg-gradient-to-r from-primary to-pink-500 w-1/2 m-auto block mt-12
              text-base text-white font-bold ${loading && "disabled:hover"} `}
          >
            {loading ? (
              <CgSpinner className="animate-spin block m-auto  w-6 h-6" />
            ) : (
              "Start Quiz"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
