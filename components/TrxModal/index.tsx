import icons from "@/constants/icons";
import React from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TrxModal({
  open,
  setOpen,
  data,
  title,
}: {
  open: boolean;
  setOpen: (arg0: boolean) => void;
  data: Object;
  title: string;
}) {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => setOpen(false)}
    >
      <View className="flex-1 bg-black/40 justify-center items-center px-4">
        <View className="bg-white rounded-2xl w-full max-w-md p-6">
          <View className="items-center mb-5">
            <Image
              source={icons.success}
              className="w-12 h-12"
              resizeMode="contain"
            />
            <Text className="text-2xl font-semibold text-[#2DC071] mt-4">
              {title}
            </Text>
          </View>

          <ScrollView className="mt-6">
            <View className="flex-row justify-between mb-4">
              <Text className="text-md font-light">Amount</Text>
              <Text className="font-bold text-2xl">{data?.amount}</Text>
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-md font-light">Transaction ID</Text>
              <Text className="text-md text-right flex-1 font-light">
                {data?.transactionId}
              </Text>
            </View>
            {data?.acocuntFrom && (
              <View className="flex-row justify-between mb-4">
                <Text className="text-md font-light">From</Text>
                <Text className="text-md font-light">{data?.accountFrom}</Text>
              </View>
            )}
            {data?.accountTo && (
              <View className="flex-row justify-between mb-4">
                <Text className="text-md font-light">To</Text>
                <Text className="text-md font-light">{data?.accountTo}</Text>
              </View>
            )}
            <View className="flex-row justify-between mb-4">
              <Text className="text-md font-light">Description</Text>
              <Text className="text-md font-light">{data?.description}</Text>
            </View>
          </ScrollView>

          <View className="flex-row justify-center mt-8 gap-x-4">
            <TouchableOpacity
              onPress={() => {
                setOpen(false);
              }}
              className="rounded-md border border-[#23A6F0] px-4 py-2"
            >
              <Text className="text-sm font-semibold text-[#23A6F0]">
                Print
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOpen(false)}
              className="rounded-md border border-[#23A6F0] px-4 py-2"
            >
              <Text className="text-sm font-semibold text-[#23A6F0]">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
