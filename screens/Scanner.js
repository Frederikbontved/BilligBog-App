import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useFocusEffect } from "@react-navigation/native";

export function Scanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);

  // WHAT HAPPENS IF WE REMOVE THIS STATE COMPLETELY?
  const [scanned, setScanned] = useState(false);

  // Reset the "scanned" state when the screen goes into view again after having been out.
  useFocusEffect(
    useCallback(() => {
      setScanned(false);
    }, [])
  );

  // Callback for when a barcode has been scanned.
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    navigation.navigate("AddBook", {
      isbn: data,
    });
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
          Placér bogens stregkode inden for feltet.
        </Text>
      </View>
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
