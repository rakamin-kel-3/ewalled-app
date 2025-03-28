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
  const getFormattedDate = (inp: string) => {
    const date = new Date(inp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <View className="flex flex-row justify-between items-center">
      <View className="flex flex-row items-center gap-x-3">
        <Image source={images} />
        <View>
          <Text className="text-lg">{name}</Text>
          <Text>{type === "transfer" ? "Transfer" : "Top Up"}</Text>
          <Text className="text-sm text-[#939393]">
            {getFormattedDate(date)}
          </Text>
        </View>
      </View>
      <View>
        {inout == "in" ? (
          <Text className="text-[#2DC071] text-lg">+ {amount},00</Text>
        ) : (
          <Text className="text-[#252B42] text-lg">- {amount},00</Text>
        )}
      </View>
    </View>
  );
};

export default TrxHistoryCard;
