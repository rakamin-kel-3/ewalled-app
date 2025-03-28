import { coreApi } from "..";

export const loginUser = (email: string, password: string) => {
  const param = {
    email: email,
    password: password,
  };
  return coreApi.post("/public/login", param);
};

export const registerUser = (
  name: string,
  username: string,
  email: string,
  password: string,
  phoneNumber: string
) => {
  const param = {
    email: email,
    password: password,
    username: username,
    name: name,
    phoneNumber: phoneNumber,
  };
  return coreApi.post("/public/register", param);
};

export const me = () => {
  return coreApi.get("/users/me");
};
