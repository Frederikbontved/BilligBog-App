import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { BookInfo } from "./BookInfo";

export function BookPopup({ isbn, visible, closePopup, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [isFound, setFound] = useState(false);
  const [data, setData] = useState([]);

  const url = "http://134.122.92.30/scrape/";

  // Find a book from scraper
  const getBook = async () => {
    if (visible) {
      try {
        const response = await fetch(url + isbn);
        const json = await response.json();

        if (response.status === 200) {
          setData(json);
          setFound(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Scrape for a book when "visible" changes to true.
  useEffect(() => {
    getBook();
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setData([]);
        setFound(false);
        setLoading(true);
        closePopup();
      }}
    >
      <View style={styles.modalView}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.modalText}>
            {isFound ? (
              <BookInfo book={data} navigation={navigation} />
            ) : (
              "Book not found :("
            )}
          </Text>
        )}
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            setData([]);
            setFound(false);
            setLoading(true);
            closePopup();
          }}
        >
          <Text style={styles.textStyle}>Scan again</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
