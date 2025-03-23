import React from "react";
import { Image, Text, View } from "react-native";
export const CardProduct = ({ item }: { item: {} }) => {
  return (
    <View
      key={item.id}
      className="border max-w-[180px] border-[#000] rounded-xl p-4 shadow-sm text-center flex flex-col hover:bg-[#ededed]"
    >
      <Image
        source={{ uri: item.image }} // Pastikan item.image adalah URL valid
        style={{ width: 100, height: 100 }} // Tambahkan height
        resizeMode="contain" // Atur resizeMode agar gambar sesuai
        className="mx-auto"
      />
      <Text className="text-md font-bold mt-5">
        {item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title}
      </Text>
      <Text className="text-sm mt-2 mb-5 text-[#555]">
        {item.description.length > 50
          ? item.description.slice(0, 50) + "..."
          : item.description}
      </Text>
      <Text className="mt-auto mb-2 text-center">$ {item.price}</Text>
    </View>
  );
};

export default CardProduct;
