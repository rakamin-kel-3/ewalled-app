import Header from "@/components/Header";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg from "react-native-svg";
import { VictoryLabel, VictoryPie, VictoryTheme } from "victory-native";

const Graph = () => {
  const [selectedTab, setSelectedTab] = useState<"income" | "expense">(
    "income"
  );

  return (
    <SafeAreaView className="bg-light-100 min-h-screen">
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <Header>
          <Text className="text-xl font-bold py-3 px-2">Graph</Text>
        </Header>
        <View className="flex-row flex-wrap bg-white border-t border-[#E5E5E5]">
          <TouchableOpacity
            onPress={() => setSelectedTab("income")}
            className={`w-1/2 border-r border-[#E5E5E5] py-4 ${
              selectedTab === "income" && "bg-light-100"
            }`}
          >
            <Text className="mx-auto">Income</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTab("expense")}
            className={`w-1/2 py-4 ${
              selectedTab === "expense" && "bg-light-100"
            }`}
          >
            <Text className="mx-auto">Expense</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-10">
          <Text className="text-center text-3xl font-semibold">March</Text>
          <Text className="text-center font-semibold text-[#0061FF]">2025</Text>
          <View className="flex-row justify-center">
            <Svg width={400} height={400}>
              <VictoryPie
                standalone={false}
                width={400}
                height={400}
                innerRadius={100}
                padAngle={2}
                data={[
                  { x: "Cats", y: 30 },
                  { x: "Dogs", y: 35 },
                  { x: "Birds", y: 25 },
                  { x: "Rabbits", y: 10 },
                ]}
                theme={VictoryTheme.clean}
              />
              <VictoryLabel
                textAnchor="middle"
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "Open-sans",
                }}
                x={200}
                y={190}
                text="Rp225.000"
              />
              <VictoryLabel
                textAnchor="middle"
                style={{
                  fontSize: 12,
                  fontFamily: "Open-sans",
                }}
                x={200}
                y={210}
                text="Your income this month"
              />
            </Svg>
          </View>
        </View>
        <View className="bg-white radius-md mt-2">
          <View className="p-5 border-b border-[#E5E5E5]">
            <Text className="font-bold text-xl">Categories</Text>
          </View>
          <View className="gap-y-7 p-5">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-x-2">
                <View className="px-2 py-1 bg-[#ecd6b1] rounded-lg">
                  <Text>40%</Text>
                </View>
                <Text className="text-lg">Salary</Text>
              </View>
              <Text>Rp 10.000.000</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-x-2">
                <View className="px-2 py-1 bg-[#ecd6b1] rounded-lg">
                  <Text>40%</Text>
                </View>
                <Text className="text-lg">Bonus</Text>
              </View>
              <Text>Rp 10.000.000</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Graph;