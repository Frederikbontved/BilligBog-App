import * as React from "react";

// Import navigation dependencies
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import Screens
import { Scanner } from "./screens/Scanner";
import { Booklist } from "./screens/Booklist";
import AddBook from "./screens/AddBook";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Booklist">
        <Stack.Screen
          name="Booklist"
          component={Booklist}
          options={{ title: "Alle bøger" }}
        />
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{ title: "Scan bog" }}
        />
        <Stack.Screen
          name="AddBook"
          component={AddBook}
          options={{ title: "Tilføj bog" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
