import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LoginPage } from './src/pages/sv-login/LoginPage';
import 'bootstrap/dist/css/bootstrap.css'
import { ChatPage } from './src/pages/sv-app/ChatPage';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <LoginPage/> */}
      <ChatPage/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
