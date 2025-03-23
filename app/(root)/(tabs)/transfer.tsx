import Button from "@/components/Button";
import Header from "@/components/Header";
import InputTransaction from "@/components/InputTransaction";
import React from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const handleTransfer = () => {};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="bg-light-100 min-h-screen">
        <Header>
          <Text className="text-xl font-bold py-3 px-2">Transfer</Text>
        </Header>
        <View className="bg-[#0061FF] px-5 py-4 mb-7">
          <Text className="text-white text-xl">To: 9000008940208</Text>
        </View>
        <InputTransaction
          label="IDR"
          type="numeric"
          title="Amount"
          balance={10000000}
        />
        <InputTransaction classname="mt-8" type="default" title="Notes" />
        <Button
          label="Transfer"
          classname="absolute bottom-24 left-5 right-5 mb-3"
          onPress={handleTransfer}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Profile;
