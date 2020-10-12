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
  Share
} from "react-native";
import * as RootNavigation from "../RootNavigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Button, Card } from "react-native-paper";

export default class TestModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: []
    };
  }
  componentDidMount() {
    const id =
      this.props &&
      this.props.route &&
      this.props.route.params &&
      this.props.route.params.id.replace("player_", "");
    console.log(id);
    // id = id.replace("player_", "");

    return fetch(`https://api.monpetitgazon.com/stats/player/${id}?season=2020`)
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

  onShare = async () => {
    try {
      await Share.share({
        message: `My player is ${this.props &&
          this.props.route &&
          this.props.route.params &&
          this.props.route.params.name}`
      });
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    console.log(this.state.dataSource);
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView>
          {/* <View>
            {this.state.dataSource.map(item => {
              return (
                <View key={item.char_id}>
                  <View style={styles.header}>
                    <Button
                      onPress={() => {
                        RootNavigation.pop();
                      }}
                    >
                      <Icon name="times" size={30} color="white" />
                    </Button>

                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 30
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <Card style={styles.card}>
                    <View
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 25
                      }}
                    >
                      <Image
                        style={[{ width: 200, height: 200 }, styles.avatar]}
                        resizeMode="contain"
                        source={{
                          uri: `${item.img}`
                        }}
                      />
                    </View>
                    <View style={{ margin: 20, alignItems: "center" }}>
                      <Text style={styles.infos}>
                        Nickname : {item.nickname}
                      </Text>
                      {item.birthday == "Unknown" ? null : (
                        <Text style={styles.infos}>
                          Birthday : {item.birthday}
                        </Text>
                      )}
                      <Text style={styles.infos}>
                        Portrayed : {item.portrayed}
                      </Text>
                      <Text style={styles.infos}>
                        Occupation : {item.occupation}
                      </Text>
                      {item.status == "?" ? null : (
                        <Text style={styles.infos}>Status : {item.status}</Text>
                      )}
                      <TouchableOpacity
                        onPress={this.onShare}
                        style={{
                          backgroundColor: "#f7b731",
                          padding: 12,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 20,
                          borderColor: "rgba(0, 0, 0, 0.1)",
                          fontWeight: "bold",
                          width: 220,
                          marginLeft: "auto",
                          marginTop: 20,
                          marginRight: "auto"
                        }}
                      >
                        <Text style={{ color: "white" }}>
                          Share my favorite character
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Card>
                </View>
              );
            })}
          </View> */}
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
  avatar: {
    borderRadius: 10
  },
  owner_title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30
  },
  infos: {
    marginTop: 10,
    color: "black",
    fontWeight: "bold",
    fontSize: 18
  },
  header: {
    backgroundColor: "#f7b731",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "rgba(0,0,0, .4)",
    shadowOffset: { height: 3, width: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4
  }
});
