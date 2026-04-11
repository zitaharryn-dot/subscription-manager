import { useAuth, useSignUp } from "@clerk/expo";
import { type Href, Link, Redirect, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUp() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [formError, setFormError] = React.useState("");

  React.useEffect(() => {
    if (isSignedIn && isLoaded) {
      router.replace("/(tabs)");
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ea7a53" />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  const hasVerificationStep =
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0;

  const canSubmit =
    emailAddress.trim().length > 0 &&
    emailRegex.test(emailAddress.trim()) &&
    password.length >= 8 &&
    password === confirmPassword;

  const handleSubmit = async () => {
    setFormError("");

    if (!emailAddress.trim()) {
      setFormError("Enter your work email address.");
      return;
    }

    if (!emailRegex.test(emailAddress.trim())) {
      setFormError("Enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setFormError("Create a password with at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("The passwords do not match.");
      return;
    }

    const { error } = await signUp.password({
      emailAddress: emailAddress.trim(),
      password,
    });

    if (error) {
      setFormError(error.message ?? "Something went wrong. Please try again.");
      return;
    }

    if (signUp.status === "missing_requirements") {
      await signUp.verifications.sendEmailCode();
    }
  };

  const handleVerify = async () => {
    setFormError("");

    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      setFormError(error.message ?? "Invalid code. Please try again.");
      return;
    }

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session.currentTask);
            return;
          }

          const url = decorateUrl("/(tabs)");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });
      return;
    }

    setFormError("Verification did not complete. Please try again.");
  };

  return (
    <KeyboardAvoidingView
      style={styles.page}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.brandArea}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>S</Text>
          </View>
          <Text style={styles.brandTitle}>Subly</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Create your account</Text>
          <Text style={styles.sectionDescription}>
            A simple, secure sign-up flow with email verification.
          </Text>

          {hasVerificationStep ? (
            <>
              <Text style={styles.fieldLabel}>Verification code</Text>
              <TextInput
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                placeholder="Enter code"
                placeholderTextColor="#8a8a8f"
                style={styles.input}
              />
              {errors.fields.code && (
                <Text style={styles.errorText}>
                  {errors.fields.code.message}
                </Text>
              )}
              {formError ? (
                <Text style={styles.errorText}>{formError}</Text>
              ) : null}
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  !canSubmit && styles.buttonDisabled,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleVerify}
                disabled={!canSubmit}
              >
                <Text style={styles.buttonText}>Verify code</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.secondaryButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() => signUp.verifications.sendEmailCode()}
              >
                <Text style={styles.secondaryButtonText}>Resend code</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.fieldLabel}>Email address</Text>
              <TextInput
                value={emailAddress}
                onChangeText={setEmailAddress}
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                placeholder="Enter your email"
                placeholderTextColor="#8a8a8f"
                style={styles.input}
              />
              {errors.fields.emailAddress && (
                <Text style={styles.errorText}>
                  {errors.fields.emailAddress.message}
                </Text>
              )}

              <Text style={styles.fieldLabel}>Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Choose a password"
                placeholderTextColor="#8a8a8f"
                style={styles.input}
              />
              {errors.fields.password && (
                <Text style={styles.errorText}>
                  {errors.fields.password.message}
                </Text>
              )}

              <Text style={styles.fieldLabel}>Confirm password</Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholder="Confirm your password"
                placeholderTextColor="#8a8a8f"
                style={styles.input}
              />
              {formError ? (
                <Text style={styles.errorText}>{formError}</Text>
              ) : null}

              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  !canSubmit && styles.buttonDisabled,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleSubmit}
                disabled={!canSubmit}
              >
                <Text style={styles.buttonText}>Create account</Text>
              </Pressable>
            </>
          )}

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Link href="/(auth)/sign-in" style={styles.linkText}>
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff9e3",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  brandArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
  },
  brandMark: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#ea7a53",
    alignItems: "center",
    justifyContent: "center",
  },
  brandMarkText: {
    color: "#ffffff",
    fontSize: 28,
    fontFamily: "sans-extrabold",
    letterSpacing: 1,
  },
  brandTitle: {
    fontSize: 32,
    fontFamily: "sans-extrabold",
    color: "#081126",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(8, 17, 38, 0.08)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 10,
  },
  sectionTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: "sans-bold",
    color: "#081126",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: "#515a6d",
    fontFamily: "sans-regular",
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 13,
    lineHeight: 18,
    color: "#081126",
    fontFamily: "sans-semibold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fbf7ef",
    borderWidth: 1,
    borderColor: "rgba(8, 17, 38, 0.12)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: "sans-regular",
    color: "#081126",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#ea7a53",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "sans-semibold",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  secondaryButton: {
    marginTop: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#081126",
    fontSize: 15,
    fontFamily: "sans-semibold",
  },
  footerRow: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  footerText: {
    color: "#747a8f",
    fontSize: 14,
    fontFamily: "sans-regular",
  },
  linkText: {
    color: "#ea7a53",
    fontSize: 14,
    fontFamily: "sans-semibold",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "sans-regular",
    marginBottom: 12,
  },
  centered: {
    flex: 1,
    backgroundColor: "#fff9e3",
    justifyContent: "center",
    alignItems: "center",
  },
});
