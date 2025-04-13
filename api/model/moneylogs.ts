import { coreApi } from "..";

export const getSummary = (startDate: string, endDate: string) => {
  return coreApi.get(
    `/money-logs/summary?startDate=${startDate}&endDate=${endDate}`
  );
};

export const getGraph = (startDate: string, endDate: string, type: string) => {
  return coreApi.get(
    `/money-logs/graph?type=${type}&startDate=${startDate}&endDate=${endDate}`
  );
};

export const createMoneyLogs = (
  amount: number,
  type: string,
  date: string,
  category: string,
  notes?: string
) => {
  const param = {
    amount: amount,
    type: type,
    category: category,
    date: date,
    notes: notes,
  };
  return coreApi.post("/money-logs/create", param);
};
