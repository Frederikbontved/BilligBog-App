import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import BookInfo from "../../components/BookInfo";

export default function AddBook({ route, navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [found, setFound] = useState(false);

  const isbn = route.params.isbn;

  const url = "http://134.122.92.30";

  const getBook = async () => {
    try {
      const response = await fetch(`${url}/scrape/${isbn}`);
      const json = await response.json();
      if (response.status === 200) {
        setData(json);
        setFound(true);
      } else {
        console.error(json.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (book) => {
    try {
      const response = await fetch(`${url}/books`, {
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

      if (response.status === 201) {
        navigation.navigate("Booklist", {
          params: {
            itemAdded: true,
          },
        });
      } else {
        const json = await response.json();
        console.error(json.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {found ? <BookInfo book={data} /> : <Text>Book not found.</Text>}
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Scanner")}
            >
              <Text style={styles.buttonText}>Scan igen</Text>
            </TouchableOpacity>
            {found && !data._id ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => addBook(data)}
              >
                <Text style={styles.buttonText}>Tilføj bog</Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ flex: 1, alignSelf: "center" }}>
                Bogen findes allerede i databasen.
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: "#555",
    padding: 16,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});
