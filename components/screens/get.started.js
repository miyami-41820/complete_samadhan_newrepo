import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fddbda',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    color: '#fff',
    backgroundColor: '#000',
    fontSize: 28,
    padding: 15,
    borderRadius: 40,
    marginTop: 10
  },
  LogoImage: {
    height: 305,
    width: 305
  }
});

function HomeScreen({ navigation }) {

  useEffect(() => {
    let _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('number');
        const admin = await AsyncStorage.getItem('admin');
        const userId = await AsyncStorage.getItem('userId');
        console.log(admin, typeof admin);
        if(admin === 'true') {
          navigation.navigate('Admin');
        }
        if (value !== null && userId !== null) {
          navigation.navigate('Services');
        }
      } catch (error) {
        console.log(error);
      }
    };
    _retrieveData();
 });

  return (
    <ImageBackground style={styles.container} source={require("../../assets/start_bck.png")}>
      <Image
          style={styles.LogoImage}
          source={require("../../assets/logo.png")}
        />
      <Text
        style={styles.startButton}
        title="Verify Numb"
        onPress={() => navigation.navigate('NumVerify')}
      >Get Started
      </Text>
    </ImageBackground>
  );
}

export default HomeScreen;