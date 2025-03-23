import classNames from "classnames";
import React from "react";
import { Pressable, Text } from "react-native";

const Button = ({
  onPress,
  classname,
  label,
}: {
  onPress: () => void;
  classname?: string;
  label: string;
}) => {
  return (
    <Pressable
      className={classNames(classname, "bg-primary-300 py-5 rounded-2xl")}
      onPress={onPress}
    >
      <Text className="text-white font-bold text-center">{label}</Text>
    </Pressable>
  );
};

export default Button;
