// api/ExpensesAPI.ts
import api from "../lib/axios";
import { isAxiosError } from "axios";
import { Expense } from "../types";

export async function getExpenses() {
  try {
    const { data } = await api<Expense[]>(`/expenses`);
    console.log(data)
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
    throw error;
  }
}

export async function getExpensesByMonth(month: number, year: number) {
  try {
    const monthString = String(month).padStart(2, "0");
    const { data } = await api<Expense[]>(`/expenses?month=${year}-${monthString}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
    throw error;
  }
}

export async function getExpensesSummary(month: number, year: number) {
  try {
    const monthString = String(month).padStart(2, "0");
    const { data } = await api(`/expenses/summary?month=${year}-${monthString}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
    throw error;
  }
}
