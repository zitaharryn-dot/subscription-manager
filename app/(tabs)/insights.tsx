import { icons } from "@/constants/icons";
import { styled } from "nativewind";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const chartData = [
  { day: "Mon", amount: 35 },
  { day: "Tue", amount: 28 },
  { day: "Wed", amount: 20 },
  { day: "Thu", amount: 40, highlight: true },
  { day: "Fri", amount: 34 },
  { day: "Sat", amount: 18 },
  { day: "Sun", amount: 24 },
];

const historyItems = [
  {
    id: "claude",
    icon: icons.claude,
    name: "Claude",
    date: "June 25, 12:00",
    price: "$9.84",
    billing: "per month",
    backgroundColor: "#fff0a8",
  },
  {
    id: "canva",
    icon: icons.canva,
    name: "Canva",
    date: "June 30, 16:00",
    price: "$43.89",
    billing: "per month",
    backgroundColor: "#dff7f2",
  },
];

const Insights = () => {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="mb-6 flex-row items-center justify-between">
          <Pressable className="rounded-2xl bg-card p-3">
            <Image source={icons.back} className="size-5" />
          </Pressable>

          <Text className="text-xl font-sans-bold text-primary">
            Monthly Insights
          </Text>

          <Pressable className="rounded-2xl bg-card p-3">
            <Image source={icons.menu} className="size-5" />
          </Pressable>
        </View>

        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-2xl font-sans-bold text-primary">Upcoming</Text>
          <Pressable className="rounded-full border border-black/10 px-4 py-2">
            <Text className="text-sm font-sans-semibold text-primary">
              View all
            </Text>
          </Pressable>
        </View>

        <View className="rounded-3xl bg-card p-5">
          <View className="h-36 justify-between">
            <View className="absolute inset-x-0 top-10 h-px bg-black/10" />
            <View className="absolute inset-x-0 top-20 h-px bg-black/10" />
            <View className="absolute inset-x-0 top-30 h-px bg-black/10" />
            <View className="z-10 flex-row items-end justify-between gap-2 pt-4">
              {chartData.map((point) => {
                const height = (point.amount / 45) * 120;
                return (
                  <View key={point.day} className="items-center">
                    {point.highlight ? (
                      <View className="mb-2 rounded-full bg-accent px-2 py-1">
                        <Text className="text-xs font-sans-semibold text-white">
                          ${point.amount}
                        </Text>
                      </View>
                    ) : null}
                    <View
                      className={
                        point.highlight
                          ? "w-4 rounded-full bg-accent"
                          : "w-4 rounded-full bg-primary"
                      }
                      style={{ height }}
                    />
                    <Text className="mt-4 text-xs font-sans-semibold text-muted-foreground">
                      {point.day}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        <View className="mt-10 rounded-3xl bg-background border border-black/10 px-5 py-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-sans-semibold text-primary">
                Expenses
              </Text>
              <Text className="text-sm font-sans-regular text-muted-foreground">
                March 2026
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-xl font-sans-bold text-primary">
                –$424.63
              </Text>
              <Text className="text-sm font-sans-semibold text-success">
                +12%
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-6 mb-4 flex-row items-center justify-between">
          <Text className="text-2xl font-sans-bold text-primary">History</Text>
          <Pressable className="rounded-full border border-black/10 px-4 py-2">
            <Text className="text-sm font-sans-semibold text-primary">
              View all
            </Text>
          </Pressable>
        </View>

        {historyItems.map((item) => (
          <View
            key={item.id}
            className="mb-4 rounded-3xl p-5 shadow-sm"
            style={{ backgroundColor: item.backgroundColor }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <Image source={item.icon} className="size-14 rounded-2xl" />
                <View>
                  <Text className="text-lg font-sans-bold text-primary">
                    {item.name}
                  </Text>
                  <Text className="text-sm font-sans-semibold text-muted-foreground">
                    {item.date}
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-lg font-sans-bold text-primary">
                  {item.price}
                </Text>
                <Text className="text-sm font-sans-medium text-muted-foreground">
                  {item.billing}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Insights;
