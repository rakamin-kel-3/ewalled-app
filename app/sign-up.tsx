import { registerUser } from "@/api/model/user";
import Button from "@/components/Button";
import Input from "@/components/Input";
import images from "@/constants/images";
import axios from "axios";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

type RegisterFormData = {
  username: string;
  fullname: string;
  email: string;
  password: string;
  phoneNumber: string;
  avatar: string;
};

const SignUp = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterFormData>();

  const handleLogin = () => {
    router.push("/");
  };

  const onSubmit = async (d: RegisterFormData) => {
    try {
      await registerUser(
        d.fullname,
        d.username,
        d.email,
        d.password,
        d.phoneNumber
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Berhasil mendaftarkan akun, silahkan login",
      });
      router.replace("/sign-in");
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

  const handleLoginPage = () => router.replace("/sign-in");

  return (
    <SafeAreaView className="px-10 bg-light h-screen w-full">
      <View className="m-auto w-full">
        <View className="mx-auto mb-14">
          <Image source={images.logo} />
        </View>
        <View className="mb-5">
          <Controller
            control={control}
            name="fullname"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                secureTextEntry={false}
                placeholder="Fullname"
                value={value}
                onChange={onChange}
                placeholderTextColor="black"
                ref={ref}
              />
            )}
          />
          {errors.fullname && (
            <span className="text-sm text-red-600">Fullname wajib diisi</span>
          )}
        </View>
        <View className="mb-5">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                secureTextEntry={false}
                placeholder="Email"
                value={value}
                onChange={onChange}
                placeholderTextColor="black"
                ref={ref}
              />
            )}
          />
          {errors.email && (
            <span className="text-sm text-red-600">Email wajib diisi</span>
          )}
        </View>
        <View className="mb-5">
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                secureTextEntry={true}
                placeholder="Password"
                value={value}
                onChange={onChange}
                placeholderTextColor="black"
                ref={ref}
              />
            )}
          />
          {errors.password && (
            <span className="text-sm text-red-600">Password wajib diisi</span>
          )}
        </View>
        <View className="mb-5">
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                secureTextEntry={false}
                placeholder="Phone Number"
                value={value}
                onChange={onChange}
                placeholderTextColor="black"
                ref={ref}
                type="numeric"
              />
            )}
          />
          {errors.phoneNumber && (
            <span className="text-sm text-red-600">
              Phone Number wajib diisi
            </span>
          )}
        </View>
        <View className="">
          <Button onPress={handleSubmit(onSubmit)} label="Register" />
        </View>
        <Text className="mt-7">
          Have an account?{" "}
          <Text className="text-primary-300" onPress={() => handleLoginPage()}>
            Login here
          </Text>
          {/* <Link href={"/sign-in"}>login</Link> */}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
