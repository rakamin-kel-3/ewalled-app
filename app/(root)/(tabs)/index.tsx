import { getAccount } from "@/api/model/account";
import { getTransaction } from "@/api/model/transaction";
import Header from "@/components/Header";
import TrxHistoryCard from "@/components/TrxHistoryCard";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useUserContext } from "@/context/userContext";
import { Account } from "@/model/account";
import { Transaction } from "@/model/transaction";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { userInfo } = useUserContext();
  const [account, setAccount] = useState<Account | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const isFocused = useIsFocused();
  const router = useRouter();
  const { colorScheme, setColorScheme } = useColorScheme();

  const fetchAccountData = async () => {
    try {
      const res = await getAccount();
      setAccount(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await getTransaction(5);
      setTransactions(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFormattedDate = (inp: string) => {
    const date = new Date(inp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatToIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    if (isFocused) {
      fetchAccountData();
      fetchTransactions();
    }
  }, [isFocused]);

  return (
    <SafeAreaView className="bg-light-100 dark:bg-black min-h-screen">
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <Header>
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row items-center gap-x-15">
              <View>
                <Image source={images.profile} width={60} />
              </View>
              <View className="ms-4">
                <Text className="font-bold dark:text-white">
                  {userInfo?.name}
                </Text>
                <Text className="dark:text-white">Personal Account</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  setColorScheme(colorScheme == "dark" ? "light" : "dark")
                }
              >
                <Image source={icons.lightmode} />
              </TouchableOpacity>
            </View>
          </View>
        </Header>
        <View className="px-5 mt-10">
          <View className="flex flex-row">
            <View className="flex-1">
              <Text className="text-2xl font-bold mb-2 dark:text-white">
                Good Morning, {userInfo?.name}
              </Text>
              <Text className="text-lg font-light dark:text-white">
                Check all your incoming and outgoing transactions here
              </Text>
            </View>
            <Image source={images.sun} className="me-2" />
          </View>
          <View className="p-4 bg-primary-300 rounded-2xl items-center mt-8">
            <View className="w-full flex flex-row justify-between items-center">
              <Text className="font-light text-white text-lg">Account No.</Text>
              <Text className="text-lg text-white font-semibold">
                {account?.accountNo}
              </Text>
            </View>
          </View>
          <View className="bg-white dark:bg-black-300 rounded-xl p-5 mt-6">
            <View className="flex flex-row justify-between">
              <View className="">
                <Text className="text-lg font-light dark:text-white">
                  Balance
                </Text>
                <View className="flex flex-row items-center gap-x-2">
                  <Text
                    className="text-3xl font-semibold dark:text-white"
                    id="balance"
                  >
                    Rp {account?.balance}
                  </Text>
                  <Image source={icons.eye} width={30} />
                </View>
              </View>
              <View className="flex flex-row gap-x-3 items-end">
                <View className="">
                  <TouchableOpacity
                    onPress={() => router.push("/topup")}
                    className="bg-primary-300 p-2 rounded-xl"
                  >
                    <Image source={icons.plus} className="w-6 h-6" alt="plus" />
                  </TouchableOpacity>
                </View>
                <View className="">
                  <TouchableOpacity
                    onPress={() => router.push("/transfer")}
                    className="bg-primary-300 p-2 rounded-xl"
                  >
                    <Image source={icons.send} className="w-6 h-6" alt="plus" />
                  </TouchableOpacity>
                </View>
                <View className="">
                  <TouchableOpacity
                    onPress={() => router.push("/qr")}
                    className="bg-primary-300 p-2 rounded-xl"
                  >
                    <Image source={icons.qr} className="w-6 h-6" alt="plus" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View className="bg-white dark:bg-black-300 rounded-xl mt-5">
            <View className="p-5 border-b border-[#E5E5E5]">
              <Text className="font-bold text-xl dark:text-white">
                Transaction History
              </Text>
            </View>
            <View className="gap-y-5 p-5">
              {transactions.slice(0, 5).map((item, key) => (
                <TrxHistoryCard
                  key={key}
                  images={images.profileBlank}
                  name={item.fromto}
                  inout={item.inout}
                  type={item.type === "transfer" ? "Transfer" : "Top Up"}
                  date={getFormattedDate(item.createdAt)}
                  amount={formatToIDR(item.amount)}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
