import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    backgroundColor: "rgb(255, 255, 255)",
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
