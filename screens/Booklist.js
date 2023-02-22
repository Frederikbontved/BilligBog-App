import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import ListItem from "../components/ListItem";
import FloatingScanButton from "../components/FloatingScanButton";

export function Booklist({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // Get all books in DB.
  const getBooks = async () => {
    if (isLoading) {
      try {
        const url = "http://134.122.92.30/books/";

        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Delete a book
  const deleteBook = async (isbn) => {
    try {
      const response = await fetch(`http://134.122.92.30/books/${isbn}`, {
        method: "DELETE",
      });
      const json = await response.json();
      console.log(json);
      setLoading(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBooks();
  }, [isLoading]);

  useEffect(() => {
    setLoading(true);
  }, [route.params]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ isbn }) => isbn}
          renderItem={({ item }) => (
            <ListItem
              isbn={item.isbn}
              title={item.title}
              authors={item.authors}
              deleteBook={deleteBook}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>
              Der er endnu ingen bøger i databasen. Tilføj én ved at trykke på
              knappen nederst til højre.
            </Text>
          }
        />
      )}
      <FloatingScanButton navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    fontSize: 20,
    margin: 16,
  },
});
