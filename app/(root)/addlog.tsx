import Button from "@/components/Button";
import Header from "@/components/Header";
import InputTransaction from "@/components/InputTransaction";
import ModalSelect from "@/components/ModalSelect";
import icons from "@/constants/icons";
import { PaymentOptions } from "@/model/modal";
import { useRouter } from "expo-router";
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

const options: PaymentOptions[] = [
  { name: "Expense", value: "expense" },
  { name: "Income", value: "income" },
];

const Addlog = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView className="bg-light-100 min-h-screen">
          <Header>
            <View className="flex flex-row items-center gap-x-4">
              <TouchableOpacity onPress={() => router.back()}>
                <Image
                  source={icons.arrowback}
                  style={{ width: 15, height: 15 }}
                />
              </TouchableOpacity>
              <Text className="text-xl font-bold py-3 px-2">Add Money Log</Text>
            </View>
          </Header>
          <View className="mt-10"></View>
          <InputTransaction
            label="IDR"
            type="numeric"
            title="Amount"
            onChange={() => console.log("test")}
            value={10000}
          />
          <TouchableOpacity
            className="bg-white px-7 py-6 mt-8 flex-row items-center justify-between"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-lg">Choose Type</Text>
            <Image source={icons.chevrondown} />
          </TouchableOpacity>

          <ModalSelect
            value={"aa"}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            options={options}
            handleSelect={(selectedName) => console.log(selectedName)}
            title="Choose Type :"
          />

          <TouchableOpacity
            className="bg-white px-7 py-6 mt-8 flex-row items-center justify-between"
            onPress={() => setModalCategoryVisible(true)}
          >
            <Text className="text-lg">Choose Category</Text>
            <Image source={icons.chevrondown} />
          </TouchableOpacity>

          <ModalSelect
            value={"aa"}
            modalVisible={modalCategoryVisible}
            setModalVisible={setModalCategoryVisible}
            options={options}
            handleSelect={(selectedName) => console.log(selectedName)}
            title="Choose Category :"
          />

          <InputTransaction
            classname="mt-8"
            type="default"
            title="Notes"
            onChange={() => console.log("change")}
            value={""}
          />

          <Button
            label="Save"
            classname="absolute bottom-24 left-5 right-5 mb-3"
            onPress={() => console.log("submit")}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Addlog;
 