import * as react from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { ViewStyle, TextStyle } from 'react-native';

type SmoothPushType = "success" | "error" | "none";
interface NotificationConfig {
    duration?: number;
    position?: "top" | "bottom";
    offset?: number;
    maxWidth?: number;
    blurIntensity?: number;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
    onPress?: () => void;
    onClose?: () => void;
    swipeThreshold?: number;
}
interface SmoothPushNotification {
    toastType: SmoothPushType;
    message: string;
    config?: NotificationConfig;
}
type ShowNotification = SmoothPushNotification;
interface SmoothPushProviderProps {
    defaultConfig?: NotificationConfig;
}
declare const SmoothPushProvider: react.MemoExoticComponent<({ defaultConfig }: SmoothPushProviderProps) => react_jsx_runtime.JSX.Element>;
declare const show: (params: ShowNotification) => void;

export { type NotificationConfig, type ShowNotification, type SmoothPushNotification, SmoothPushProvider, type SmoothPushType, show };
