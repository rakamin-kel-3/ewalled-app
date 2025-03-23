import React from "react";
import { TextInput } from "react-native";

const Input = ({
  secureTextEntry,
  placeholder,
  placeholderTextColor,
  onChange,
}: {
  secureTextEntry: boolean;
  placeholder: string;
  placeholderTextColor: string;
  onChange: (e: any) => void;
}) => {
  return (
    <TextInput
      className="text-black bg-light-100 px-7 py-5 font-semibold rounded-2xl"
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChange}
    />
  );
};

export default Input;
