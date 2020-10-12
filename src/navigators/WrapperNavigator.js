import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import FooterNavigator from "./FooterNavigator";
import HomeNavigator from "./stackNavigators/HomeNavigator";
import InfoNavigator from "./stackNavigators/InfoNavigator";
// Import modals
import PlayerModal from "../screens/PlayerModal";

import { navigationRef } from "../RootNavigation";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

class NavigationDrawerContainerApp extends React.Component {
  render() {
    return (
      <Drawer.Navigator initialRouteName="Main" drawerPosition="right">
        <Drawer.Screen name="Main" component={FooterNavigator} />
        <Drawer.Screen name="Home" component={HomeNavigator} />
        <Drawer.Screen name="Info" component={InfoNavigator} />
      </Drawer.Navigator>
    );
  }
}

export default class WrapperNavigator extends React.Component {
  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator mode="modal" headerMode="none">
          <Stack.Screen name="Main" component={NavigationDrawerContainerApp} />
          <Stack.Screen name="TestModal" component={PlayerModal} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
