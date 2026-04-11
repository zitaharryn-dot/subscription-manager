import SubscriptionCard from "@/components/subscription-card";
import { useSubscriptions } from "@/lib/subscription-context";
import { styled } from "nativewind";
import { usePostHog } from "posthog-react-native";
import { useMemo, useRef, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Subscriptions = () => {
  const posthog = usePostHog();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<
    string | null
  >(null);
  const { subscriptions } = useSubscriptions();
  const searchDebounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredSubscriptions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return subscriptions;
    }

    return subscriptions.filter((subscription) => {
      const candidateFields = [
        subscription.name,
        subscription.plan,
        subscription.category,
        subscription.paymentMethod,
      ];

      return candidateFields.some((field) =>
        field?.toLowerCase().includes(query),
      );
    });
  }, [searchQuery, subscriptions]);

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <View className="mb-5">
        <Text className="text-2xl font-sans-bold text-primary">
          Subscriptions
        </Text>
        <Text className="mt-2 text-sm font-sans-regular text-muted-foreground">
          Search your active services and manage billing details.
        </Text>
      </View>

      <TextInput
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          if (searchDebounceTimer.current) {
            clearTimeout(searchDebounceTimer.current);
          }
          if (text.trim().length > 0) {
            searchDebounceTimer.current = setTimeout(() => {
              posthog.capture("subscription_searched", {
                query_length: text.trim().length,
              });
            }, 800);
          }
        }}
        placeholder="Search subscriptions"
        placeholderTextColor="#8a8a8f"
        className="mb-5 rounded-3xl border border-black/10 bg-card px-4 py-4 text-base font-sans-regular text-primary"
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />

      <FlatList
        data={filteredSubscriptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubscriptionCard
            {...item}
            expanded={expandedSubscriptionId === item.id}
            onPress={() =>
              setExpandedSubscriptionId((currentId) =>
                currentId === item.id ? null : item.id,
              )
            }
          />
        )}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListEmptyComponent={() => (
          <View className="rounded-3xl border border-black/10 bg-card p-6">
            <Text className="text-base font-sans-semibold text-primary">
              No subscriptions match your search.
            </Text>
            <Text className="mt-2 text-sm font-sans-regular text-muted-foreground">
              Try a different name, category, or payment method.
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </SafeAreaView>
  );
};

export default Subscriptions;
