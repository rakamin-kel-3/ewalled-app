export type Transaction = {
  transactionId: string;
  createdAt: string;
  type: string;
  fromto: string;
  description: string;
  amount: number;
  inout: string;
  accountTo: string;
  accountFrom: string;
};
