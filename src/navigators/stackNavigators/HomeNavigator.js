import React from "react";
import HomeScreen from "../../screens/Home";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default class HomeNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    );
  }
}
