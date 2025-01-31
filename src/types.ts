import type { TextStyle, ViewStyle } from "react-native";

export type SmoothPushType = "success" | "error" | "none";

export interface NotificationConfig {
  duration?: number;
  position?: "top" | "bottom";
  offset?: number;
  maxWidth?: number;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
  onClose?: () => void;
  swipeThreshold?: number;
  stickColor?: string;
}

export interface SmoothPushNotification {
  toastType: SmoothPushType;
  message: string;
  config?: NotificationConfig;
}
