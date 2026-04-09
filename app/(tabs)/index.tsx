import "@/global.css";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { Text } from "react-native";
const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text className="text-7xl font-sans-extrabold">Home</Text>
      <Text className="text-7xl font-bold">Home</Text>
    </SafeAreaView>
  );
}
