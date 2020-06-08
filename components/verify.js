import React, { Component, useState, useEffect } from 'react';
import { View, TextInput, Text } from 'react-native';
import firebase from '../database/firebase';
import SettingsList from 'react-native-settings-list';
  
function Verify() {
    const userId = firebase.auth().currentUser.uid;
    const emailVerified = firebase.auth().currentUser.emailVerified;
    const [emailVerifiedText, setEmailVerifiedText] = useState("Not Verified");
    const [emailVerifiedColor, setEmailVerifiedColor] = useState("red");
    const [referralVerifiedText, setReferralVerifiedText] = useState("Not Verified");
    const [referralVerifiedColor, setReferralVerifiedColor] = useState("red");
    const [referralChangeEnabled, setReferralChangeEnabled] = useState(true);
    const [sendVerificationText, setSendVerificationText] = useState("");
    const [sendVerificationColor, setSendVerificationColor] = useState("black");
    const [referral, setReferral] = useState("")
    const [referralVerified, setReferralVerified] = useState(false)
    if (firebase.auth().currentUser) {
      const userRef = firebase.database().ref('users/' + this.userId);
      userRef.once('value').then((snapshot) => {
        const values = snapshot.val()
        setReferral(values.referral)
        setReferralVerified(values.referralVerified)
      })
    }

    useEffect(() => {
      if (emailVerified) {
        setEmailVerifiedText("Verified");
        setEmailVerifiedColor("green");
        setSendVerificationColor("grey");
      }
      else {
        setEmailVerifiedText("Not Verified");
        setEmailVerifiedColor("red");
        setSendVerificationColor("black");
      }
      if (referralVerified) {
        setReferralVerifiedText("Verified");
        setReferralVerifiedColor("green");
        setReferralChangeEnabled(false);
      }
      else {
        setReferralVerifiedText("Not Verified");
        setReferralVerifiedColor("red");
        setReferralChangeEnabled(true)
      }
    });
  
    changeReferral = (ref) => {
      const users = firebase.database().ref('users/')
      setReferral(ref)
      users.once("value").then(snapshot => {
        snapshot.forEach(item => {
          if (item.key == ref && ref != userId){
            setReferralVerified(true)
          }
        })
      })
      firebase.database().ref('users/' + userId).update({
        referral: referral,
        referralVerified: referralVerified
      })
    }

    sendEmailVerification = () => {
      if (!emailVerified){
        firebase.auth().currentUser.sendEmailVerification();
        setSendVerificationColor("grey");
        setSendVerificationText("Verification email sent!");
      }
    }
  
  return (
    <View style={{backgroundColor:'#EFEFF4',flex:1}}>
    <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
      <SettingsList.Header/>
      <SettingsList.Item
        title='Email'
        titleInfo={emailVerifiedText}
        titleInfoStyle={{color: emailVerifiedColor}}
        hasNavArrow={false}
      />
      <SettingsList.Item
        title='Send Verification Email'
        titleStyle={{color: sendVerificationColor}}
        hasNavArrow={false}
        onPress={sendEmailVerification()}
      />
      <SettingsList.Header headerText={sendVerificationText} headerStyle = {{color: "green"}}/>
      <SettingsList.Item
        title='Referral'
        titleInfo={referralVerifiedText}
        titleInfoStyle={{color: referralVerifiedColor}}
        hasNavArrow={false}
      />
      <SettingsList.Item
        title='Enter Code'
        arrowIcon={<View flexDirection="row">
                    <TextInput defaultValue={referral} onChangeText={(val) => changeReferral(val)} editable={referralChangeEnabled}/>
                    <Text>  </Text>
                   </View>}
      />
    </SettingsList>
    </View>
  );
}

Verify.navigationOptions = {
  title: 'Verification Settings',
  headerLeft: (navigation) => (<GoToButton screenName="Dashboard"/>)
}

export default Verify;