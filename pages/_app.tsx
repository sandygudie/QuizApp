import "../styles/global.css";
import { AppProps } from "next/app";
import { getCurrentuser } from "../services/user";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    currentUserHandler();
  }, []);
  const currentUserHandler = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      let response = await getCurrentuser(userId);
      if (!response.ok) {
        localStorage.removeItem("userId")
        router.push("/login");
      
      }
    }
  };

  return <Component {...pageProps} />;
}

// todo
// the profile page does not log out users even -
// the quiz app too, even when the mongo db data is deleted that is because the data is from local storage
