import { getAccount } from "@/api/model/account";
import { getSummary } from "@/api/model/moneylogs";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import TrxHistoryCard from "@/components/TrxHistoryCard";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Account } from "@/model/account";
import { Summary } from "@/model/moneylogs";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MoneyLogs = () => {
  const defaultMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const start = new Date(year, month, 1).toLocaleDateString("sv-SE");
    const end = new Date(year, month + 1, 0).toLocaleDateString("sv-SE");

    return {
      start: start,
      end: end,
      m: now.toLocaleString("default", { month: "long" }),
    };
  };
  const { start, end, m } = defaultMonth();
  const [moneyLogs, setMoneyLogs] = useState({});
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const isFocused = useIsFocused();
  const router = useRouter();

  const fetchSummary = async () => {
    try {
      const res = await getSummary(startDate, endDate);
      setSummary(res.data.data);
      setErrorMsg("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response?.data.metadata.success) {
          setSummary(null);
          setErrorMsg(error.response?.data.metadata.message);
        }
      } else {
        console.log("Unexpected error", error);
      }
    }
  };

  const formatToIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getFormattedDate = (inp: string) => {
    const [day, month, year] = inp.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fetchAccountData = async () => {
    try {
      const res = await getAccount();
      setAccount(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatLabel = (key: string) => {
    return key.charAt(0).toUpperCase() + key.slice(1);
  };

  useEffect(() => {
    fetchSummary();
    fetchAccountData();
  }, [isFocused]);

  return (
    <View className="flex-1 relative">
      <SafeAreaView className="bg-light-100 dark:bg-black min-h-screen">
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <Header>
            <View className="flex flex-row justify-between px-2 py-3 items-center">
              <Text className="text-2xl dark:text-white font-bold">
                Cash Flow
              </Text>
              <Text className="text-[#B3B3B3]">{m} 2025</Text>
            </View>
          </Header>
          <View className="mt-5 bg-white dark:bg-black-300 py-7">
            <View className="px-7">
              <Text className="text-[#B3B3B3] text-lg">
                Am I spending less than I make ?
              </Text>
              {summary ? (
                summary.income > summary.expense ? (
                  <Text className="text-2xl text-[#0061FF] font-semibold mt-1 mb-4">
                    + {formatToIDR(summary.income - summary.expense)}
                  </Text>
                ) : (
                  <Text className="text-2xl text-[#FF450C] font-semibold mt-1 mb-4">
                    - {formatToIDR(summary.income - summary.expense)}
                  </Text>
                )
              ) : (
                <Text className="text-2xl text-[#0061FF] font-semibold mt-1 mb-4">
                  + Rp0
                </Text>
              )}
              <View className="mb-4">
                <View className="flex flex-row justify-between">
                  <Text className="dark:text-white">Income</Text>
                  <Text className="dark:text-white">
                    {summary ? formatToIDR(summary.income) : "Rp 0"}
                  </Text>
                </View>
                <ProgressBar
                  color="#0061FF"
                  value={
                    summary
                      ? (summary.income / (summary.income + summary.expense)) *
                        100
                      : 0
                  }
                />
              </View>
              <View>
                <View className="flex flex-row justify-between">
                  <Text className="dark:text-white">Expenses</Text>
                  <Text className="dark:text-white">
                    {summary ? formatToIDR(summary.expense) : "Rp 0"}
                  </Text>
                </View>
                <ProgressBar
                  color="#FF450C"
                  value={
                    summary
                      ? (summary.expense / (summary.income + summary.expense)) *
                        100
                      : 0
                  }
                />
              </View>
            </View>
          </View>
          <View className="bg-white dark:bg-black-300 radius-md mt-5">
            <View className="p-5 border-b border-[#E5E5E5]">
              <Text className="font-bold text-xl dark:text-white">
                Transaction History
              </Text>
            </View>
            <View className="gap-y-5 p-5">
              {summary ? (
                summary.data.map((item, key) => (
                  <TrxHistoryCard
                    key={key}
                    images={images.profileBlank}
                    name={formatLabel(item.category)}
                    inout={item.type == "income" ? "in" : "out"}
                    type={formatLabel(item.type)}
                    date={getFormattedDate(item.date)}
                    amount={formatToIDR(item.amount)}
                  />
                ))
              ) : (
                <Text className="text-center">No Transaction</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <TouchableOpacity
        className="absolute bottom-28 right-6 bg-blue-500 p-4 rounded-full"
        onPress={() => router.push("/addlog")}
      >
        <Image source={icons.plus} className="w-7 h-7" />
      </TouchableOpacity>
    </View>
  );
};

export default MoneyLogs;
