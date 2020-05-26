import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, Button, Picker} from 'react-native';
import firebase from '../database/firebase';
import SettingsList from 'react-native-settings-list';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
  
export default class Profile extends Component {
  constructor() {
    super();
    if (firebase.auth().currentUser) {
      this.userId = firebase.auth().currentUser.uid;
      this.state = {};
      userRef = firebase.database().ref('users/' + this.userId);
      userRef.once('value').then((snapshot) => {
        this.setState(snapshot.val())
      })
      this.displayName = firebase.auth().currentUser.displayName;
      this.email = firebase.auth().currentUser.email;
      this.verified = firebase.auth().currentUser.emailVerified;
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
    return (
      <View style={{backgroundColor:'#EFEFF4',flex:1}}>
      <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
        <SettingsList.Header headerStyle={{marginTop:15}}/>
        <SettingsList.Item
          title='Email'
          titleInfo={this.email}
          hasNavArrow={false}
        />
        <SettingsList.Header headerStyle={{marginTop:15}}/>
        <SettingsList.Item
          title='First Name'
          arrowIcon={<View flexDirection="row"><TextInput defaultValue={this.state.firstName}/><Text>  </Text></View>}
        />
        <SettingsList.Item
          title='Last Name'
          arrowIcon={<View flexDirection="row"><TextInput defaultValue={this.state.lastName}/><Text>  </Text></View>}
        />
        <SettingsList.Item
          title='Date of Birth'
          arrowIcon={<View flexDirection="row"><DatePicker
          date={this.state.dob}
          mode="date"
          format="YYYY-MM-DD"
          minDate="1950-01-01"
          maxDate={this.state.date}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
        /><Text>  </Text></View>}
        />
        <SettingsList.Item
          title='Gender'
          arrowIcon={<View flexDirection="row"><Dropdown data={genderData} value={this.state.gender}/><Text>  </Text></View>}
        />
        <SettingsList.Item
          title='Graduation Year'
          arrowIcon={<View flexDirection="row"><Dropdown data={yearData} value={this.state.year}/><Text>  </Text></View>}
        />
        <SettingsList.Item
          title='House'
          arrowIcon={<View flexDirection="row"><Dropdown data={houseData} value={this.state.house}/><Text>  </Text></View>}
        /> 
        <SettingsList.Header headerStyle={{marginTop:15}}/> 
        <SettingsList.Item title='Change Password'/> 
      </SettingsList>
      </View>
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