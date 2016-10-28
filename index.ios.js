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
  View
} from 'react-native';
import MapView from 'react-native-maps';

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
        {
        latlng: {
          latitude: 37.78825,
          longitude: -122.4324
        },
        title: "Bullshit marker",
        description: "It's bullshit man."
        }
      ]
    }
    this.onRegionChange = this.onRegionChange.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  handlePress(info) {
    console.log(info.nativeEvent.coordinate);
    var lat = info.nativeEvent.coordinate.latitude
    var lng = info.nativeEvent.coordinate.longitude
    this.setState({markers:[...this.state.markers, {latlng: {latitude: lat, longitude: lng}, title: "added some shit", description: "ye ye ye"}]  })
  }



  render() {
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
              </MapView>

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
    bottom: 30,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
