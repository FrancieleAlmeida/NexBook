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
    backgroundColor: "#1f1f1f",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10, 
    marginVertical: 8,
  },
  icon: {
    height: 56,
    width: 56,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRightWidth: 2,
    borderRightColor: "#008400",
    backgroundColor: "#1f1f1f", 
  },
  control: {
    flex: 1,
    paddingLeft: 16,
    fontSize: 16,
    color: "#fff", 
    backgroundColor: "#1f1f1f", 
    borderRadius: 10,
    height: 52,
  },
})