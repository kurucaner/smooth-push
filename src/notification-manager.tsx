import { memo, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, View, Text, type TextStyle, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming
} from "react-native-reanimated";

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
}

export interface SmoothPushNotification {
  toastType: SmoothPushType;
  message: string;
  config?: NotificationConfig;
}

export type ShowNotification = SmoothPushNotification;

let showNotification: (params: ShowNotification) => void;
let timeoutId: ReturnType<typeof setTimeout> | null = null;

const INITIAL_POSITION = -180;
const SWIPE_THRESHOLD = -55;
const DURATION = 400;

interface SmoothPushContainerProps {
  type?: SmoothPushType | null;
  message?: string | null;
  textStyle?: TextStyle | null;
}
const SmoothPush = memo(({ type, message, textStyle }: SmoothPushContainerProps) => {
  const scale = useSharedValue(0);
  const progress = useSharedValue(0);
  const messageOpacity = useSharedValue(0);

  useEffect(() => {
    scale.value = 0;
    progress.value = 0;
    messageOpacity.value = 0;

    // Smoother initial animation
    scale.value = withTiming(1, {
      duration: 400,
      easing: Easing.bezier(0.34, 1.56, 0.64, 1) // Custom bounce effect
    });

    // Animate the checkmark/x with a nice draw effect
    progress.value = withDelay(
      100,
      withTiming(1, {
        duration: 500,
        easing: Easing.bezier(0.65, 0, 0.35, 1)
      })
    );

    // Fade in the message
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

  const getIcon = useMemo(() => {
    if (type === "success") {
      return <Text style={[styles.icon, styles.successIcon]}>✓</Text>;
    }
    if (type === "error") {
      return <Text style={[styles.icon, styles.errorIcon]}>✕</Text>;
    }
    return null;
  }, [type]);

  if (!message) {
    return null;
  }
  return (
    <View style={styles.smoothPushContainer}>
      <Animated.View style={[styles.iconContainer, containerStyle]}>
        <Animated.View style={iconStyle}>{getIcon}</Animated.View>
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

interface SmoothPushProviderProps {
  defaultConfig?: NotificationConfig;
}

export const SmoothPushProvider = memo(({ defaultConfig }: SmoothPushProviderProps) => {
  const [data, setData] = useState<string | null>(null);
  const [toastType, setToastType] = useState<SmoothPushType | null>(null);
  const [currentConfig, setCurrentConfig] = useState<NotificationConfig>(defaultConfig ?? {});

  const {
    duration = 6000,
    position = "top",
    offset = 60,
    maxWidth = 400,
    swipeThreshold = SWIPE_THRESHOLD,
    onPress,
    onClose
  } = currentConfig;

  const translateY = useSharedValue(INITIAL_POSITION);
  const isDragging = useSharedValue(false);
  const isFinished = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }]
    };
  });

  const gestureHandler = Gesture.Pan()
    .onStart(event => {
      "worklet";
      isDragging.value = true;
      event.translationY = translateY.value;
    })
    .onUpdate(event => {
      "worklet";
      if (event.translationY > 0) {
        translateY.value = event.translationY / 15;
      } else {
        translateY.value = event.translationY;
      }
    })
    .onEnd(event => {
      "worklet";
      isDragging.value = false;
      if (event.translationY < swipeThreshold) {
        translateY.value = withTiming(INITIAL_POSITION, {
          duration: DURATION
        });
      } else {
        translateY.value = withSpring(0);
      }
      if (isFinished.value) {
        translateY.value = withTiming(INITIAL_POSITION, {
          duration: DURATION
        });
      }
    });

  const handleClose = () => {
    translateY.value = withTiming(INITIAL_POSITION, { duration: DURATION });
    onClose?.();
  };

  showNotification = (params: ShowNotification) => {
    isFinished.value = false;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setToastType(params.toastType);
    setData(params.message);
    setCurrentConfig({ ...defaultConfig, ...params.config });

    translateY.value = withTiming(0, { duration: DURATION });

    timeoutId = setTimeout(() => {
      if (!isDragging.value) {
        handleClose();
      }
      isFinished.value = true;
    }, duration);
  };

  const handleOnPress = () => {
    onPress?.();
    handleClose();
  };

  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        [position]: offset,
        maxWidth
      },
      currentConfig.containerStyle,
      animatedStyle
    ],
    [position, offset, maxWidth, currentConfig.containerStyle, animatedStyle]
  );

  return (
    <GestureDetector gesture={gestureHandler}>
      <Animated.View style={containerStyle}>
        <Animated.View style={styles.blurContainer}>
          <Pressable onPress={handleOnPress} style={styles.notification}>
            <SmoothPush type={toastType} message={data} textStyle={currentConfig.textStyle} />
          </Pressable>
        </Animated.View>
        <View style={styles.stick} />
      </Animated.View>
    </GestureDetector>
  );
});

SmoothPushProvider.displayName = "SmoothPushProvider";

// Styles for the notification
const styles = StyleSheet.create({
  container: {
    width: "90%",
    maxWidth: 400,
    position: "absolute",
    top: 60,
    zIndex: 9999,
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f5f3f4"
  },
  blurContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  },
  notification: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  stick: {
    height: 4,
    width: 40,
    position: "absolute",
    bottom: 8,
    alignSelf: "center",
    borderRadius: 2,
    backgroundColor: "#ffcad4"
  },
  notificationText: {
    flex: 1,
    color: "#333333",
    fontSize: 16
  },
  smoothPushContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 6
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    fontSize: 16,
    fontWeight: "700"
  },
  successIcon: {
    color: "#2E7D32"
  },
  errorIcon: {
    color: "#D32F2F"
  },
  messageContainer: {
    flex: 1,
    paddingRight: 4
  },
  toastMessage: {
    fontSize: 14,
    lineHeight: 18,
    color: "#1a1a1a",
    fontWeight: "500"
  }
});

export const show = (params: ShowNotification) => {
  if (showNotification) {
    showNotification(params);
  }
};
