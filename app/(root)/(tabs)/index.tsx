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
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { userInfo } = useUserContext();
  const [account, setAccount] = useState<Account | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const isFocused = useIsFocused();

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

  useEffect(() => {
    if (isFocused) {
      fetchAccountData();
      fetchTransactions();
    }
  }, [isFocused]);

  return (
    <SafeAreaView className="bg-light-100 min-h-screen">
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <Header>
          <View className="flex flex-row items-center gap-x-15">
            <View>
              <Image source={images.profile} width={60} />
            </View>
            <View className="ms-4">
              <Text className="font-bold">{userInfo?.name}</Text>
              <Text className="">Personal Account</Text>
            </View>
          </View>
        </Header>
        <View className="px-5 mt-10">
          <View className="flex flex-row">
            <View className="flex-1">
              <Text className="text-2xl font-bold mb-2">
                Good Morning, {userInfo?.name}
              </Text>
              <Text className="text-lg font-light">
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
          <View className="bg-white radius-md p-5 mt-6">
            <View className="flex flex-row justify-between items-center">
              <View className="">
                <Text className="text-lg font-light">Balance</Text>
                <View className="flex flex-row items-center gap-x-2">
                  <Text className="text-3xl font-semibold" id="balance">
                    Rp {account?.balance}
                  </Text>
                  <Image source={icons.eye} width={30} />
                </View>
              </View>
              <View className="flex flex-col gap-y-3">
                <View className="">
                  <Link href="/topup" className="bg-primary-300 p-2 rounded-xl">
                    <Image source={icons.plus} className="w-6 h-6" alt="plus" />
                  </Link>
                </View>
                <View className="">
                  <Link
                    href="/transfer"
                    className="bg-primary-300 p-2 rounded-xl"
                  >
                    <Image source={icons.send} className="w-6 h-6" alt="send" />
                  </Link>
                </View>
              </View>
            </View>
          </View>
          <View className="bg-white radius-md mt-5">
            <View className="p-5 border-b border-[#E5E5E5]">
              <Text className="font-bold text-xl">Transaction History</Text>
            </View>
            <View className="gap-y-5 p-5">
              {transactions.slice(0, 5).map((item, key) => (
                <TrxHistoryCard
                  key={key}
                  images={images.profileBlank}
                  name={item.fromto}
                  inout={item.inout}
                  type={item.type}
                  date={item.createdAt}
                  amount={item.amount}
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
