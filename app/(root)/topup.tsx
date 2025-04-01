import { topup } from "@/api/model/transaction";
import Button from "@/components/Button";
import Header from "@/components/Header";
import InputTransaction from "@/components/InputTransaction";
import ModalSelect from "@/components/ModalSelect";
import TrxModal from "@/components/TrxModal";
import icons from "@/constants/icons";
import { PaymentOptions } from "@/model/modal";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const options: PaymentOptions[] = [
  { name: "Byond PAY", value: "byond_pay" },
  { name: "Credit Card", value: "credit_card" },
];

type TopUpData = {
  paymentMethod: string;
  amount: number;
  notes?: string;
};

const Topup = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<TopUpData>({
    defaultValues: {
      paymentMethod: "",
    },
  });

  const [open, setOpen] = useState(false);
  const [topupTransfer, setTopupResponse] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const onSubmit = async (d: TopUpData) => {
    try {
      const res = await topup(d.paymentMethod, d.amount, d.notes);
      setTopupResponse(res.data.data);
      setOpen(true);
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.metadata?.message || error.message;
        Toast.show({
          type: "error",
          text1: "Failed",
          text2: message,
        });
      } else {
        console.log("Unexpected error", error);
      }
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView className="bg-light-100 min-h-screen">
          <TrxModal
            open={open}
            setOpen={setOpen}
            data={topupTransfer}
            title="Top Up Sukses"
          />
          <Header>
            <View className="flex flex-row items-center gap-x-4">
              <TouchableOpacity onPress={() => router.back()}>
                <Image
                  source={icons.arrowback}
                  style={{ width: 15, height: 15 }}
                />
              </TouchableOpacity>
              <Text className="text-xl font-bold py-3 px-2">Top Up</Text>
            </View>
          </Header>
          <View className="mt-10"></View>
          <Controller
            control={control}
            name="amount"
            rules={{ required: "Amount is required" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <InputTransaction
                label="IDR"
                type="numeric"
                title="Amount"
                onChange={onChange}
                value={value}
                ref={ref}
              />
            )}
          />
          {errors.amount && (
            <Text className=" px-5 text-sm text-red-600">
              Amount wajib diisi
            </Text>
          )}
          <Controller
            control={control}
            name="paymentMethod"
            rules={{ required: "Payment Method is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TouchableOpacity
                  className="bg-white px-7 py-6 mt-8 flex-row items-center justify-between"
                  onPress={() => setModalVisible(true)}
                >
                  <Text className="text-lg">
                    {value ? value : "Pilih Metode"}
                  </Text>
                  <Image source={icons.chevrondown} />
                </TouchableOpacity>

                <ModalSelect
                  value={value}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                  options={options}
                  handleSelect={(selectedName) => onChange(selectedName)}
                  title="Pilih Metode Top Up :"
                />

                {errors.paymentMethod && (
                  <Text className=" px-5 text-sm text-red-600">
                    Payment Method wajib diisi
                  </Text>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <InputTransaction
                classname="mt-8"
                type="default"
                title="Notes"
                onChange={onChange}
                value={value}
                ref={ref}
              />
            )}
          />
          <Button
            label="Top Up"
            classname="absolute bottom-24 left-5 right-5 mb-3"
            onPress={handleSubmit(onSubmit)}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Topup;
