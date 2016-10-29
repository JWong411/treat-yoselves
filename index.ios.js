/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import MapView from 'react-native-maps';
var polyDecode = require('polyline');

export default class AwesomeProject extends Component {
  constructor(){
    super();
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers: [

      ],
      showRoute: false,
      coords: []
    }
    this.onRegionChange = this.onRegionChange.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.createURL = this.createURL.bind(this);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  handlePress(info) {
    // console.log(info.nativeEvent.coordinate);
    var lat = info.nativeEvent.coordinate.latitude
    var lng = info.nativeEvent.coordinate.longitude
    this.setState({markers:[...this.state.markers, {latlng: {latitude: lat, longitude: lng}, title: "added some shit", description: "ye ye ye"}]  })
  }


  buttonClicked() {
    console.log("this worked");
    var url = this.createURL();
    var url2 = "https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyBF4ErRr95eWjXbhMKD5ot1kmmetfa2Umk"
    var url3 = "https://facebook.github.io/react-native/movies.json"
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        var stepsAry = []
        responseJson.routes[0].legs.forEach(leg => {
          leg.steps.forEach(step => stepsAry.push(step))
        })
        // console.log(stepsAry);
        var polylines = stepsAry.map(step => step.polyline.points)
        console.log(polylines);
        coordinates = []
        polylines.forEach(poly => {
          polyDecode.decode(poly).forEach(coords => coordinates.push({latitude: coords[0], longitude: coords[1]}))
        })
        this.setState({showRoute: true, coords: coordinates})
      })
      .catch((error) => {
        console.error(error);
      })
  }

  createURL() {
    var origin = this.state.markers[0].latlng.latitude + "," + this.state.markers[0].latlng.longitude
    var destination = this.state.markers[this.state.markers.length-1].latlng.latitude + "," +  this.state.markers[this.state.markers.length-1].latlng.longitude
    var waypointsAry = []
    this.state.markers.forEach((marker, index) => {
      if (!(index === 0 || index === this.state.markers.length-1)) {
        waypointsAry.push(marker.latlng.latitude + "," + marker.latlng.longitude)
      }
    })
    var waypoints = waypointsAry.join('|')

    var url = ["https://maps.googleapis.com/maps/api/directions/json?origin=", origin, "&destination=", destination, "&waypoints=", waypoints, "&key=AIzaSyBF4ErRr95eWjXbhMKD5ot1kmmetfa2Umk"].join('');
    // "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination" + destination + "&waypoints" + waypoints + "&key=AIzaSyBF4ErRr95eWjXbhMKD5ot1kmmetfa2Umk"
    return url;
  }

  render() {
    if (this.state.showRoute) {
      var polyCoords = this.state.coords
    } else {
      var polyCoords = [{latitude: 37.78825,longitude: -122.4324}, {latitude: 37.78826,longitude: -122.4325}]
    }
    console.log(this.state.showRoute);
    return (
        <View style={styles.container}>
              <MapView
                style={ styles.map }
                region={this.state.region}
                onRegionChange={this.onRegionChange}
                onPress={this.handlePress}
              >
                {this.state.markers.map((marker, index) => (
                  <MapView.Marker
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                    key={index}
                  />
                ))}
                <MapView.Polyline coordinates={polyCoords}/>
              </MapView>
              <View
                style = {styles.button}>
                <TouchableHighlight
                  onPress = {this.buttonClicked}>
                    <Text>Get Routes</Text>
                </TouchableHighlight>
              </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 20,
  },
  button: {
    position: 'absolute',
    bottom: 0,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
