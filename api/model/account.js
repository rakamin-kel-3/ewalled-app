import { coreApi } from "..";

export const getAccount = () => {
  return coreApi.get("/accounts");
};

export const getListAccount = () => {
  return coreApi.get("/accounts/list");
};
