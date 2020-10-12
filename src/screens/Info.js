import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Share,
  Linking
} from "react-native";
import { WebView } from "react-native-webview";
import * as RootNavigation from "../RootNavigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Button, Card } from "react-native-paper";

export default class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView>
          <View>
            <View>
              <Card style={styles.card}>
                <View
                  style={{ alignItems: "center", height: 550, marginTop: 20 }}
                >
                  <Text>MPG</Text>
                </View>
              </Card>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    margin: 20,
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    backgroundColor: "white"
  }
});
