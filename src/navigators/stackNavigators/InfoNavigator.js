import React from "react";
import InfoScreen from "../../screens/Info";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default class MapNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Info"
          component={InfoScreen}
        />
      </Stack.Navigator>
    );
  }
}
