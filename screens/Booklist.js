import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import ListItem from "../components/ListItem";
import FloatingScanButton from "../components/FloatingScanButton";

export function Booklist({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  // Get all books in DB.
  const getBooks = async () => {
    try {
      const url = "http://134.122.92.30/books/";

      const response = await fetch(url);
      let json = await response.json();
      json = json.reverse();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
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
      setIsLoading(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isLoading) {
      getBooks();
    }
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);
  }, [route.params]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" style={styles.activityIndicator} />
      ) : null}
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
        enableEmptySections={true}
        ListFooterComponent={<View style={{ height: 100 }} />}
        refreshControl={
          <RefreshControl isLoading={isLoading} onRefresh={getBooks} />
        }
      />
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
  activityIndicator: {
    margin: 16,
  },
});
