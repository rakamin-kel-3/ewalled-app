import Header from "@/components/Header";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MoneyLogs = () => {
  return (
    <View className="flex-1 relative">
      <SafeAreaView className="bg-light-100 min-h-screen">
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <Header>
            <Text className="text-xl font-bold py-3 px-2">Money Logs</Text>
          </Header>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MoneyLogs;
