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
import { TextInput, Button, Card } from "react-native-paper";
import * as RootNavigation from "../RootNavigation";
import positions from "../helpers/positions";
import Fuse from "fuse.js";

let fuse;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      isLoading: true,
      dataSource: []
    };
  }
  componentDidMount() {
    return fetch("https://api.monpetitgazon.com/stats/championship/1/2020")
      .then(response => response.json())
      .then(responseJson => {
        const final = responseJson.map(player => {
          return {
            ...player,
            position:
              positions[player.ultraPosition] &&
              positions[player.ultraPosition].position
          };
        });
        fuse = new Fuse(final, {
          keys: ["firstname", "lastname", "club", "position"],
          distance: 500,
          threshold: 0.2
        });

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
            <TextInput
              label="name or position"
              value={this.state.text}
              onChangeText={value => {
                if (value === "") {
                  this.setState({
                    text: value,
                    dataSource: fuse._docs
                  });
                } else {
                  let res = fuse.search(value);
                  this.setState({
                    text: value,
                    dataSource: res.map(obj => {
                      return obj.item;
                    })
                  });
                }
              }}
              style={{ margin: 20 }}
            />
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
                        <Text style={styles.owner_title}>
                          {item.club} ({positions[item.ultraPosition].position})
                        </Text>
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
