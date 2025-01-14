import "react-native-reanimated";
import { Button, StyleSheet, View } from "react-native";
import { show, SmoothToastProvider } from "@/components";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <View style={styles.container}>
        <SmoothToastProvider />
        <Button
          title="Show Toast"
          onPress={() => {
            show({
              toastType: "success",
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
