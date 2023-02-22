import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

export function BookInfo({ book, navigation }) {
  const title = book.title;
  const isbn = book.isbn;
  const coverImg = book.coverImg;

  let authors = "";
  book.authors.forEach((element) => {
    authors += element;
  });

  const addBook = async () => {
    try {
      fetch("http://134.122.92.30/books", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isbn: book.isbn,
          title: book.title,
          authors: book.authors,
          imageURI: book.coverImg,
        }),
      });
    } catch (err) {
      console.error(err);
    }

    navigation.navigate("Booklist", {
      params: {
        itemAdded: true,
      },
    });
  };

  return (
    <View>
      <Image
        style={styles.coverImg}
        source={{
          uri: coverImg,
        }}
      />
      <Text>Titel: {title}</Text>
      <Text>Forfattere: {authors}</Text>
      <Text>Isbn: {isbn}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => addBook()}>
        <Text style={styles.addButtonText}>Add book</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  coverImg: {
    width: 78,
    height: 110,
  },
  addButton: {
    backgroundColor: "green",
    padding: 20,
    borderRadius: 5,
  },
  addButtonText: {
    fontWeight: "bold",
    color: "white",
  },
});
