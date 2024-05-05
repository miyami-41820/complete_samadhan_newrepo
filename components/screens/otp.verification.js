import React from "react";
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, Alert, ActivityIndicator, KeyboardAvoidingView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import OTPInputView from '@twotalltotems/react-native-otp-input';
import OTPTextView from 'react-native-otp-textinput';
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
    height: 100,
    width: 100,
    margin: 20,
    marginTop: 80
  },
  topSliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: widthPercentageToDP("50%"),
    justifyContent: 'space-between'
  },
  topSlider: {
    width: widthPercentageToDP("15%"),
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
    marginBottom: 40
  },
  contentView: {
    width: widthPercentageToDP("70%")
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  subHeaderText: {
    color: '#777777',
    fontSize: 18,
    marginBottom: 10
  },
  flagImage: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  inputNumber: {
    backgroundColor: '#fff',
    height: 40,
    width: widthPercentageToDP("55%"),
    marginLeft: 20,
    paddingLeft: 10,
    borderRadius: 10,
    fontWeight: 'bold'
  },
  inputNumberLabel: {
    marginVertical: 15,
    marginLeft: 10,
    color: '#777777'

  },
  otpView: {
    width: '100%',
    height: 100,
    color: '#000',
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 5,
    color: 'black',
    backgroundColor: '#fff',
    // borderBottomColor: '#17BED0',
  },
  textInputContainer: {
    marginBottom: 20,
    width: widthPercentageToDP('50%'),
    display:'flex',
    borderColor: '#fddbda',
  },
  roundedTextInput: {
    borderRadius: 10,
    width: 30,
    height: 40,
    borderColor: 'none',
    borderBottomColor: '#777777',
    borderWidth: 1,
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
  const { number } = route.params;
  const [otp, onChange] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  var proceed = async() => {
    if(otp != null && otp != "0" && otp != "" && otp.length == 6){
      const url = urls.BASE_URL+urls.verify_otp;
      const data = {"number": number,"otp": otp}
      setLoading(true);
      axios.post(url,data)
      .then(response => {
        setLoading(false);
        console.log(response.status)
        if(response?.status == 200){
          console.log(response.data.message);
          _storeData = async () => {
            try {
              await AsyncStorage.setItem(
                'number',
                number
              );
              await AsyncStorage.setItem(
                'userId',
                response.data.userData?._id
              );
              await AsyncStorage.setItem(
                'firstName',
                response.data.userData?.firstName
              );
              await AsyncStorage.setItem(
                'lastName',
                response.data.userData?.lastName
              );
              await AsyncStorage.setItem(
                'email',
                response.data.userData?.email
              );
              if(response.data.userData?.admin){
                await AsyncStorage.setItem(
                  'admin',
                  str(response.data.userData?.admin)
                );
              }
            } catch (error) {
              console.log("error",number);
            }
          };
          _storeData();
            console.log("IS ADMIN: ",response.data.message)
            if(response.data.userData?.admin){
              navigation.navigate('Admin');
            }
            else if(response.data.message == "User Exist"){
              navigation.navigate('Services');
            }
            else {
              navigation.navigate('AddProfile');
            }
        }
        else {
            Alert.alert( "Error !","Some error has occurred !",[{ text: "OK", onPress: () => console.log("OK") } ]);
        }
      })
      .catch(error => {
          setLoading(false);
          console.log(error)
          Alert.alert("Error !", "Some Error Occurred !",[ { text: "OK", onPress: () => console.log("OK Pressed") }]);
      })
    }
    else{
      Alert.alert(
        "Incorrect OTP !",
        "Please try again.",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  }
  return (
    <ImageBackground style={styles.container} source={require("../../assets/start_bck.png")}>
      {loading?<ActivityIndicator style={styles.loaderOverlay} size="small" color="black" />:null}
      <Image
        style={styles.LogoImage}
        source={require("../../assets/logo.png")}
      />
      <View style={styles.topSliderContainer}>
        <View style={styles.topSlider}>
        </View>
        <View style={[styles.topSlider,{backgroundColor: '#000'}]}>
        </View>
        <View style={styles.topSlider}>
        </View>
      </View>
      <View style={styles.contentView}>
        <Text style={styles.headerText}>OTP Verification</Text>
        <Text style={styles.subHeaderText}>Enter OTP you have received on +91-{number}</Text>
        <View style={{display:'flex',flexDirection:'row'}}>
      <OTPTextView
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          handleTextChange={onChange}
          inputCount={6}
          tintColor="#000"
          width={widthPercentageToDP('10%')}
          keyboardType="numeric"
        />
        </View>
        <Text style={styles.inputNumberLabel} >a 6 digit OTP will be sent via SMS verify your mobile number.</Text>
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