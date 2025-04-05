import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import TrxHistoryCard from "@/components/TrxHistoryCard";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MoneyLogs = () => {
  const router = useRouter();
  return (
    <View className="flex-1 relative">
      <SafeAreaView className="bg-light-100 min-h-screen">
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <Header>
            <Text className="text-xl font-bold py-3 px-2">Money Logs</Text>
          </Header>
          <View className="mt-5 bg-white py-7">
            <View className="flex flex-row justify-between px-7">
              <Text className="text-2xl font-bold">Cash Flow</Text>
              <Text className="text-[#B3B3B3]">Feb 2025</Text>
            </View>
            <View className="border-b border-[#E5E5E5] my-5"></View>
            <View className="px-7">
              <Text className="text-[#B3B3B3] text-lg">
                Am I spending less than I make ?
              </Text>
              <Text className="text-2xl text-[#0061FF] font-semibold mt-1 mb-4">
                + IDR 10.000.000
              </Text>
              <View className="mb-4">
                <View className="flex flex-row justify-between">
                  <Text>Income</Text>
                  <Text>IDR 20.000.000</Text>
                </View>
                <ProgressBar color="#0061FF" value={100} />
              </View>
              <View>
                <View className="flex flex-row justify-between">
                  <Text>Expenses</Text>
                  <Text>IDR 10.000.000</Text>
                </View>
                <ProgressBar color="#FF450C" value={50} />
              </View>
            </View>
          </View>
          <View className="bg-white radius-md mt-5">
            <View className="p-5 border-b border-[#E5E5E5]">
              <Text className="font-bold text-xl">Transaction History</Text>
            </View>
            <View className="gap-y-5 p-5">
              <TrxHistoryCard
                key={1}
                images={images.profileBlank}
                name={"Transportation"}
                inout={"out"}
                type={"Expense"}
                date={"08 December 2024"}
                amount={75000}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <TouchableOpacity
        className="absolute bottom-28 right-6 bg-blue-500 p-4 rounded-full"
      >
        <Image source={icons.plus} className="w-7 h-7" />
      </TouchableOpacity>
    </View>
  );
};

export default MoneyLogs;
 