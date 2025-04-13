import { getAccount } from "@/api/model/account";
import Header from "@/components/Header";
import icons from "@/constants/icons";
import { Account } from "@/model/account";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

const MyQR = () => {
  const [account, setAccount] = useState<Account | null>(null);

  const fetchAccountData = async () => {
    try {
      const res = await getAccount();
      setAccount(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  return (
    <SafeAreaView className="min-h-screen bg-[#0061FF]">
      <Header>
        <View className="flex flex-row items-center gap-x-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={icons.arrowback} style={{ width: 15, height: 15 }} />
          </TouchableOpacity>
          <Text className="text-xl font-bold py-3 px-2">Scan QR Code</Text>
        </View>
      </Header>
      <View className="m-auto w-full px-10">
        <View className="bg-white rounded-xl px-10 py-20">
          <Text className="text-center">Powered by QRku</Text>
          <View className="mx-auto mt-5">
            {account && (
              <QRCode
                value={account.accountNo}
                size={220}
                backgroundColor="white"
              />
            )}
          </View>
          <Text className="text-center mt-5 text-[#B3B3B3]">
            Scan with Fulusku to receive money!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyQR;
 