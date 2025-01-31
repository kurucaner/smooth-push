// External imports
import { memo, useCallback, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
// Internal imports
import { DURATION, INITIAL_POSITION, SWIPE_THRESHOLD } from "./consts";
import { styles } from "./styles";
import { NotificationConfig, SmoothPushNotification, SmoothPushType } from "./types";
import { SmoothPush } from "./smooth-push";

let showNotification: (params: SmoothPushNotification) => void;
let timeoutId: ReturnType<typeof setTimeout> | null = null;

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
    stickColor = "#ffcad4",
    onPress,
    onClose
  } = currentConfig;

  const translateY = useSharedValue(INITIAL_POSITION);
  const isDragging = useSharedValue(false);
  const isFinished = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }));

  const gestureHandler = Gesture.Pan()
    .onStart(event => {
      isDragging.value = true;
      event.translationY = translateY.value;
    })
    .onUpdate(event => {
      if (event.translationY > 0) {
        translateY.value = event.translationY / 15;
      } else {
        translateY.value = event.translationY;
      }
    })
    .onEnd(event => {
      isDragging.value = false;
      if (event.translationY < swipeThreshold) {
        translateY.value = withTiming(INITIAL_POSITION, { duration: DURATION });
      } else {
        translateY.value = withSpring(0);
      }
      if (isFinished.value) {
        translateY.value = withTiming(INITIAL_POSITION, { duration: DURATION });
      }
    });

  const handleClose = useCallback(() => {
    translateY.value = withTiming(INITIAL_POSITION, { duration: DURATION });
    onClose?.();
  }, [onClose]);

  const handleOnPress = useCallback(() => {
    onPress?.();
    handleClose();
  }, [onPress, handleClose]);

  showNotification = (params: SmoothPushNotification) => {
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

  const stickStyle = useMemo(() => [styles.stick, { backgroundColor: stickColor }], [stickColor]);

  return (
    <GestureDetector gesture={gestureHandler}>
      <Animated.View style={containerStyle}>
        <Animated.View style={styles.blurContainer}>
          <Pressable onPress={handleOnPress} style={styles.notification}>
            <SmoothPush type={toastType} message={data} textStyle={currentConfig.textStyle} />
          </Pressable>
        </Animated.View>
        <View style={stickStyle} />
      </Animated.View>
    </GestureDetector>
  );
});

SmoothPushProvider.displayName = "SmoothPushProvider";

export const show = (params: SmoothPushNotification) => {
  if (showNotification) {
    showNotification(params);
  }
};
