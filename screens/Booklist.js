import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const Item = ({ isbn, title, authors }) => (
  <View style={styles.item}>
    <Image
      style={styles.coverImg}
      source={{
        uri: "http://192.168.8.108:3333/images/" + isbn + ".jpeg",
      }}
    />
    <View style={styles.bookInfo}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.authors}>{authors}</Text>
    </View>
  </View>
);

export function Booklist({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const url = "http://192.168.8.108:3333/books/";

  // Get all books in DB.
  const getBooks = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ isbn }) => isbn}
          renderItem={({ item }) => (
            <Item isbn={item.isbn} title={item.title} authors={item.authors} />
          )}
        />
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("Scanner")}
      >
        <Text style={styles.floatingButtonText}>Add book</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flex: 1,
    flexDirection: "row",
  },
  bookInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
  },
  coverImg: {
    width: 78,
    height: 110,
  },
  floatingButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ee6e73",
    position: "absolute",
    bottom: 10,
    right: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonText: {
    fontWeight: "bold",
    color: "white",
  },
});
