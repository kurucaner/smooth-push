// External imports
import { memo, useEffect } from "react";
import { Text, View, type TextStyle } from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from "react-native-reanimated";
// Internal imports
import { styles } from "./styles";
import { SmoothPushType } from "./types";

interface SmoothPushProps {
  type?: SmoothPushType | null;
  message?: string | null;
  textStyle?: TextStyle | null;
}

export const SmoothPush = memo(({ type, message, textStyle }: SmoothPushProps) => {
  const scale = useSharedValue(0);
  const progress = useSharedValue(0);
  const messageOpacity = useSharedValue(0);

  useEffect(() => {
    scale.value = 0;
    progress.value = 0;
    messageOpacity.value = 0;

    scale.value = withTiming(1, {
      duration: 400,
      easing: Easing.bezier(0.34, 1.56, 0.64, 1)
    });

    progress.value = withDelay(
      100,
      withTiming(1, {
        duration: 500,
        easing: Easing.bezier(0.65, 0, 0.35, 1)
      })
    );

    messageOpacity.value = withDelay(
      200,
      withTiming(1, {
        duration: 300,
        easing: Easing.bezier(0.4, 0, 0.2, 1)
      })
    );
  }, [type, message]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: type === "success" ? "#E7F6E7" : "#FEE7E7"
  }));

  const iconStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      {
        scale: interpolate(progress.value, [0, 0.6, 1], [0.6, 1.1, 1], Extrapolation.CLAMP)
      }
    ]
  }));

  const messageStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
    transform: [
      {
        translateX: interpolate(messageOpacity.value, [0, 1], [-10, 0])
      }
    ]
  }));

  const getIcon = () => {
    if (type === "success") {
      return <Text style={[styles.icon, styles.successIcon]}>✓</Text>;
    }
    if (type === "error") {
      return <Text style={[styles.icon, styles.errorIcon]}>✕</Text>;
    }
    return null;
  };

  if (!message) {
    return null;
  }

  return (
    <View style={styles.smoothPushContainer}>
      <Animated.View style={[styles.iconContainer, containerStyle]}>
        <Animated.View style={iconStyle}>{getIcon()}</Animated.View>
      </Animated.View>
      <Animated.View style={[styles.messageContainer, messageStyle]}>
        <Text style={[styles.toastMessage, textStyle]} numberOfLines={3}>
          {message}
        </Text>
      </Animated.View>
    </View>
  );
});

SmoothPush.displayName = "SmoothPush";
