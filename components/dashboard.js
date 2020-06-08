import React, { Component } from 'react';
import { StyleSheet,
         View,
         Text,
         Button,
         Image,
         Switch } from 'react-native';
import firebase from '../database/firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsList from 'react-native-settings-list';
import { useNavigation } from '@react-navigation/native';

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

function SettingsPage({navigation}) {
  user = firebase.auth().currentUser
  if (user) {
    this.userId = user.uid;
    this.state = {};
    userRef = firebase.database().ref('users/' + this.userId);
    userRef.once('value').then((snapshot) => {
      this.setState(snapshot.val())
    })
    this.displayName = firebase.auth().currentUser.displayName;
      this.email = firebase.auth().currentUser.email;
      this.verified = firebase.auth().currentUser.emailVerified;
      this.vText = "Not Verified";
      this.vCol = "red";
  }
  if (this.verified && this.state.referralVerfied) {
    this.vText = "Verified";
    this.vCol = "green"
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Home')
    })
    .catch(error => console.log('Error!'))
  } 
  
  return (
    <View style={{backgroundColor:'#EFEFF4',flex:1}}>
        <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
          <SettingsList.Header headerStyle={{marginTop:15}}/>
          <SettingsList.Item
            title='Profile'
            onPress={() => navigation.navigate("Profile")}
          />
          <SettingsList.Item
            title='Verification'
            titleInfo={this.vText}
            titleInfoStyle={styles.titleInfoStyle, {color:this.vCol}}
            onPress={() => navigation.navigate("Verify")}
          />
          <SettingsList.Header headerStyle={{marginTop:15}}/>
          <SettingsList.Item
            title='Logout'
            hasNavArrow={false}
            onPress={() => navigation.navigate("Home")}
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