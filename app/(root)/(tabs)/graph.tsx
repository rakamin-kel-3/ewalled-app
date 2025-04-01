import Header from "@/components/Header";
import React from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Graph = () => {
  return (
    <SafeAreaView className="bg-light-100 min-h-screen">
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <Header>
          <Text className="text-xl font-bold py-3 px-2">Graph</Text>
        </Header>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Graph;
