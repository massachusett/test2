import React, { Component } from 'react';
import { StyleSheet,
         View,
         Text,
         Button,
         Image,
         StatusBar,
         Platform,
         RefreshControl,
         Switch } from 'react-native';
import firebase from '../database/firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsList from 'react-native-settings-list';
import { ThemeConsumer } from 'react-native-elements';

function PartyScreen() {
  return (
    <View style={styles.container}>
      <Text>Party Map</Text>
    </View>
  );
}

function FriendsScreen() {
  return (
    <View style={styles.container}>
      <Text>Friends</Text>
    </View>
  );
}

function SettingsPage() {
  if (firebase.auth().currentUser) {
    userId = firebase.auth().currentUser.uid;
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: userId,
      email: firebase.auth().currentUser.email,
      verified: firebase.auth().currentUser.emailVerified,
      vText: "Not Verified",
      vCol: "red",
      firstName: firebase.database().ref('users/' + userId + '/firstName').on('value', function (snapshot) {snapshot.val()}),
      lastName: firebase.database().ref('users/' + userId + '/lastName').on('value', function (snapshot) {snapshot.val()}),
      dob: firebase.database().ref('users/' + userId + '/dob').on('value', function (snapshot) {snapshot.val()}),
      year: firebase.database().ref('users/' + userId + '/year').on('value', function (snapshot) {snapshot.val()}),
      house: firebase.database().ref('users/' + userId + '/house').on('value', function (snapshot) {snapshot.val()}),
      gender: firebase.database().ref('users/' + userId + '/gender').on('value', function (snapshot) {snapshot.val()})
    }
  }
  if (this.state.verified) {
    this.state.vText = "Verified";
    this.state.vCol = "green"
  }

  signOut = () => {
      firebase.auth().signOut().then((res) => {
        console.log(res)
        console.log('User logged-out successfully!')
        this.state = {}
        this.props.navigation.navigate('Home')
      })
      .catch(error => this.state = { errorMessage: error.message })
    }
  
  return (
    <View style={{backgroundColor:'#EFEFF4',flex:1}}>
        <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
          <SettingsList.Header headerStyle={{marginTop:15}}/>
          <SettingsList.Item
            title='Profile'
          />
          <SettingsList.Item
            title='Verification'
            titleInfo={this.state.vText}
            titleInfoStyle={styles.titleInfoStyle, {color:this.state.vCol}}
          />
          <SettingsList.Header headerStyle={{marginTop:15}}/>
          <SettingsList.Item
            title='Logout'
            hasNavArrow={false}
            onPress={() => signOut()}
          />
          <SettingsList.Item
            title='Delete Account'
            hasNavArrow={false}
          />
        </SettingsList>
    </View>
  )
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Party') {
              return <Image source={require('../assets/Favorites-2/icons8-champagne-500.png')}
                            style={{width: size, height: size}}
                            focused={focused} />
            } else if (route.name === 'Settings') {
              return <Image source={require('../assets/Favorites-2/icons8-settings-500.png')}
                            style={{width: size, height: size}}
                            focused={focused} />
            } else if (route.name === 'Friends') {
              return <Image source={require('../assets/Favorites-2/icons8-contacts-500.png')}
                            style={{width: size, height: size}}
                            focused={focused} />
            }
            // You can return any component that you like here!
            
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
      <Tab.Screen name="Party" component={PartyScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  );
}
  
export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = { 
      uid: ''
    }
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  } 
  
  verifyEmail = () => {
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    })
  }  

  render() {
    
    return (
      <MyTabs />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#EFEFF4'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
});