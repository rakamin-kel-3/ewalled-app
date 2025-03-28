import { PaymentOptions } from "@/model/modal";
import React from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

const ModalSelect = ({
  options,
  modalVisible,
  setModalVisible,
  handleSelect,
  value,
  title,
}: {
  options: PaymentOptions[];
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelect: (name: string) => void;
  value: string;
  title: string;
}) => {
  const handleClick = (name: string) => {
    handleSelect(name);
    setModalVisible(false);
  };
  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setModalVisible(false)}
        className="flex-1 bg-[#0000004c] justify-center items-center"
      >
        <View className="bg-white rounded-md w-2/3 py-7 px-4">
          <Text className="text-xl mb-4">{title}</Text>
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleClick(item.value)}
                className="px-2 py-3 border-t border-[#E1E1E1]"
              >
                <Text className="text-lg">{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalSelect;
