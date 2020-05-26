import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Home from './components/home';
import Profile from './components/profile';

const Stack = createStackNavigator();

function GoToButton({ screenName }) {
  const navigation = useNavigation();
  return (
    <HeaderBackButton onPress={() => navigation.navigate(screenName)} />
  );
}

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ title: 'Home',  headerShown: false}}
      />   
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Sign Up', headerLeft: (navigation) => (<GoToButton screenName="Home"/>) }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ title: 'Login',headerLeft: (navigation) => (<GoToButton screenName="Home"/>)}}
      />
      <Stack.Screen 
       name="Dashboard" 
       component={Dashboard} 
       options={
         { title: 'Dashboard' },
         {headerLeft: null} 
       }
      />
      <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{ title: 'Profile Settings',headerLeft: (navigation) => (<GoToButton screenName="Dashboard"/>)}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
