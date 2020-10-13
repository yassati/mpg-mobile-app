import React, { Component } from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import WrapperNavigator from "./navigators/WrapperNavigator";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#58D757",
    accent: "#58D757"
  }
};
export default class App extends Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <WrapperNavigator />
      </PaperProvider>
    );
  }
}
