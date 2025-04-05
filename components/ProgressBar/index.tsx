import React from "react";
import { View } from "react-native";

const ProgressBar = ({ color, value }: { color: string; value: number }) => {
  return (
    <View className="bg-[#FAFBFD] mt-3 rounded-lg">
      <View
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
        className="px-3 py-5 rounded-lg"
      ></View>
    </View>
  );
};

export default ProgressBar;
 