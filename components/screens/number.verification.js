import React from "react";
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, Alert, ActivityIndicator, ImageBackground} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
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
    fontSize: 48,
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
    width: widthPercentageToDP("50%"),
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

function NumVerifyScreen({ navigation }) {
  const [number, onChangeNumber] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  var proceed = () => {
    if(number != null && number != "0" && number != "" && number.length == 10){
      const url = urls.BASE_URL+urls.send_otp;
      const data = {"number": number}
      setLoading(true);
      axios.post(url,data)
      .then(response => {
        setLoading(false);
        if(response.status == 200){
          navigation.navigate('OTPVerify', {number: number})
        }
        else {
          Alert.alert( "Error !","Some error has occurred !",[{ text: "OK", onPress: () => console.log("OK") } ]);
        }
        console.log(response.status)
      })
      .catch(error => {
        setLoading(false);
          Alert.alert("Error !", "Some Error Occurred !",[ { text: "OK", onPress: () => console.log("OK Pressed") }]);
        console.log(error)
      })
    }
    else {
      Alert.alert(
        "Invalid Number !",
        "Please enter a valid mobile number.",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  }
  return (
    <ImageBackground style={styles.container}  source={require("../../assets/start_bck.png")}>
      {loading?<ActivityIndicator style={styles.loaderOverlay} size="large" color="#0000ff" />:null}
      <Image
        style={styles.LogoImage}
        source={require("../../assets/logo.png")}
      />
      <View style={styles.topSliderContainer}>
        <View style={[styles.topSlider,{backgroundColor: '#000'}]}>
        </View>
        <View style={styles.topSlider}>
        </View>
        <View style={styles.topSlider}>
        </View>
      </View>
      <View style={styles.contentView}>
        <Text style={styles.headerText}>Hello !</Text>
        <Text style={styles.subHeaderText}>Enter Your Phone Number</Text>
        <View style={{display:'flex',flexDirection:'row',marginTop: 20}}>
          <Image
            style={styles.flagImage}
            source={require("../../assets/flag.png")}
          />
          <SafeAreaView>
      <TextInput
        style={styles.inputNumber}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Enter Your Phone Number"
        keyboardType="numeric"
        maxLength={10}
      />
    </SafeAreaView>
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