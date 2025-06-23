import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 52,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 12,
    fontSize: 16,
    color: "#000",
  },
  group: {
    width: "100%",
    height: 56,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden"
  },
  icon: {
    height: 56,
    width: 56,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRightWidth: 3,
    borderRightColor: "#f4f5f6",
  },
  control: {
    flex: 1,
    paddingLeft: 16,
    fontSize: 16,
  },
})