import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function FloatingScanButton({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => navigation.navigate("Scanner")}
    >
      <MaterialCommunityIcons name="barcode-scan" size={36} color="#111" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    position: "absolute",
    bottom: 16,
    right: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
