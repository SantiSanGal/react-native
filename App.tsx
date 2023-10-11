// import 'bootstrap/dist/css/bootstrap.css'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginPage } from './src/pages/sv-login/LoginPage';
import { ChatPage } from './src/pages/sv-app/ChatPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        >
        <Stack.Screen name="login" component={LoginPage} />
        <Stack.Screen name="chat" component={ChatPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
