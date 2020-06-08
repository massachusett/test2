import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';

export default class Signup extends Component {
  
  constructor() {
    super();
    this.state = { 
      firstName: '',
      lastName: '',
      email: '', 
      password: '',
      isLoading: false,
      errorMessage: '',
      dob: new Date(),
      year: '',
      house: '',
      gender: ''
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    var msDiff = new Date().getTime() - this.state.dob.getTime(); 
    var dateDiff = Math.floor(msDiff / (1000 * 60 * 60 * 24 * 365));
    if(this.state.email === '' ||
       this.state.password === '' ||
       this.state.firstName === '' ||
       this.state.lastName === '') {
        this.updateInputVal('Please fill out all fields to sign up!','errorMessage')
    }
    else if (dateDiff < 16 || dateDiff > 30) {
      this.updateInputVal('Please enter a valid date of birth!','errorMessage')
    }
    else if (!this.state.email.endsWith('@college.harvard.edu')) {
      this.updateInputVal('Please enter a valid Harvard email address to sign up!','errorMessage')
    }
    else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.firstName.concat(" " , this.state.lastName),
          emailVerified: false
        })
        if (firebase.auth().currentUser) {
          userId = firebase.auth().currentUser.uid;
          if (userId) {
              firebase.database().ref('users/' + userId).set({
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  dob: String(this.state.dob.getFullYear()).concat("-",this.state.dob.getMonth(),"-",this.state.dob.getDate()),
                  year: this.state.year,
                  house: this.state.house,
                  gender: this.state.gender,
                  referral: '',
                  referralVerified: false
              })
          }
        }
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          firstName: '',
          lastName: '',
          email: '', 
          password: '',
          errorMessage: '',
          dob: new Date()
        })
        this.props.navigation.navigate('Dashboard')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
      
    }
  }

  render() {
    let yearData = [{
      value: '2024',
    }, {
      value: '2023',
    }, {
      value: '2022',
    }, {
      value: '2021',
    }];
    let houseData = [{
      value: 'Adams',
    }, {
      value: 'Apley',
    }, {
      value: 'Cabot',
    }, {
      value: 'Canaday',
    }, {
      value: 'Currier',
    }, {
      value: 'Dudley',
    }, {
      value: 'Dunster',
    }, {
      value: 'Eliot',
    }, {
      value: 'Grays',
    }, {
      value: 'Greenough',
    }, {
      value: 'Hollis',
    }, {
      value: 'Holworthy',
    }, {
      value: 'Hurlbut',
    }, {
      value: 'Kirkland',
    }, {
      value: 'Leverett',
    }, {
      value: 'Lionel',
    }, {
      value: 'Lowell',
    }, {
      value: 'Massachusetts',
    }, {
      value: 'Mather',
    }, {
      value: 'Matthews',
    }, {
      value: 'Mower',
    }, {
      value: 'Pennypacker',
    }, {
      value: 'Pforzheimer',
    }, {
      value: 'Quincy',
    }, {
      value: 'Stoughton',
    }, {
      value: 'Straus',
    }, {
      value: 'Thayer',
    }, {
      value: 'Weld',
    }, {
      value: 'Wigglesworth',
    }, {
      value: 'Winthrop',
    }];
    let genderData = [{
      value: 'Male',
    }, {
      value: 'Female',
    }, {
      value: 'Other',
    }];
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          {this.state.errorMessage}
        </Text> 
        <TextInput
          style={styles.inputStyle}
          placeholder="First Name"
          value={this.state.firstName}
          onChangeText={(val) => this.updateInputVal(val, 'firstName')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Last Name"
          value={this.state.lastName}
          onChangeText={(val) => this.updateInputVal(val, 'lastName')}
        />
        <DatePicker
          style={styles.inputStyle}
          date={this.state.date}
          mode="date"
          placeholder="Date of Birth"
          format="YYYY-MM-DD"
          minDate="1950-01-01"
          maxDate={this.state.date}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          onDateChange={(date) => this.updateInputVal(new Date(date), 'dob')}
        />
        <Dropdown
          label='Gender'
          data={genderData}
          value='Male'
          onChangeText={(val) => this.updateInputVal(val, 'gender')}
        />  
        <Dropdown
          label='Graduation Year'
          data={yearData}
          value='2024'
          onChangeText={(val) => this.updateInputVal(val, 'house')}
        /> 
        <Dropdown
          label='House'
          data={houseData}
          value='Adams'
          onChangeText={(val) => this.updateInputVal(val, 'year')}
        />       
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        <Button
          color="#3740FE"
          title="Sign Up"
          onPress={() => this.registerUser()}
        />                        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  errorText: {
    color: '#FF0000',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});