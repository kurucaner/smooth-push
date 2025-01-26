"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  SmoothPushProvider: () => SmoothPushProvider,
  show: () => show
});
module.exports = __toCommonJS(index_exports);

// src/notification-manager.tsx
var import_react = require("react");
var import_react_native = require("react-native");
var import_react_native_gesture_handler = require("react-native-gesture-handler");
var import_react_native_reanimated = __toESM(require("react-native-reanimated"));
var import_jsx_runtime = require("react/jsx-runtime");
var showNotification;
var timeoutId = null;
var INITIAL_POSITION = -180;
var SWIPE_THRESHOLD = -55;
var DURATION = 400;
var SmoothPush = (0, import_react.memo)(({ type, message, textStyle }) => {
  const scale = (0, import_react_native_reanimated.useSharedValue)(0);
  const progress = (0, import_react_native_reanimated.useSharedValue)(0);
  const messageOpacity = (0, import_react_native_reanimated.useSharedValue)(0);
  (0, import_react.useEffect)(() => {
    scale.value = 0;
    progress.value = 0;
    messageOpacity.value = 0;
    scale.value = (0, import_react_native_reanimated.withTiming)(1, {
      duration: 400,
      easing: import_react_native_reanimated.Easing.bezier(0.34, 1.56, 0.64, 1)
      // Custom bounce effect
    });
    progress.value = (0, import_react_native_reanimated.withDelay)(
      100,
      (0, import_react_native_reanimated.withTiming)(1, {
        duration: 500,
        easing: import_react_native_reanimated.Easing.bezier(0.65, 0, 0.35, 1)
      })
    );
    messageOpacity.value = (0, import_react_native_reanimated.withDelay)(
      200,
      (0, import_react_native_reanimated.withTiming)(1, {
        duration: 300,
        easing: import_react_native_reanimated.Easing.bezier(0.4, 0, 0.2, 1)
      })
    );
  }, [type, message]);
  const containerStyle = (0, import_react_native_reanimated.useAnimatedStyle)(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: type === "success" ? "#E7F6E7" : "#FEE7E7"
  }));
  const iconStyle = (0, import_react_native_reanimated.useAnimatedStyle)(() => ({
    opacity: progress.value,
    transform: [
      {
        scale: (0, import_react_native_reanimated.interpolate)(progress.value, [0, 0.6, 1], [0.6, 1.1, 1], import_react_native_reanimated.Extrapolation.CLAMP)
      }
    ]
  }));
  const messageStyle = (0, import_react_native_reanimated.useAnimatedStyle)(() => ({
    opacity: messageOpacity.value,
    transform: [
      {
        translateX: (0, import_react_native_reanimated.interpolate)(messageOpacity.value, [0, 1], [-10, 0])
      }
    ]
  }));
  const getIcon = (0, import_react.useMemo)(() => {
    if (type === "success") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: [styles.icon, styles.successIcon], children: "\u2713" });
    }
    if (type === "error") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: [styles.icon, styles.errorIcon], children: "\u2715" });
    }
    return null;
  }, [type]);
  if (!message) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: styles.smoothPushContainer, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native_reanimated.default.View, { style: [styles.iconContainer, containerStyle], children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native_reanimated.default.View, { style: iconStyle, children: getIcon }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native_reanimated.default.View, { style: [styles.messageContainer, messageStyle], children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: [styles.toastMessage, textStyle], numberOfLines: 3, children: message }) })
  ] });
});
SmoothPush.displayName = "SmoothPush";
var SmoothPushProvider = (0, import_react.memo)(({ defaultConfig }) => {
  const [data, setData] = (0, import_react.useState)(null);
  const [toastType, setToastType] = (0, import_react.useState)(null);
  const [currentConfig, setCurrentConfig] = (0, import_react.useState)(defaultConfig != null ? defaultConfig : {});
  const {
    duration = 6e3,
    position = "top",
    offset = 60,
    maxWidth = 400,
    blurIntensity = 50,
    swipeThreshold = SWIPE_THRESHOLD,
    onPress,
    onClose
  } = currentConfig;
  const translateY = (0, import_react_native_reanimated.useSharedValue)(INITIAL_POSITION);
  const isDragging = (0, import_react_native_reanimated.useSharedValue)(false);
  const isFinished = (0, import_react_native_reanimated.useSharedValue)(false);
  const animatedStyle = (0, import_react_native_reanimated.useAnimatedStyle)(() => {
    return {
      transform: [{ translateY: translateY.value }]
    };
  });
  const gestureHandler = import_react_native_gesture_handler.Gesture.Pan().onStart((event) => {
    "worklet";
    isDragging.value = true;
    event.translationY = translateY.value;
  }).onUpdate((event) => {
    "worklet";
    if (event.translationY > 0) {
      translateY.value = event.translationY / 15;
    } else {
      translateY.value = event.translationY;
    }
  }).onEnd((event) => {
    "worklet";
    isDragging.value = false;
    if (event.translationY < swipeThreshold) {
      translateY.value = (0, import_react_native_reanimated.withTiming)(INITIAL_POSITION, {
        duration: DURATION
      });
    } else {
      translateY.value = (0, import_react_native_reanimated.withSpring)(0);
    }
    if (isFinished.value) {
      translateY.value = (0, import_react_native_reanimated.withTiming)(INITIAL_POSITION, {
        duration: DURATION
      });
    }
  });
  const handleClose = () => {
    translateY.value = (0, import_react_native_reanimated.withTiming)(INITIAL_POSITION, { duration: DURATION });
    onClose == null ? void 0 : onClose();
  };
  showNotification = (params) => {
    isFinished.value = false;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setToastType(params.toastType);
    setData(params.message);
    setCurrentConfig(__spreadValues(__spreadValues({}, defaultConfig), params.config));
    translateY.value = (0, import_react_native_reanimated.withTiming)(0, { duration: DURATION });
    timeoutId = setTimeout(() => {
      if (!isDragging.value) {
        handleClose();
      }
      isFinished.value = true;
    }, duration);
  };
  const handleOnPress = () => {
    onPress == null ? void 0 : onPress();
    handleClose();
  };
  const containerStyle = (0, import_react.useMemo)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native_gesture_handler.GestureDetector, { gesture: gestureHandler, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native_reanimated.default.View, { style: containerStyle, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native_reanimated.default.View, { style: styles.blurContainer, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Pressable, { onPress: handleOnPress, style: styles.notification, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmoothPush, { type: toastType, message: data, textStyle: currentConfig.textStyle }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.View, { style: styles.stick })
  ] }) });
});
SmoothPushProvider.displayName = "SmoothPushProvider";
var styles = import_react_native.StyleSheet.create({
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
var show = (params) => {
  if (showNotification) {
    showNotification(params);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmoothPushProvider,
  show
});
