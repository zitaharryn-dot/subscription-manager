import { styled } from "nativewind";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);

const PrivacyPolicy = () => {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text className="text-3xl font-sans-bold text-primary mb-4">
          Privacy Policy
        </Text>

        <Text className="text-base font-sans-medium text-muted-foreground mb-4">
          Subscription Manager takes your privacy seriously. This Privacy Policy
          explains what information we collect, how it is used, and the choices
          you have when using the app.
        </Text>

        <View className="mb-5">
          <Text className="text-lg font-sans-semibold text-primary mb-2">
            Information We Collect
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground leading-6">
            We collect your account details when you sign in through Clerk,
            including your name, email address, and profile image. We also
            collect subscription data that you enter or manage in the app so we
            can provide tracking, renewal reminders, and insights.
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-sans-semibold text-primary mb-2">
            How We Use Information
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground leading-6">
            Your information helps us authenticate your account, personalize the
            experience, and keep your subscription data secure. We use usage
            analytics to understand how the app performs and to improve
            reliability.
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-sans-semibold text-primary mb-2">
            Data Sharing and Third Parties
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground leading-6">
            We do not sell your data. We may share limited information with
            service providers such as authentication and analytics partners to
            support the app. All third parties are required to protect your
            information and are prohibited from using it for other purposes.
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-sans-semibold text-primary mb-2">
            Cookies and Tracking
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground leading-6">
            The app may use analytics tools to collect anonymous usage
            information. This helps us understand feature adoption and identify
            issues. No personally identifiable information is shared through
            these analytics services.
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-sans-semibold text-primary mb-2">
            Data Security
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground leading-6">
            We take reasonable steps to protect your data from unauthorized
            access, disclosure, or modification. Your account information is
            stored according to best practices and authentication is managed by
            Clerk.
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-sans-semibold text-primary mb-2">
            Children
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground leading-6">
            Subscription Manager is not intended for children under the age of
            13. We do not knowingly collect personal information from minors.
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-sans-semibold text-primary mb-2">
            Changes to This Policy
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground leading-6">
            We may update this Privacy Policy from time to time. When changes
            are made, we will revise the effective date and notify users through
            the app when appropriate.
          </Text>
        </View>

        <View>
          <Text className="text-lg font-sans-semibold text-primary mb-2">
            Contact
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground leading-6">
            If you have questions about this Privacy Policy, please contact the
            app owner using the support channel provided in the app or project
            documentation.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
