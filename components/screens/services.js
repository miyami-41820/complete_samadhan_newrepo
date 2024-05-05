import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, Alert, Modal, ActivityIndicator, BackHandler, Linking, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import MenuDrawer from 'react-native-side-drawer'
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/Fontisto';
import EIcon from 'react-native-vector-icons/Entypo';
import axios from "axios";
import urls from "../../urls";
import DatePicker from 'react-native-datepicker';


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
    height: 40,
    width: 40
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
    width: widthPercentageToDP("90%"),
    justifyContent: 'space-between',
    marginTop: 80
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
    fontWeight: 'bold',
    borderWidth: 1, // Add border width
    borderColor: '#ccc', // Add border color
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
  list: {
    // backgroundColor: '#000',
    width: widthPercentageToDP('90%'),
    height: heightPercentageToDP('80%'),
    marginTop: 40
  },
  listItem: {
    width: widthPercentageToDP("50%"),
    height: 100,
    margin: 'auto'
  },
  item:{
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthPercentageToDP('8%'),
    marginBottom: widthPercentageToDP('8%'),
    width: widthPercentageToDP('100%'),
    borderRadius: 5,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },
  serviceText: {
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center'
  },
  modalView: {
    marginTop: heightPercentageToDP('30%'),
    width:widthPercentageToDP('80%'),
    marginLeft:widthPercentageToDP("10%"),
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  drawerView: {
    // marginTop: heightPercentageToDP('10%'),
    height: heightPercentageToDP('100%'),
    width:widthPercentageToDP('60%'),
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalHeading:{
    marginBottom: 15,
    textAlign: "center",
    fontWeight: 'bold',
    fontSize:16
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  drawerHeading:{
    width:widthPercentageToDP('60%'),
    marginBottom: 25,
    marginLeft:20,
    textAlign: "left",
    fontWeight: 'bold',
    fontSize:18
  },
  drawerText: {
    width:widthPercentageToDP('50%'),
    backgroundColor:'#eeeeee',
    alignSelf:'flex-start',
    padding: 10,
    marginBottom: 16,
    textAlign: "left",
  },
  modalNote: {
    fontSize:12,
    fontStyle:'italic',
    marginTop:10,
    textAlign:'center'
  },
  loaderOverlay:{
    position: "absolute",
    height:heightPercentageToDP("100%"),
    width: widthPercentageToDP("100%"),
    backgroundColor:'#00000070',
    zIndex:100,
    top: 0,
    left:0
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    elevation: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'left',
    width: widthPercentageToDP('90%'),
    // marginHorizontal: widthPercentageToDP('%')
  },
  itemContent: {
    marginBottom: 10,
    maxWidth: widthPercentageToDP('90%'),
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    marginBottom: 5,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  labelColor: {
    color: '#007bff', // Blue color for headings
  },
  serviceInfoText: {
    fontSize: 16,
    maxWidth: widthPercentageToDP('90%'),
    marginRight: widthPercentageToDP('10%'),
    marginLeft: widthPercentageToDP('2%'),
  },
  requestButton: {
    backgroundColor: '#A87676',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'left',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceInfoLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#A87676',
  },
});

function NumVerifyScreen({ navigation }) {
  const [selectedId, setSelectedId] = React.useState(null);
  const [selectedService, setSelectedService] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [value, setNumber] = React.useState(0);
  const [services, setServices] = React.useState([]);
  const [userId, setUserId] = React.useState("");
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isChecked, setChecked] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userNumber, setUserNumber] = React.useState("");
  const [description, setDescription] = React.useState("");



  const updateServiceRequest = (id, service) => {
    console.log(id, service);
    setSelectedId(id);
    setSelectedService(service);
    setModalVisible(true);
  }

  let getServices = () => {
    const url = urls.BASE_URL+urls.get_services;
    axios.get(url)
    .then(response => {
      console.log("Hereee")
      setLoading(false);
      if(response.status == 200){
        setServices(response.data.services)
      }
      else {
        Alert.alert( "Some trouble connecting !","Try again later!",[{ text: "OK", onPress: () => console.log("OK") } ]);
      }
      console.log(response.status)
    })
    .catch(error => {
      setLoading(false);
        Alert.alert("Error !", "Some Error Occurred !",[ { text: "OK", onPress: () => console.log("OK Pressed") }]);
      console.log(error)
    })
  }

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    let _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('number');
        const userId = await AsyncStorage.getItem('userId');
        const isAdmin = await AsyncStorage.getItem('admin');
        const firstName = await AsyncStorage.getItem('firstName');
        const lastName = await AsyncStorage.getItem('lastName');
        const email = await AsyncStorage.getItem('email');
        setUserName(firstName + " " + lastName);
        setUserEmail(email);
        setUserNumber(value);
        console.log(value);
        console.log(userId);
        if (isAdmin === 'true'){
          navigation.navigate('Admin')
        }
        else if (value !== null && userId !== null) {
          // We have data!!
          setNumber(value);
          setUserId(userId);
        }
        else {
          navigation.navigate('NumVerify')
        }
      } catch (error) {
        console.log(error);
      }
    };
    _retrieveData();
    setLoading(true);
    getServices();
  }, []);

  const renderItem = ({ item }) => {
    // const backgroundColor = item._id === selectedId ? "#CCCCCC90" : "#EEEEEE90"
     console.log(item);
     const servicesArray = item.servicesOffered.split(',');
    return (
      <View style={styles.itemContainer}>
      <Text style={styles.serviceName}>{item.name}</Text>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'top' , maxWidth: '80%' , marginBottom: 10}}>
        <Text style={[styles.serviceInfoLabel, { marginRight: 5 }]}>Offered Services:</Text>
        <View >
          {servicesArray.map((service, index) => (
            <Text key={index} style={styles.serviceInfoText}>{`\u2022 ${service.trim()}`}</Text>
          ))}
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'top' , maxWidth: '80%' , marginBottom: 10}}>
      <Text style={[styles.serviceInfoLabel, { marginRight: 5 }]}>Service charges:</Text>
        <Text style={[styles.serviceInfoText, { flex: 1 }]} numberOfLines={2}>
          {/* Rupees icon */}
          <Icon name="rupee" size={16} color="#000" />
          {/* Space */}
          {" "}
          {/* Price */}
          {item.price}
        </Text>
      </View>
      <TouchableOpacity onPress={() => {updateServiceRequest(item._id, item.name)}} style={styles.requestButton}>
        <Text style={styles.buttonText}>Request Service</Text>
      </TouchableOpacity>
      <Text style={[styles.infoText, {marginTop: 10 }]}>{item.description}</Text>
      </View>
    );
  };

  let removeData = async () => {
    try {
      await AsyncStorage.removeItem('number');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('firstName');
      await AsyncStorage.removeItem('lastName');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('admin');
    } catch (error) {
      console.log(error);
    }
  };

  var proceed = (link) => {
    if (link == 'logout') {
      removeData();
      navigation.navigate('Home')
    }
    else {
      navigation.navigate(link)
    }
    setDrawerVisible(!drawerVisible)
  }

  const requestService = () => {
    setLoading(true);
    if (isChecked && userName && userNumber && userEmail) {
      console.log("Requesting Service");
      const url = urls.BASE_URL+urls.request_service;
      const data = {"userId": userId,"serviceId": selectedId,"selectedService": selectedService, "userName": userName, "userNumber": userNumber, "userEmail": userEmail, "description": description}
      console.log(data);
      setModalVisible(false);
      axios.post(url,data)
      .then(response => {
        setLoading(false);
        if(response.status == 200){
          Alert.alert("Service Requested !", "Thankyou for choosing the service. Our team will get back to you !",[ { text: "OK", onPress: () => console.log("OK Pressed") }]);
        }
        else {
          Alert.alert( "Error !","Some error has occurred !",[{ text: "OK", onPress: () => console.log("OK") } ]);
        }
        console.log(response.status)
      })
      .catch(error => {
        setLoading(false);
        setModalVisible(false);
        if (error.response.status == 400) {
          Alert.alert( "Request already in progress !","We are already processing one of your similar request !",[{ text: "OK", onPress: () => console.log("OK") } ]);
        }
        else{
          Alert.alert("Error !", "Some Error Occurred !",[ { text: "OK", onPress: () => console.log("OK Pressed") }]);
        }
        console.log(error)
      })
    }
    else{
      setModalVisible(false);
      setLoading(false);
      Alert.alert( "Error !","Please check the checkbox to proceed !",[{ text: "OK", onPress: () => console.log("OK") } ]);
    }
  }

  var setCheckbox = () => {
    setChecked(!isChecked);
  }
  return (
    <ImageBackground style={styles.container} source={require("../../assets/general_bck.png")}>
      {loading?<ActivityIndicator style={styles.loaderOverlay} size="large" color="#0000ff" />:null}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeading}>Request Service !</Text>
          <View style={{ display: 'flex' }}>
          <TextInput
            style={styles.inputData}
            onChangeText={setUserName}
            value={userName}
            placeholder="Requester Name"
            maxLength={20}
          />
          <TextInput
            style={styles.inputData}
            onChangeText={setUserNumber}
            value={userNumber}
            placeholder="Re Number"
            maxLength={10}
          />
          <TextInput
            style={styles.inputData}
            onChangeText={setUserEmail}
            value={userEmail}
            placeholder="Enter A Valid Email Address"
            maxLength={30}
          />
          <TextInput
            style={styles.inputData}
            onChangeText={setDescription}
            value={description}
            placeholder="Enter Description of the problem, if any."
            maxLength={500}
          />
        </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={styles.modalText} >Are you sure you want to request {selectedService} service  ?</Text>
            <CheckBox
            style={{ padding: 10 }}
            onClick={setCheckbox}
            isChecked={isChecked}
            />
        </View>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:widthPercentageToDP('50%')}}>
            <TouchableOpacity
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => requestService()}
            >
              <Text style={styles.textStyle}>Request</Text>
            </TouchableOpacity>
            </View>
            <Text style={styles.modalNote}>Note: On requesting, our team will get in touch with you.</Text>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={drawerVisible}
        onRequestClose={() => {
          setDrawerVisible(!drawerVisible);
        }}
      >
        <View>
          <View style={styles.drawerView}>
            <View style={{display:'flex',alignItems:'flex-end' ,width:widthPercentageToDP('60%')}}>
            <EIcon
            name='cross' size={40} onPress={() => setDrawerVisible(!drawerVisible)}/>
            </View>
            <Text style={styles.drawerHeading}>Hi {name} !</Text>
            <TouchableOpacity style={styles.drawerText} onPress={() => { proceed('MyProfile')}}><Text>My Profile</Text></TouchableOpacity>
            <TouchableOpacity style={styles.drawerText} onPress={() => { proceed('requestedServices')}}><Text>Requested Services</Text></TouchableOpacity>
            <TouchableOpacity style={styles.drawerText} onPress={() => { proceed('logout')}}><Text>Logout</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.topSliderContainer}>
        <TouchableOpacity>
        <Icon
          name='bars' size={30} onPress={() => setDrawerVisible(!drawerVisible)}/>
        </TouchableOpacity>
        <Image
          style={styles.LogoImage}
          source={require("../../assets/logo.png")}
        />
        <FIcon
          name='email' size={30} onPress={() => Linking.openURL('mailto:complete.Samaadhan12@gmail.com?subject=Query Contact Us')}/>
      </View>
      <View style={styles.contentView}>
      <FlatList
        numColumns={2}
        style={styles.list}
        data={services}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        extraData={selectedId}
      />
      </View>
    </ImageBackground>
  );
}

export default NumVerifyScreen;