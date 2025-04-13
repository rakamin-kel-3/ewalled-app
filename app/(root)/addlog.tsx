import { createMoneyLogs } from "@/api/model/moneylogs";
import Button from "@/components/Button";
import Header from "@/components/Header";
import InputTransaction from "@/components/InputTransaction";
import ModalSelect from "@/components/ModalSelect";
import icons from "@/constants/icons";
import { SelectOptions } from "@/model/modal";
import { AddLogRequest } from "@/model/moneylogs";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const catOptions: SelectOptions[] = [
  { name: "Expense", value: "expense" },
  { name: "Income", value: "income" },
];

const optionsIncome: SelectOptions[] = [
  { name: "Salary", value: "salary" },
  { name: "Bonus", value: "bonus" },
];

const optionsExpense: SelectOptions[] = [
  { name: "Shopping", value: "shopping" },
  { name: "Food", value: "food" },
  { name: "Transport", value: "transport" },
  { name: "Hobbies", value: "hobbies" },
  { name: "Study", value: "study" },
  { name: "Etc", value: "etc" },
];

const Addlog = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    resetField,
  } = useForm<AddLogRequest>();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
  const [options, setOptions] = useState<SelectOptions[]>([]);

  const formatLabel = (key: string) => {
    return key.charAt(0).toUpperCase() + key.slice(1);
  };

  const onSubmit = async (d: AddLogRequest) => {
    try {
      await createMoneyLogs(
        d.amount,
        d.type,
        new Date().toISOString().split("T")[0],
        d.category,
        d.notes
      );
      reset();
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Successfully Create new Log",
      });
      router.back();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.metadata?.message || error.message;
        Toast.show({
          type: "error",
          text1: "Failed",
          text2: message,
        });
      } else {
        console.log("Unexpected error", error);
      }
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView className="bg-light-100 dark:bg-black min-h-screen">
          <Header>
            <View className="flex flex-row items-center gap-x-4">
              <TouchableOpacity onPress={() => router.back()}>
                <Image
                  source={icons.arrowback}
                  style={{ width: 15, height: 15 }}
                />
              </TouchableOpacity>
              <Text className="text-xl font-bold py-3 px-2 dark:text-white">
                Add Money Log
              </Text>
            </View>
          </Header>
          <View className="mt-10"></View>
          <Controller
            control={control}
            name="amount"
            rules={{ required: "Amount is required" }}
            render={({ field: { onChange, value, ref } }) => (
              <InputTransaction
                label="IDR"
                type="numeric"
                title="Amount"
                onChange={onChange}
                value={value}
                ref={ref}
              />
            )}
          />
          {errors.amount && (
            <Text className=" px-5 text-sm text-red-600">
              Amount wajib diisi
            </Text>
          )}

          <Controller
            control={control}
            name="type"
            rules={{ required: "Type is required" }}
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity
                  className="bg-white dark:bg-black-300 px-7 py-6 mt-8 flex-row items-center justify-between"
                  onPress={() => setModalVisible(true)}
                >
                  <Text className="text-lg dark:text-white">
                    {value ? formatLabel(value) : "Choose Type"}
                  </Text>
                  <Image source={icons.chevrondown} />
                </TouchableOpacity>

                <ModalSelect
                  value={value}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                  options={catOptions}
                  handleSelect={(selectedName) => {
                    onChange(selectedName);
                    resetField("category");
                    if (selectedName === "expense") {
                      setOptions(optionsExpense);
                    } else {
                      setOptions(optionsIncome);
                    }
                  }}
                  title="Choose Type :"
                />

                {errors.type && (
                  <Text className=" px-5 text-sm text-red-600">
                    Type wajib diisi
                  </Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="category"
            rules={{ required: "Category is required" }}
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity
                  className="bg-white dark:bg-black-300 px-7 py-6 mt-8 flex-row items-center justify-between"
                  onPress={() => setModalCategoryVisible(true)}
                >
                  <Text className="text-lg dark:text-white">
                    {value ? formatLabel(value) : "Choose Category"}
                  </Text>
                  <Image source={icons.chevrondown} />
                </TouchableOpacity>

                <ModalSelect
                  value={value}
                  modalVisible={modalCategoryVisible}
                  setModalVisible={setModalCategoryVisible}
                  options={options}
                  handleSelect={(selectedName) => onChange(selectedName)}
                  title="Choose Category :"
                />

                {errors.category && (
                  <Text className=" px-5 text-sm text-red-600">
                    Category wajib diisi
                  </Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, value, ref } }) => (
              <InputTransaction
                classname="mt-8"
                type="default"
                title="Notes"
                onChange={onChange}
                value={value}
                ref={ref}
              />
            )}
          />

          <Button
            label="Save"
            classname="absolute bottom-24 left-5 right-5 mb-3"
            onPress={handleSubmit(onSubmit)}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Addlog;
