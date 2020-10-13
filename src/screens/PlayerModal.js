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
import positions from "../helpers/positions";

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
        message: `Mon joueur préféré est ${this.props &&
          this.props.route &&
          this.props.route.params &&
          this.props.route.params.name} (${this.props &&
          this.props.route &&
          this.props.route.params &&
          this.props.route.params.club})`
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
    const data = this.state.dataSource;
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView>
          <View>
            <View key={data.id}>
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
                  {data.firstname} {data.lastname}
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
                    style={styles.avatar}
                    resizeMode="contain"
                    source={{
                      uri:
                        "https://pbs.twimg.com/profile_images/1311585974460321792/etZwevH__400x400.jpg"
                    }}
                  />
                </View>
                <View style={{ margin: 20, alignItems: "center" }}>
                  <Text style={styles.infos}>Club : {data.club}</Text>
                  <Text style={styles.infos}>
                    Position : {positions[data.ultraPosition].position}
                  </Text>
                  <Text style={styles.infos}>
                    Note moyenne : {data.stats.avgRate}
                  </Text>
                  <Text style={styles.infos}>
                    Buts (pén.) : {data.stats.sumGoals}(
                    {data.stats.sumPenalties})
                  </Text>
                  <Text style={styles.infos}>
                    Passes dé. : {data.stats.sumGoalAssist}
                  </Text>
                  <Text style={styles.infos}>
                    Cartons :{" "}
                    <Text style={{ backgroundColor: "red", color: "white" }}>
                      {data.stats.sumRedCard}
                    </Text>{" "}
                    <Text style={{ backgroundColor: "orange", color: "white" }}>
                      {data.stats.sumYellowCard}
                    </Text>
                  </Text>

                  <Text style={styles.infos}>Cote : {data.quotation}</Text>
                  <Text style={styles.infos}>Twitter : {data.twitter}</Text>
                  <TouchableOpacity
                    onPress={this.onShare}
                    style={{
                      backgroundColor: "#58D757",
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
                      Partagez mon lecteur préféré
                    </Text>
                  </TouchableOpacity>
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
  },
  flex: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    borderRadius: 10,
    width: 100,
    height: 100
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
    backgroundColor: "#58D757",
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
