import Button from "@/components/Button";
import Input from "@/components/Input";
import images from "@/constants/images";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username == "admin" && password == "Password") {
      router.push("/");
    }

    setError("username atau password salah");
  };

  const handleSignUp = () => router.replace("/sign-up");

  return (
    <SafeAreaView className="bg-light h-screen w-full">
      <View className="px-10 m-auto w-full">
        <View className="mx-auto mb-32">
          <Image source={images.logo} />
        </View>
        {error && <Text className="text-red-400">{error}</Text>}
        <View className="mb-5">
          <Input
            secureTextEntry={false}
            placeholder="Email"
            placeholderTextColor="black"
            onChange={(text) => setUsername(text)}
          />
        </View>
        <View className="mb-20">
          <Input
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="black"
            onChange={(text) => setPassword(text)}
          />
        </View>
        <View className="">
          <Button onPress={handleLogin} label="Login" />
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
  );
}
