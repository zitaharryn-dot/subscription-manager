import { styled } from "nativewind";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);

const TermsOfService = () => {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text className="text-3xl font-sans-bold text-primary mb-4">
          Terms of Service
        </Text>

        <Text className="text-base font-sans-medium text-muted-foreground mb-4">
          These Terms of Service govern your use of Subscription Manager. By
          accessing or using the app, you agree to these terms.
        </Text>

        <View className="mb-5">
          <Text className="text-lg font-sans-semibold text-primary mb-2">
            Acceptance of Terms
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground leading-6">
            By using Subscription Manager, you accept and agree to comply with
            these terms. If you do not agree, you should not use the app.
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-sans-semibold text-primary mb-2">
            User Eligibility
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground leading-6">
            You must be legally eligible to form a binding contract in your
            jurisdiction and at least 13 years old to use this service.
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-sans-semibold text-primary mb-2">
            Account Information
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground leading-6">
            You are responsible for maintaining your account and login
            credentials. Keep your information accurate and notify us if you
            suspect unauthorized use.
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-sans-semibold text-primary mb-2">
            Use of the Service
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground leading-6">
            The app is provided to help you organize and monitor recurring
            subscriptions. You agree to use it only for lawful and authorized
            purposes.
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-sans-semibold text-primary mb-2">
            User-Provided Content
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground leading-6">
            Any subscription details you add are your responsibility. We do not
            guarantee that stored information is complete or free from user
            error.
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-sans-semibold text-primary mb-2">
            Intellectual Property
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground leading-6">
            The app and its content are the property of the app owner or
            licensors. You may not reproduce, distribute, or modify the app
            without permission.
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-sans-semibold text-primary mb-2">
            Termination
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground leading-6">
            We may suspend or terminate access if you violate these terms or
            misuse the service. You may also discontinue use at any time.
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-sans-semibold text-primary mb-2">
            Disclaimers and Limitation of Liability
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground leading-6">
            The app is provided as-is and without warranties. We are not liable
            for any damages arising from your use of Subscription Manager.
          </Text>
        </View>

        <View>
          <Text className="text-lg font-sans-semibold text-primary mb-2">
            Changes to Terms
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground leading-6">
            We may update these Terms of Service from time to time. Continued
            use of the app after changes means you accept the updated terms.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsOfService;
