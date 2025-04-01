import { getAccount, getListAccount } from "@/api/model/account";
import { transfer } from "@/api/model/transaction";
import Button from "@/components/Button";
import Header from "@/components/Header";
import InputTransaction from "@/components/InputTransaction";
import ModalSelect from "@/components/ModalSelect";
import TrxModal from "@/components/TrxModal";
import icons from "@/constants/icons";
import { Account } from "@/model/account";
import { PaymentOptions } from "@/model/modal";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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

type TransferData = {
  receipentAccountNo: string;
  amount: number;
  notes?: string;
  category: string;
};

const Profile = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<TransferData>();

  const [open, setOpen] = useState(false);
  const [myAccount, setMyAccount] = useState<Account | null>(null);
  const [transferResponse, setTransferResponse] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [accounts, setAccounts] = useState<PaymentOptions[]>([]);
  const isFocused = useIsFocused();
  const router = useRouter();

  const onSubmit = async (d: TransferData) => {
    try {
      const res = await transfer(
        d.receipentAccountNo,
        d.amount,
        d.category,
        d.notes
      );
      setTransferResponse(res.data.data);
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

  const fetchAccountData = async () => {
    try {
      const res = await getAccount();
      setMyAccount(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAccount = async () => {
    try {
      const res = await getListAccount();
      const resData: Account[] = res.data.data;

      const accOpts: PaymentOptions[] = resData.map((acc) => ({
        name: `${acc.accountNo} (${acc.name})`,
        value: acc.accountNo,
      }));
      setAccounts(accOpts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchAccountData();
      fetchAccount();
    }
  }, [isFocused]);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView className="bg-light-100 min-h-screen">
          <TrxModal
            open={open}
            setOpen={setOpen}
            data={transferResponse}
            title="Transfer Sukses"
          />
          <Header>
            <View className="flex flex-row items-center gap-x-4">
              <TouchableOpacity onPress={() => router.back()}>
                <Image
                  source={icons.arrowback}
                  style={{ width: 15, height: 15 }}
                />
              </TouchableOpacity>
              <Text className="text-xl font-bold py-3 px-2">Transfer</Text>
            </View>
          </Header>
          <Controller
            control={control}
            name="receipentAccountNo"
            rules={{ required: "Receipent Account is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TouchableOpacity
                  className="bg-[#0061FF] px-5 py-4 mb-7"
                  onPress={() => setModalVisible(true)}
                >
                  <Text className="text-white text-xl">
                    To: {value ? value : "Pilih penerima"}
                  </Text>
                </TouchableOpacity>

                <ModalSelect
                  value={value}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                  options={accounts}
                  handleSelect={(selectedName) => onChange(selectedName)}
                  title="Pilih Metode Top Up :"
                />

                {errors.receipentAccountNo && (
                  <Text className=" px-5 text-sm text-red-600">
                    Receiepent Account wajib diisi
                  </Text>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="amount"
            rules={{
              required: "Amount is required",
              validate: (v) => {
                if (Number(v) > Number(myAccount?.balance)) {
                  return "Insufficient Balance";
                }
              },
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <InputTransaction
                label="IDR"
                type="numeric"
                title="Amount"
                balance={myAccount?.balance}
                onChange={onChange}
                value={value}
                ref={ref}
              />
            )}
          />
          {errors.amount && (
            <Text className=" px-5 text-sm text-red-600">
              {errors.amount.message}
            </Text>
          )}
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
          <Controller
            control={control}
            name="category"
            rules={{ required: "Category is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TouchableOpacity
                  className="bg-white px-7 py-6 mt-8 flex-row items-center justify-between"
                  onPress={() => setCategoryModalVisible(true)}
                >
                  <Text className="text-lg">
                    {value ? value : "Pilih Category"}
                  </Text>
                  <Image source={icons.chevrondown} />
                </TouchableOpacity>

                <ModalSelect
                  value={value}
                  modalVisible={categoryModalVisible}
                  setModalVisible={setCategoryModalVisible}
                  options={[
                    { name: "Shopping", value: "shopping" },
                    { name: "Food", value: "food" },
                    { name: "Transport", value: "transport" },
                    { name: "Hobbies", value: "hobbies" },
                    { name: "Etc", value: "etc" },
                  ]}
                  handleSelect={(selectedName) => onChange(selectedName)}
                  title="Pilih Category :"
                />

                {errors.category && (
                  <Text className=" px-5 text-sm text-red-600">
                    Category wajib diisi
                  </Text>
                )}
              </>
            )}
          />
          <Button
            label="Transfer"
            classname="absolute bottom-24 left-5 right-5 mb-3"
            onPress={handleSubmit(onSubmit)}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Profile;
