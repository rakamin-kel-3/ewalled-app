import { useUserContext } from "@/context/userContext";
import { Redirect, Slot } from "expo-router";

const AppLayout = () => {
  const { isAuthenticated } = useUserContext();

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }

  return <Slot />;
};

export default AppLayout;
