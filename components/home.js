import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class Login extends Component {
  
  constructor() {
    super();
  }

  render() { 
    return (
      <View style={styles.container}>
        <View style={styles.topFiller}/>
        <View style={styles.content}>
        </View>
        <View style={styles.content}>
          <Text style={styles.label} onPress={() => this.props.navigation.navigate('Login')}>
            LOGIN
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label} onPress={() => this.props.navigation.navigate('Signup')}>
            SIGN UP
          </Text>
        </View>
        <View style={styles.bottomFiller}/>                
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: '#3740FE'
  },
  topFiller: {
    backgroundColor: '#3740FE',
    height: 3*(deviceHeight/7),
  },
  bottomFiller: {
    backgroundColor: '#3740FE',
    height: 2.5*(deviceHeight/7),
  },
  content: {
    backgroundColor: '#3740FE',
    height: 0.5*deviceHeight/7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  }
});