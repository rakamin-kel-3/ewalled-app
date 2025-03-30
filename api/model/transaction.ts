import { coreApi } from "..";

export const getTransaction = (size: number) => {
  return coreApi.get(`/transactions?size=${size}&sort=createdAt,desc`);
};

export const transfer = (receipentAccountNo, amount, notes) => {
  const param = {
    receipentAccountNo: receipentAccountNo,
    amount: amount,
    notes: notes,
  };
  return coreApi.post("/transactions/transfer", param);
};

export const topup = (
  paymentMethod: string,
  amount: number,
  notes?: string
) => {
  const param = {
    paymentMethod: paymentMethod,
    amount: amount,
    notes: notes,
  };
  return coreApi.post("/transactions/topup", param);
};
