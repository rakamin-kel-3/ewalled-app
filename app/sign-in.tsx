import { loginUser } from "@/api/model/user";
import Button from "@/components/Button";
import Input from "@/components/Input";
import images from "@/constants/images";
import { useUserContext } from "@/context/userContext";
import axios from "axios";
import { Redirect, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

type LoginFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginFormData>();

  const { isAuthenticated } = useUserContext();

  const { login } = useUserContext();

  const onSubmit = async (d: LoginFormData) => {
    try {
      const res = await loginUser(d.email, d.password);
      login(res.data.data.token, res.data.data.refreshToken);
    } catch (error: unknown) {
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

  if (isAuthenticated) return <Redirect href="/" />;

  const handleSignUp = () => router.replace("/sign-up");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="bg-light h-screen w-full">
        <View className="px-10 m-auto w-full">
          <View className="mx-auto mb-32">
            <Image source={images.logo} />
          </View>
          <View className="mb-5">
            {errors.email && (
              <Text className=" px-5 text-sm text-red-600">
                Email wajib diisi
              </Text>
            )}
            <Controller
              control={control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  type="email-address"
                  secureTextEntry={false}
                  placeholder="Email"
                  value={value}
                  onChange={onChange}
                  placeholderTextColor="black"
                  ref={ref}
                />
              )}
            />
          </View>
          <View className="mb-20">
            {errors.password && (
              <Text className="px-5 text-sm text-red-600">
                Password wajib diisi
              </Text>
            )}
            <Controller
              control={control}
              name="password"
              rules={{ required: "Password is required" }}
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
          </View>
          <View className="">
            <Button onPress={handleSubmit(onSubmit)} label="Login" />
          </View>
          <Text className="mt-7">
            Dont have an account?{" "}
            <Text onPress={() => handleSignUp()} className="text-primary-300">
              Register here
            </Text>
            {/* <Link href={"/sign-up"}>register</Link> */}
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
