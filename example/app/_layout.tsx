import "react-native-reanimated";
import { Button, View } from "react-native";
import { show, SmoothToastProvider } from "@/components/notification-manager";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
