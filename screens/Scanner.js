import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { BookPopup } from "../components/BookPopup";

export function Scanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);

  const [scanned, setScanned] = useState(false);
  const [isbn, setIsbn] = useState(null);

  const closePopup = () => {
    setScanned(false);
    setIsbn(null);
  };

  // Callback for when a barcode has been scanned.
  const handleBarCodeScanned = async ({ type, data }) => {
    setIsbn(data);
    setScanned(true);
  };

  // Check and ask for Camera permissions for barcode scanner
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <BookPopup
        visible={scanned}
        isbn={isbn}
        closePopup={closePopup}
        navigation={navigation}
      />
      {scanned && console.log("Scanned, with ISBN: " + isbn)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
