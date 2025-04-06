import "react-native-reanimated";
import { Button, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { show } from "@/components/org-smooth-push/notification-manager";
import { SmoothPushProvider } from "@/components/org-smooth-push";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <View
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          width: "100%",
          alignItems: "center"
        }}
      >
        <Text>Hello, World!</Text>
      </View>
      <View style={styles.container}>
        <SmoothPushProvider />
        <Button
          title="Show Success"
          onPress={() => {
            show({
              toastType: "success",
              message: "Hello, World!",
              config: {
                stickColor: "green"
              }
            });
          }}
        />
        <Button
          title="Show Error"
          onPress={() => {
            show({
              toastType: "error",
              message: "Hello, World!",
              config: {
                stickColor: "red"
              }
            });
          }}
        />
        <Button
          title="Show None"
          onPress={() => {
            show({
              toastType: "none",
              message: "Hello, World!",
              config: {
                stickColor: "blue"
              }
            });
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
