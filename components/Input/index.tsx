import React, { forwardRef } from "react";
import { KeyboardTypeOptions, TextInput } from "react-native";

type inputProps = {
  secureTextEntry: boolean;
  placeholder: string;
  placeholderTextColor: string;
  onChange: (e: any) => void;
  value: string;
  type?: KeyboardTypeOptions;
};

const Input = forwardRef<TextInput, inputProps>(
  (
    {
      secureTextEntry,
      placeholder,
      placeholderTextColor,
      onChange,
      value,
      type = "default",
    },
    ref
  ) => {
    return (
      <TextInput
        ref={ref}
        className="text-black bg-light-100 px-7 py-5 font-semibold rounded-2xl"
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChange}
        value={value}
        keyboardType={type}
      />
    );
  }
);

export default Input;
