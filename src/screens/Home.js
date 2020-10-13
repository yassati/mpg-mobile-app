import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Share,
  TouchableOpacity,
  Vibration
} from "react-native";
import { Button, Card } from "react-native-paper";
import * as RootNavigation from "../RootNavigation";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: []
    };
  }
  componentDidMount() {
    return fetch("https://api.monpetitgazon.com/stats/championship/1/2020")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
          },
          () => {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView>
          <View style={styles.container}>
            {this.state.dataSource.map(item => {
              return (
                <Card key={item.id} style={styles.card}>
                  <View style={styles.flex}>
                    <Image
                      style={styles.avatar}
                      resizeMode="contain"
                      source={{
                        uri:
                          "https://pbs.twimg.com/profile_images/1311585974460321792/etZwevH__400x400.jpg"
                      }}
                    />
                    <View style={{ flex: 1 }}>
                      <View style={{ marginLeft: 20 }}>
                        <Text style={styles.owner_title}>
                          {item.lastname} {item.firstname}
                        </Text>
                        <Text style={styles.owner_title}>{item.club}</Text>
                        <TouchableOpacity
                          onPress={() => {
                            RootNavigation.navigate("TestModal", {
                              id: item.id,
                              name: `${item.firstname} ${item.lastname}`,
                              club: item.club
                            }),
                              Vibration.vibrate([0, 500, 100, 200]);
                          }}
                        >
                          <Text style={{ color: "gray" }}>
                            See more details...
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Card>
              );
            })}
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
  },
  flex: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: { width: 80, height: 120, borderRadius: 10 },
  owner_title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20
  },
  owner_infos: {
    textAlign: "justify"
  }
});
