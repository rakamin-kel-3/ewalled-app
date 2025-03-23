import Button from "@/components/Button";
import Input from "@/components/Input";
import images from "@/constants/images";
import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const handleLogin = () => {
    router.push("/");
  };

  const handleLoginPage = () => router.replace("/sign-in");

  return (
    <SafeAreaView className="px-10 bg-light h-screen w-full">
      <View className="m-auto w-full">
        <View className="mx-auto mb-14">
          <Image source={images.logo} />
        </View>
        <View className="mb-5">
          <Input
            secureTextEntry={false}
            placeholder="Fullname"
            placeholderTextColor="black"
          />
        </View>
        <View className="mb-5">
          <Input
            secureTextEntry={false}
            placeholder="Email"
            placeholderTextColor="black"
          />
        </View>
        <View className="mb-5">
          <Input
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="black"
          />
        </View>
        <View className="mb-5">
          <Input
            secureTextEntry={false}
            placeholder="Avatar URL"
            placeholderTextColor="black"
          />
        </View>
        <View className="">
          <Button onPress={handleLogin} label="Register" />
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
