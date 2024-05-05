import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Alert, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import CheckBox from 'react-native-check-box';
import axios from "axios";
import urls from "../../urls";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  startButton: {
    color: '#fff',
    backgroundColor: '#000',
    fontSize: 28,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 40,
    marginTop: 30
  },
  LogoImage: {
    height: 140,
    width: 140,
    borderRadius: 70,
    margin: 20,
    marginTop: 20
  },
  addImage: {
    top: -50,
    right: -120,
    borderRadius: 20,
    width: 40,
    height: 40,
    paddingLeft: 8,
    paddingBottom: 3,
    fontSize: 36,
    fontWeight: 'bold',
    backgroundColor: '#EEEEEE'
  },
  topSliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: widthPercentageToDP("50%"),
    justifyContent: 'space-between',
    marginTop: 80
  },
  topSlider: {
    width: widthPercentageToDP("15%"),
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
    marginBottom: 40
  },
  contentView: {
    width: widthPercentageToDP("80%"),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  imageContainer: {
    position: 'relative',
    height: 200
  },
  inputData: {
    backgroundColor: '#fff',
    height: 40,
    width: widthPercentageToDP("70%"),
    paddingLeft: 10,
    marginBottom: 15,
    borderRadius: 10,
    fontWeight: 'bold'
  },
  inputNumberLabel: {
    width: widthPercentageToDP("80%"),
    marginVertical: 15,
    marginLeft: 30,
    color: '#777777'

  },
  checkboxText: {
    backgroundColor: '#000'
  },
  loaderOverlay:{
    position: "absolute",
    height:heightPercentageToDP("100%"),
    width: widthPercentageToDP("100%"),
    backgroundColor:'#00000070',
    zIndex:100,
    top: 0,
    left:0
  }
});


function NumVerifyScreen({route, navigation }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [image, setImage] = React.useState("");
  const [number, setNumber] = React.useState(0);
  const [isSelected, setSelection] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [userId, setUserId] = React.useState(null);


  useEffect(() => {
    let _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('number');
        const userId = await AsyncStorage.getItem('userId');
        if (value !== null && userId !== null) {
          // We have data!!
          setNumber(value);
          setUserId(userId)
        }
      } catch (error) {
        console.log(error);
      }
    };
    _retrieveData();
  }, []);

  // var pickImg = async () => {
  //   const result = await launchImageLibrary();
  //   console.log(result);
  // }
  
  var proceed = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(reg.test(email) === false){
      Alert.alert( "Incorrect email !", "Please fill email correctly.",[{ text: "OK", onPress: () => console.log("OK Pressed") }]);
      setEmail("");
    }
    else if (firstName != '' && lastName != '' && email != '' && isSelected == true) {
      const url = urls.BASE_URL+urls.update_user;
      const data = {"firstName": firstName,"lastName": lastName,"email": email,"profile_img": "",'number': number, 'userId': userId}
      axios.post(url,data)
      .then(async response => {
        setLoading(false);
        if(response.status == 200){
          const userData = response.data.userData;
          await AsyncStorage.setItem('name', userData.firstName);
          await AsyncStorage.setItem('email', userData.email);
          await AsyncStorage.setItem('userId', userData._id);
          await AsyncStorage.setItem('number', number);
          await AsyncStorage.setItem('admin', str(userData.admin));
          navigation.navigate('Services');
        }
        else {
          Alert.alert( "Error !","Some error has occurred !",[{ text: "OK", onPress: () => console.log("OK") } ]);
        }
      })
      .catch(error => {
        setLoading(false);
          Alert.alert("Error !", "Some Error Occurred !",[ { text: "OK", onPress: () => console.log("OK Pressed") }]);
        console.log(error)
      })
      setLoading(true);
    }
    else {
      Alert.alert( "Incorrect Data !", "Please fill data correctly.",[{ text: "OK", onPress: () => console.log("OK Pressed") }]);
    }
  }
  var setCheckbox = () => {
    setSelection(!isSelected);
  }
  return (
    <ImageBackground style={styles.container} source={require("../../assets/start_bck.png")}>
      {loading?<ActivityIndicator style={styles.loaderOverlay} size="small" color="#0000ff" />:null}
      <View style={styles.topSliderContainer}>
        <View style={styles.topSlider}>
        </View>
        <View style={styles.topSlider}>
        </View>
        <View style={[styles.topSlider, { backgroundColor: '#000' }]}>
        </View>
      </View>
      <View style={styles.contentView}>
        <Text style={styles.headerText}>Enter your details Here</Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.LogoImage}
            source={require("../../assets/blank_profile.png")}
          />
          <Text
            style={styles.addImage}
            // onPress={pickImg}
            >+
          </Text>
        </View>
        <View style={{ display: 'flex' }}>
          <TextInput
            style={styles.inputData}
            onChangeText={setFirstName}
            value={firstName}
            placeholder="First Name"
            maxLength={10}
          />
          <TextInput
            style={styles.inputData}
            onChangeText={setLastName}
            value={lastName}
            placeholder="Last Name"
            maxLength={10}
          />
          <TextInput
            style={styles.inputData}
            onChangeText={setEmail}
            value={email}
            placeholder="Enter A Valid Email Address"
            maxLength={30}
          />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row',width: widthPercentageToDP("80%") }}>
          <CheckBox
            style={{ flex: 1, padding: 10 }}
            onClick={setCheckbox}
            isChecked={isSelected}
          />
          <Text style={styles.inputNumberLabel} >I accept all terms and Condition.</Text>
        </View>
      </View>
      <Text
        style={styles.startButton}
        onPress={proceed}
      >Next
      </Text>
    </ImageBackground>
  );
}

export default NumVerifyScreen;