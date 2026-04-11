import { getSubscriptionIcon } from "@/lib/utils";
import clsx from "clsx";
import dayjs from "dayjs";
import { usePostHog } from "posthog-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const categoryOptions = [
  "Entertainment",
  "AI Tools",
  "Developer Tools",
  "Design",
  "Productivity",
  "Cloud",
  "Music",
  "Other",
] as const;

const categoryColors: Record<string, string> = {
  Entertainment: "#f5c542",
  "AI Tools": "#b8d4e3",
  "Developer Tools": "#e8def8",
  Design: "#b8e8d0",
  Productivity: "#dbe6ff",
  Cloud: "#c7f0f2",
  Music: "#ffd6e0",
  Other: "#e2e8f0",
};

interface CreateSubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (subscription: Subscription) => void;
}

const CreateSubscriptionModal = ({
  visible,
  onClose,
  onCreate,
}: CreateSubscriptionModalProps) => {
  const posthog = usePostHog();
  const [name, setName] = useState("");
  const [priceText, setPriceText] = useState("");
  const [frequency, setFrequency] = useState<"Monthly" | "Yearly">("Monthly");
  const [category, setCategory] = useState<(typeof categoryOptions)[number]>(
    categoryOptions[0],
  );

  const priceValue = Number(priceText.replace(/[^0-9.]/g, ""));
  const isValid = name.trim().length > 0 && priceValue > 0;

  const resetForm = () => {
    setName("");
    setPriceText("");
    setFrequency("Monthly");
    setCategory(categoryOptions[0]);
  };

  const handleCreate = () => {
    if (!isValid) {
      return;
    }

    const startDate = dayjs();
    const renewalDate =
      frequency === "Monthly"
        ? startDate.add(1, "month")
        : startDate.add(1, "year");

    const subscription: Subscription = {
      id: `${name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
      icon: getSubscriptionIcon(name),
      name: name.trim(),
      price: priceValue,
      currency: "USD",
      billing: frequency,
      category,
      status: "active",
      startDate: startDate.toISOString(),
      renewalDate: renewalDate.toISOString(),
      color: categoryColors[category] ?? "#e2e8f0",
    };

    onCreate(subscription);

    posthog.capture("subscription_created", {
      subscription_name: name.trim(),
      subscription_price: priceValue,
      subscription_frequency: frequency,
      subscription_category: category,
    });

    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <Pressable className="modal-overlay" onPress={onClose} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
          <View className="modal-container">
            <View className="modal-header">
              <Text className="modal-title">New Subscription</Text>
              <Pressable className="modal-close" onPress={onClose}>
                <Text className="modal-close-text">×</Text>
              </Pressable>
            </View>

            <ScrollView
              className="modal-body"
              contentContainerStyle={{ paddingBottom: 24 }}
              keyboardShouldPersistTaps="handled"
            >
              <View>
                <Text className="auth-label">Name</Text>
                <TextInput
                  className="auth-input"
                  placeholder="Subscription name"
                  placeholderTextColor="rgba(8, 17, 38, 0.35)"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View>
                <Text className="auth-label">Price</Text>
                <TextInput
                  className="auth-input"
                  placeholder="0.00"
                  placeholderTextColor="rgba(8, 17, 38, 0.35)"
                  keyboardType="decimal-pad"
                  value={priceText}
                  onChangeText={setPriceText}
                />
              </View>

              <View>
                <Text className="auth-label">Frequency</Text>
                <View className="picker-row">
                  {(["Monthly", "Yearly"] as const).map((option) => (
                    <Pressable
                      key={option}
                      className={clsx(
                        "picker-option",
                        frequency === option && "picker-option-active",
                      )}
                      onPress={() => setFrequency(option)}
                    >
                      <Text
                        className={clsx(
                          "picker-option-text",
                          frequency === option && "picker-option-text-active",
                        )}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View>
                <Text className="auth-label">Category</Text>
                <View className="category-scroll">
                  {categoryOptions.map((option) => (
                    <Pressable
                      key={option}
                      className={clsx(
                        "category-chip",
                        category === option && "category-chip-active",
                      )}
                      onPress={() => setCategory(option)}
                    >
                      <Text
                        className={clsx(
                          "category-chip-text",
                          category === option && "category-chip-text-active",
                        )}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <Pressable
                className={clsx(
                  "auth-button",
                  !isValid && "auth-button-disabled",
                )}
                onPress={handleCreate}
                disabled={!isValid}
              >
                <Text className="auth-button-text">Create Subscription</Text>
              </Pressable>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default CreateSubscriptionModal;
