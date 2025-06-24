import { View, StyleSheet, ActivityIndicator } from 'react-native';


export default function Index() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color={"#254"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  }
})


