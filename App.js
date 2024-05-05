import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GetStartedScreen from './components/screens/get.started';
import NumVerifyScreen from './components/screens/number.verification';
import OtpVerifyScreen from './components/screens/otp.verification';
import AddProfileScreen from './components/screens/add.profile.data';
import MyProfileScreen from './components/screens/my.profile';
import ServicesScreen from './components/screens/services';
import AdminScreen from './components/screens/manage.request';
import SubscriptionScreen from './components/screens/subscription';
import UserServiceDetails from './components/screens/service.details.user';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen
          name="Home"
          component = {GetStartedScreen}
          // options={{ title: 'Overview' }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="NumVerify" component={NumVerifyScreen} />
        <Stack.Screen name="OTPVerify" component={OtpVerifyScreen} />
        <Stack.Screen name="AddProfile" component={AddProfileScreen} />
        <Stack.Screen name="MyProfile" component={MyProfileScreen} />
        <Stack.Screen name="Services" component={ServicesScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="Subscription" component={SubscriptionScreen} />
        <Stack.Screen name="requestedServices" component={UserServiceDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
