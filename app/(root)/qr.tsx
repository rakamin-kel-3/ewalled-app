import icons from "@/constants/icons";
import { Camera, CameraView } from "expo-camera";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Qr = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const [isLoadingScan, setIsLoadingScan] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    try {
      router.push(`/transfer?to=${data}`);
    } catch (e) {
      console.warn("Invalid QR Code");
    }

    setTimeout(() => setScanned(false), 2000); // allow scanning again
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-black relative">
        <View className="absolute top-20 left-5 right-5 z-10">
          <View className="flex flex-row justify-between">
            <TouchableOpacity onPress={() => router.back()}>
              <Image source={icons.x} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          className="absolute inset-0 top-40 items-center z-10"
          pointerEvents="none"
        >
          <Text className="text-white font-bold">
            Scan the QR Code Providely
          </Text>
        </View>
        <View className="flex-1 overflow-hidden">
          <CameraView
            onBarcodeScanned={handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            style={{ flex: 1 }}
            enableTorch={true}
            ratio="16:9"
          />
        </View>
        <View className="bg-neutral-900 border-t border-neutral-800">
          <TouchableOpacity
            className="bg-white py-7 rounded-t-xl"
            onPress={() => router.push("/myqr")}
          >
            <View className="flex flex-row justify-center">
              <Text className="text-black text-center font-bold text-base mr-5">
                Show My QR Code
              </Text>
              <Image source={icons.qrDark} className="w-6 h-6" alt="plus" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Qr;
 