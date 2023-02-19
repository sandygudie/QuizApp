import router from "next/router";
import { ISignUpRequest } from "../../types";

export const login = async (loginName: string) => {
  let response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: loginName }),
  });
  return response;
};

export const signup = async (payload: ISignUpRequest) => {
  let response = await fetch("/api/adduser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response;
};

export const setUser = (user: string) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("currentUser");
  if (user != undefined) {
    return JSON.parse(user);
  }
};

export const updateUser = async (userid: string | any, payload: any) => {
  let res = await fetch(`/api/user/${userid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return res;
};

export const logOut = () => {
  localStorage.removeItem("currentUser");
  router.push("/login");
};
