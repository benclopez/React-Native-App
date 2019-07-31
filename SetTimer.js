
/*This is an Example of Timer/Stopwatch in React Native */
import React, { Component } from 'react';
//import React in our project
import { StyleSheet, Text, View, TouchableHighlight, Alert, Picker, Button } from 'react-native';
//import all the required components
import { Timer } from 'react-native-stopwatch-timer';
//importing library to use Stopwatch and Timer

var count = 0;
var workoutRestTime = 0;
var avgRest = 0;
var reset = false;

export default class TestApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTimerStart: false,
      isStopwatchStart: false,
      timerDuration: 15000,
      resetTimer: false,
      resetStopwatch: false,
    };
    this.startStopTimer = this.startStopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.startStopStopWatch = this.startStopStopWatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    this.logWorkout = this.logWorkout.bind(this);
  }


  logWorkout() {

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    //Have a try and catch block for catching errors.
    try {
      //Assign the promise unresolved first then get the data using the json method. 
      fetch('http://localhost/api/workout/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Workout: ' + date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
          time: avgRest,
        }),
      });
    } catch (err) {
      console.log("Error fetching data-----------", err);
    }
  }

  updateAvgRest() {
    if (count > 0) {
      avgRest = (workoutRestTime / 1000) / count;
    }
    else {
      avgRest = 0;
    }
  }

  startStopTimer() {
    if (this.state.isTimerStart == true) {
      this.setState({ isTimerStart: !this.state.isTimerStart, resetTimer: false });

      Alert.alert(
        'Done with Rest?',
        '',
        [
          {
            text: 'Yes, next set!', onPress: () => {
              count++;
              workoutRestTime += this.state.timerDuration;
              this.updateAvgRest();
              this.setState({ isTimerStart: false, resetTimer: true });
            }
          },
          {
            text: "Still Resting",
            onPress: () => {
              this.setState({ isTimerStart: !this.state.isTimerStart, resetTimer: false });
            },
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    }
    else {
      this.setState({ isTimerStart: !this.state.isTimerStart, resetTimer: false });
    }

  }
  resetTimer() {
    Alert.alert(
      'Are you sure you want to reset your workout?',
      '',
      [
        {
          text: 'Reset', onPress: () => {
            count = 0;
            avgRest = 0;
            workoutRestTime = 0;
            this.setState({ isTimerStart: false, resetTimer: true });
          }
        },
        {
          text: "Cancel",
          onPress: () => {
            this.setState({ isTimerStart: false, resetTimer: true });
          },
          style: 'cancel',
        },
        {
          text: 'Log Workout', onPress: () => {
            this.logWorkout();
            count = 0;
            avgRest = 0;
            workoutRestTime = 0;
            this.setState({ isTimerStart: false, resetTimer: true });
          }
        },
      ],
      { cancelable: false },
    );
  }
  startStopStopWatch() {
    this.setState({ isStopwatchStart: !this.state.isStopwatchStart, resetStopwatch: false });
  }
  resetStopwatch() {
    this.setState({ isStopwatchStart: false, resetStopwatch: true });
  }
  getFormattedTime(time) {
    this.currentTime = time;
  }
  updateTime = (newDuration) => {
    this.setState({ timerDuration: newDuration })
    this.setState({ isTimerStart: false, resetTimer: true });
    console.log(newDuration)
  }

  handleTimerComplete = () => {
    reset = false;

    Alert.alert(
      'Rest Time is up!',
      'Ready to start the next set?',
      [
        {
          text: 'Next Set', onPress: () => {
            count++;
            workoutRestTime += this.state.timerDuration;
            this.updateAvgRest();
            this.setState({ isTimerStart: false, resetTimer: true });
          }
        },
        {
          text: '15 more seconds!', onPress: () => {
            this.state.timerDuration = 16000;
            workoutRestTime = workoutRestTime + 16000;
            this.updateAvgRest();
            this.setState({ isTimerStart: false, resetTimer: true });
            this.setState({ isTimerStart: !this.state.isTimerStart, resetTimer: false });
            this.state.timerDuration = 1000;
          },
        },
        {
          text: "I'm Done!",
          onPress: () => {
            count++;
            workoutRestTime += this.state.timerDuration;
            this.updateAvgRest();
            this.logWorkout();
            this.setState({ isTimerStart: !this.state.isTimerStart, resetTimer: false });
          },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00bfff' }}>
        <View style={{ flex: 1, marginTop: 40, alignItems: 'center', justifyContent: 'center' }}>

          <Timer
            totalDuration={this.state.timerDuration} secs
            //Time Duration
            start={this.state.isTimerStart}
            //To start
            reset={this.state.resetTimer}
            //To reset
            options={options}
            //options for the styling
            handleFinish={this.handleTimerComplete}
            //can call a function On finish of the time 
            getTime={this.getFormattedTime} />

          <TouchableHighlight onPress={this.startStopTimer} style={styles.circle}>
            <Text style={{ fontSize: 30, marginTop: 18, alignItems: 'center' }}>
              {!this.state.isTimerStart ? "REST" : "STOP"}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.resetTimer} style={styles.reset}>
            <Text style={{ fontSize: 20, marginTop: 20 }}>RESET</Text>
          </TouchableHighlight>
          <Text style={{ fontSize: 20, marginTop: 10 }}>
            Rest Interval:
            </Text>
          <Picker selectedValue={this.state.timerDuration} onValueChange={this.updateTime}
            style={{ height: 50, width: 100 }}>
            <Picker.Item label=":15" value={15000} />
            <Picker.Item label=":30" value={30000} />
            <Picker.Item label=":45" value={45000} />
            <Picker.Item label="1:00" value={60000} />
          </Picker>
        </View>
        <View style={{ flex: 1, marginTop: 40, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, marginTop: 0 }}>
            Average Rest Per Set: {avgRest} Seconds
            </Text>
          <Text style={{ fontSize: 20, marginTop: 0 }}>
            Total Rest For Workout: {workoutRestTime / 1000} Seconds
          </Text>
          <Text style={{ fontSize: 20 }}>
            Sets Completed: {count}
          </Text>
          <Button
            title="Go to Workout History"
            onPress={() => this.props.navigation.navigate('WorkoutList')}
          />
        </View>

      </View>

    );
  }
}


const options = {
  container: {
    padding: 5,
    borderRadius: 5,
    width: 300,
    alignItems: 'center',
  },
  text: {
    fontSize: 60,
    color: '#FFF',
    marginLeft: 7,
  }
};

const styles = StyleSheet.create({
  circle: {
    marginTop: 10,
    borderRadius: 40,
    width: 85,
    height: 85,
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  reset: {
    marginTop: 10,
    borderRadius: 40,
    width: 70,
    height: 70,
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: 'white',
    alignItems: 'center',
  }
});
