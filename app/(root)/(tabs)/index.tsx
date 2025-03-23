import Header from "@/components/Header";
import TrxHistoryCard from "@/components/TrxHistoryCard";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="bg-light-100 min-h-screen">
      <Header>
        <View className="flex flex-row items-center gap-x-15">
          <View>
            <Image source={images.profile} width={60} />
          </View>
          <View className="ms-4">
            <Text className="font-bold">Chelsea Immanuela</Text>
            <Text className="">Personal Account</Text>
          </View>
        </View>
      </Header>
      <View className="px-5 mt-10">
        <View className="flex flex-row">
          <View className="flex-1">
            <Text className="text-2xl font-bold mb-2">
              Good Morning, Chelsea
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
            <Text className="text-lg text-white font-semibold">100899</Text>
          </View>
        </View>
        <View className="bg-white radius-md p-5 mt-6">
          <View className="flex flex-row justify-between items-center">
            <View className="">
              <Text className="text-lg font-light">Balance</Text>
              <View className="flex flex-row items-center gap-x-2">
                <Text className="text-3xl font-semibold" id="balance">
                  Rp 10.000.000,00
                </Text>
                <Image source={icons.eye} width={30} />
              </View>
            </View>
            <View className="flex flex-col gap-y-3">
              <View className="">
                <Link href="/" className="bg-primary-300 p-2 rounded-xl">
                  <Image source={icons.plus} className="w-6 h-6" alt="plus" />
                </Link>
              </View>
              <View className="">
                <Link href="/" className="bg-primary-300 p-2 rounded-xl">
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
            <TrxHistoryCard
              images={images.profileBlank}
              name="Ardito dito"
              inout="out"
              type="Transfer"
              date="08 December 2024"
              amount="10.000"
            />
            <TrxHistoryCard
              images={images.profileBlank}
              name="Ardito dito"
              inout="in"
              type="Transfer"
              date="08 December 2024"
              amount="10.000"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
