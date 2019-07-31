import React, { Component } from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class WorkoutListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: [],
    };
  }


  async componentDidMount() {
    //Have a try and catch block for catching errors.
    try {
      //Assign the promise unresolved first then get the data using the json method. 
      const apiRes = await fetch('http://localhost:5001/api/workout/');
      const workoutObj = await apiRes.json();
      console.log(workoutObj);
      this.setState({ workouts: workoutObj });
    } catch (err) {
      console.log("Error fetching data-----------", err);
    }
  }


  renderItem(data) {
    return <TouchableOpacity style={{ backgroundColor: 'transparent' }}>
      <View>
        <Text>{data.item.name}</Text>
        <Text>{data.item.time}</Text>
      </View>
    </TouchableOpacity>
  }

  renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'red',
        height: 0.5,
      }}
    />
  );

  render() {
    const workoutList = this.state.workouts;
    console.log(workoutList)

    return (
      <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Workout Average Rest Times:</Text>
        <FlatList
        fontSize= {50}
        width={100}
        ItemSeparatorComponent={this.renderSeparator}
          data={workoutList}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}></FlatList>
          <Button
          title="Go to About"
          onPress={() => this.props.navigation.navigate('Home')} />
      </View>
      
    )
  }
}
