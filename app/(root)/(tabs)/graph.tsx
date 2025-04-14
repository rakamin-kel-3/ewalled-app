import { getGraph } from "@/api/model/moneylogs";
import Header from "@/components/Header";
import { GraphResponse } from "@/model/moneylogs";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import chroma from "chroma-js";
import { useColorScheme } from "nativewind";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg from "react-native-svg";
import { VictoryLabel, VictoryPie, VictoryTheme } from "victory-native";

const Graph = () => {
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
  const getColorScale = (count: number): string[] => {
    return chroma.scale(["#0061FF", "#c8ddff"]).mode("lch").colors(count);
  };
  const { start, end, m } = defaultMonth();
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);
  const [month, setMonth] = useState(m);
  const [income, setIncome] = useState<GraphResponse | null>(null);
  const [expense, setExpense] = useState<GraphResponse | null>(null);
  const [errorMsgIncome, setErrorMsgIncome] = useState("");
  const [errorMsgExpense, setErrorMsgExpense] = useState("");
  const [incomeColor, setIncomeColor] = useState<string[]>([]);
  const [expenseColor, setExpenseColor] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<"income" | "expense">(
    "income"
  );
  const isFocused = useIsFocused();
  const graphData: GraphResponse | null = useMemo(() => {
    return selectedTab === "income" ? income : expense;
  }, [selectedTab, income, expense]);
  const graphColorData: string[] = useMemo(() => {
    return selectedTab === "income" ? incomeColor : expenseColor;
  }, [selectedTab, income, expense]);
  const { colorScheme } = useColorScheme();

  const fetchGraphIncome = async () => {
    try {
      const res = await getGraph(startDate, endDate, "income");
      setIncome(res.data.data);
      setIncomeColor(getColorScale(res.data.data.items.length));
      setErrorMsgIncome("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response?.data.metadata.success) {
          setErrorMsgIncome(error.response?.data.metadata.message);
        }
      } else {
        console.log("Unexpected error", error);
      }
    }
  };

  const fetchGraphExpense = async () => {
    try {
      const res = await getGraph(startDate, endDate, "expense");
      setExpense(res.data.data);
      setExpenseColor(getColorScale(res.data.data.items.length));
      setErrorMsgExpense("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response?.data.metadata.success) {
          setErrorMsgExpense(error.response?.data.metadata.message);
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
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatLabel = (key: string) => {
    return key.charAt(0).toUpperCase() + key.slice(1);
  };

  useEffect(() => {
    fetchGraphExpense();
    fetchGraphIncome();
  }, [startDate, endDate, isFocused]);

  return (
    <SafeAreaView className="bg-light-100 dark:bg-black min-h-screen">
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <Header>
          <Text className="text-xl font-bold py-3 px-2 dark:text-white">
            Graph
          </Text>
        </Header>
        <View className="flex-row flex-wrap bg-white dark:bg-black-300 border-t border-[#E5E5E5]">
          <TouchableOpacity
            onPress={() => setSelectedTab("income")}
            className={`w-1/2 border-r border-[#E5E5E5] py-4 ${
              selectedTab === "income" && "bg-light-100 dark:bg-black"
            }`}
          >
            <Text className="mx-auto dark:text-white">Income</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTab("expense")}
            className={`w-1/2 py-4 ${
              selectedTab === "expense" && "bg-light-100 dark:bg-black"
            }`}
          >
            <Text className="mx-auto dark:text-white">Expense</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-10">
          <Text className="text-center text-3xl font-semibold dark:text-white">
            {m}
          </Text>
          <Text className="text-center font-semibold text-[#0061FF]">2025</Text>
          <View className="flex-row justify-center">
            {graphData ? (
              <Svg width={400} height={400}>
                <VictoryPie
                  standalone={false}
                  width={400}
                  height={400}
                  innerRadius={100}
                  padAngle={2}
                  data={graphData.items?.map((item) => ({
                    x: item.category,
                    y: item.percentage,
                  }))}
                  style={{
                    labels: {
                      fill: colorScheme == "dark" ? "white" : "black",
                    },
                  }}
                  theme={VictoryTheme.clean}
                  colorScale={graphColorData}
                />
                <VictoryLabel
                  textAnchor="middle"
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: "Open-sans",
                    fill: colorScheme == "dark" ? "white" : "black",
                  }}
                  x={200}
                  y={190}
                  text={formatToIDR(graphData.totalAmount)}
                />
                <VictoryLabel
                  textAnchor="middle"
                  style={{
                    fontSize: 12,
                    fontFamily: "Open-sans",
                    fill: colorScheme == "dark" ? "white" : "black",
                  }}
                  x={200}
                  y={210}
                  text={`Your ${
                    selectedTab == "income" ? "income" : "expense"
                  } this month`}
                />
              </Svg>
            ) : (
              <Text className="text-center dark:text-white">
                Data not avaliable
              </Text>
            )}
          </View>
        </View>
        <View className="bg-white dark:bg-black-300 radius-md mt-2">
          <View className="p-5 border-b border-[#E5E5E5]">
            <Text className="font-bold text-xl dark:text-white">
              Categories
            </Text>
          </View>
          <View className="gap-y-7 p-5">
            {graphData ? (
              graphData.items.map((item, key) => (
                <View
                  className="flex-row justify-between items-center"
                  key={key}
                >
                  <View className="flex-row items-center gap-x-2">
                    <View
                      style={{ backgroundColor: graphColorData[key] }}
                      className="px-2 py-1 rounded-lg"
                    >
                      <Text className="text-white">
                        {item.percentage.toFixed(1)}%
                      </Text>
                    </View>
                    <Text className="text-lg dark:text-white">
                      {formatLabel(item.category)}
                    </Text>
                  </View>
                  <Text className="dark:text-white">
                    {formatToIDR(item.amount)}
                  </Text>
                </View>
              ))
            ) : (
              <Text className="text-center dark:text-white">
                Data not available
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Graph;
