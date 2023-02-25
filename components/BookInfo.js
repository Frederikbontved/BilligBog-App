import { Text, View, StyleSheet, Image } from "react-native";

export default function BookInfo({ book }) {
  const title = book.title;
  const isbn = book.isbn;
  const coverImg = book.coverImg;
  let authors = "";
  book.authors.forEach((element) => {
    authors += element;
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.coverImg}
          source={{
            uri: coverImg,
          }}
        />
      </View>
      <View style={styles.meta}>
        <Text>
          <Text style={styles.bold}>Titel:</Text> {title}
        </Text>
        <Text>
          <Text style={styles.bold}>Forfattere:</Text> {authors}
        </Text>
        <Text>
          <Text style={styles.bold}>ISBN:</Text> {isbn}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  coverImg: {
    width: 104,
    aspectRatio: 0.71,
    backgroundColor: "#ccc",
  },
  meta: {},
  bold: {
    fontWeight: "bold",
  },
});
