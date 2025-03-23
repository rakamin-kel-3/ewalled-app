import { View } from "react-native";

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="bg-white px-5 py-3 shadow-[0px_4px_10px_0px_#D1D1D140]">
      {children}
    </View>
  );
};

export default Header;
