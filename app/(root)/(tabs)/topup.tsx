import Button from "@/components/Button";
import Header from "@/components/Header";
import InputTransaction from "@/components/InputTransaction";
import ModalSelect from "@/components/ModalSelect";
import icons from "@/constants/icons";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const options = [{ name: "Byond PAY" }, { name: "Credit Card" }];

const Topup = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handlePaymentSelect = (name: string) => {
    setSelectedValue(name);
    setModalVisible(false);
  };

  const handleTopup = () => {};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="bg-light-100 min-h-screen">
        <Header>
          <Text className="text-xl font-bold py-3 px-2">Top Up</Text>
        </Header>
        <View className="mt-10"></View>
        <InputTransaction label="IDR" type="numeric" title="Amount" />
        <TouchableOpacity
          className="bg-white px-7 py-6 mt-8 flex-row items-center justify-between"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-lg">
            {selectedValue == "" ? "Pilih Metode" : selectedValue}
          </Text>
          <Image source={icons.chevrondown} />
        </TouchableOpacity>
        <ModalSelect
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          options={options}
          handleSelect={handlePaymentSelect}
        />
        <InputTransaction classname="mt-8" type="default" title="Notes" />
        <Button
          label="Top Up"
          classname="absolute bottom-24 left-5 right-5 mb-3"
          onPress={handleTopup}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Topup;
