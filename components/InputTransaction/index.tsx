import classNames from "classnames";
import React, { forwardRef } from "react";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

type inputProps = {
  classname?: string;
  label?: string;
  title: string;
  type: KeyboardTypeOptions;
  balance?: number;
  onChange: (e: any) => void;
  value: any;
};

const InputTransaction = forwardRef<TextInput, inputProps>(
  ({ classname, label, title, type, balance, onChange, value }, ref) => {
    return (
      <View
        className={classNames(
          classname,
          "bg-white dark:bg-black-300 px-7 py-6"
        )}
      >
        <Text className="text-xl text-[#B3B3B3] dark:text-white mb-2">
          {title}
        </Text>
        <View
          className={classNames(
            label && "flex flex-row gap-x-5",
            "border-b border-[#E1E1E1] py-3"
          )}
        >
          {label && <Text className="dark:text-white">{label}</Text>}
          <TextInput
            ref={ref}
            className="text-black text-4xl font-[400] w-full dark:text-white"
            keyboardType={type}
            onChangeText={onChange}
            value={value}
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
  }
);

export default InputTransaction;
