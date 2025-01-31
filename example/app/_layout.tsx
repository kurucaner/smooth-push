import "react-native-reanimated";
import { Button, StyleSheet, View } from "react-native";
import { show, SmoothPushProvider } from "smooth-push";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <View style={styles.container}>
        <SmoothPushProvider />
        <Button
          title="Show Success"
          onPress={() => {
            show({
              toastType: "success",
              message: "Hello, World!",
              config: {
                stickColor: "red"
              }
            });
          }}
        />
        <Button
          title="Show Error"
          onPress={() => {
            show({
              toastType: "error",
              message: "Hello, World!"
            });
          }}
        />
        <Button
          title="Show None"
          onPress={() => {
            show({
              toastType: "none",
              message: "Hello, World!"
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
