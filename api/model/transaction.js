import { coreApi } from "..";

export const getTransaction = () => {
  return coreApi.get("/transactions");
};

export const transfer = (receipentAccountNo, amount, notes) => {
  const param = {
    receipentAccountNo: receipentAccountNo,
    amount: amount,
    notes: notes,
  };
  return coreApi.post("/transactions/transfer", param);
};

export const topup = (paymentMethod, amount, notes) => {
  const param = {
    paymentMethod: paymentMethod,
    amount: amount,
    notes: notes,
  };
  return coreApi.post("/transactions/topup", param);
};
