import * as React from "react";

// Import navigation dependencies
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import Screens
import { Scanner } from "./screens/Scanner";
import { Booklist } from "./screens/Booklist";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Booklist">
        <Stack.Screen name="Booklist" component={Booklist} />
        <Stack.Screen name="Scanner" component={Scanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}