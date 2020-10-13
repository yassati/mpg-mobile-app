import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeNavigator from "./stackNavigators/HomeNavigator";
import InfoNavigator from "./stackNavigators/InfoNavigator";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createMaterialBottomTabNavigator();

export default class FooterNavigator extends React.Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        shifting={true}
        sceneAnimationEnabled={true}
        barStyle={{ backgroundColor: "white" }}
      >
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: () => <Icon name="home" color={"#58D757"} size={20} />
          }}
        />
        <Tab.Screen
          name="Info"
          component={InfoNavigator}
          options={{
            tabBarLabel: "Info",
            tabBarIcon: () => (
              <Icon name="info-circle" color={"#58D757"} size={20} />
            )
          }}
        />
      </Tab.Navigator>
    );
  }
}
