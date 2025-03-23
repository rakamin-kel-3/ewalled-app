import classNames from "classnames";
import React from "react";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

const InputTransaction = ({
  label,
  title,
  type,
  classname,
  balance,
}: {
  classname?: string;
  label?: string;
  title: string;
  type: KeyboardTypeOptions;
  balance?: number;
}) => {
  return (
    <View className={classNames(classname, "bg-white px-7 py-6")}>
      <Text className="text-xl text-[#B3B3B3] mb-2">{title}</Text>
      <View
        className={classNames(
          label && "flex flex-row gap-x-5",
          "border-b border-[#E1E1E1] py-3"
        )}
      >
        {label && <Text>{label}</Text>}
        <TextInput
          className="text-black text-4xl font-[400] w-full"
          keyboardType={type}
        />
      </View>
      {balance && (
        <View className="flex flex-row justify-between items-center mt-1">
          <Text className="text-[#B3B3B3]">Balance</Text>
          <Text className="text-[#0061FF]">IDR {balance}</Text>
        </View>
      )}
    </View>
  );
};

export default InputTransaction;
