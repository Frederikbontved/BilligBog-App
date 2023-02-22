import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ListItem({ isbn, title, authors, deleteBook }) {
  return (
    <View style={styles.container}>
      <View style={styles.coverImageContainer}>
        <Image
          style={styles.coverImage}
          source={{
            uri: "http://134.122.92.30/images/" + isbn + ".jpeg",
          }}
        />
      </View>
      <View style={styles.meta}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.authors}>{authors}</Text>
      </View>
      <View style={styles.deleteButton}>
        <MaterialCommunityIcons
          name="delete-outline"
          size={28}
          color="#3a3a3a"
          onPress={() => deleteBook(isbn)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  coverImageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  coverImage: {
    width: 78,
    height: 110,
  },
  meta: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    color: "#3a3a3a",
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 4,
  },
  authors: {
    color: "#6a6a6a",
    fontWeight: "300",
    fontSize: 16,
  },
  deleteButton: {
    height: "50%",
    borderLeftWidth: 1,
    borderLeftColor: "#ccc",
    paddingLeft: 16,
    justifyContent: "center",
    alignSelf: "center",
  },
});
