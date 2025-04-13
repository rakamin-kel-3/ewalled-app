export type SummaryItem = {
  id: number;
  type: string;
  category: string;
  notes?: string;
  amount: number;
  date: string;
  userId: number;
  transactionId?: number;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  transaction: boolean;
};

export type Summary = {
  income: number;
  expense: number;
  periodStart: string;
  periodEnd: string;
  data: SummaryItem[];
};

export type GraphItem = {
  percentage: number;
  category: string;
  amount: number;
};

export type GraphResponse = {
  type: string;
  totalAmount: number;
  items: GraphItem[];
};

export type AddLogRequest = {
  amount: number;
  category: string;
  date: string;
  notes?: string;
  type: string;
};
