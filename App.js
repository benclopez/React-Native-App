import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import SetTimer from './SetTimer';
import WorkoutListScreen from './components/WorkoutListScreen';

export default class App extends React.Component {
  render() {
    return (
      //<SetTimer></SetTimer>
      <AppContainer />
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: SetTimer
  },
  WorkoutList: {
    screen: WorkoutListScreen
  }
},{
  initialRouteName: "Home"
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00bfff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  red: {
    color: 'red'
  }
});
