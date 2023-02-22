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
      <View style={styles.layerTop} />
      <View style={styles.layerCenter}>
        <View style={styles.layerLeft} />
        <View style={styles.focused} />
        <View style={styles.layerRight} />
      </View>
      <View style={styles.layerBottom}>
        <Text style={styles.helperText}>
          Placer bogens stregkode indenfor feltet.
        </Text>
      </View>
      <BookPopup
        visible={scanned}
        isbn={isbn}
        closePopup={closePopup}
        navigation={navigation}
      />
    </View>
  );
}

const opacity = "rgba(0, 0, 0, .7)";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 1,
    flexDirection: "row",
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity,
    alignItems: "center",
    justifyContent: "center",
  },
  helperText: {
    color: "white",
    fontSize: 16,
  },
});
