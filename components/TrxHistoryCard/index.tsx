import React from "react";
import { Image, Text, View } from "react-native";

const TrxHistoryCard = ({
  images,
  name,
  type,
  date,
  inout,
  amount,
}: {
  images: any;
  name: string;
  type: string;
  date: string;
  inout: string;
  amount: string;
}) => {
  return (
    <View className="flex flex-row justify-between items-center">
      <View className="flex flex-row items-center gap-x-3">
        <Image source={images} />
        <View>
          <Text className="text-lg dark:text-white">{name}</Text>
          <Text className="dark:text-white">{type}</Text>
          <Text className="text-sm text-[#939393] dark:text-light-100">
            {date}
          </Text>
        </View>
      </View>
      <View>
        {inout == "in" ? (
          <Text className="text-[#2DC071] text-lg">+ {amount}</Text>
        ) : (
          <Text className="text-[#252B42] text-lg dark:text-[#0B3BF1]">
            - {amount}
          </Text>
        )}
      </View>
    </View>
  );
};

export default TrxHistoryCard;
