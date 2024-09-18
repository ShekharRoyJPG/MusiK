import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import {colors} from '../Constants/colors';
import {fontSize} from '../Constants/dimensions';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../Firebase/config';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [click, setClick] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter all fields');
      return;
    }
    // TODO: Add API call to register user
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.log(error);
      }
    }
    // Alert.alert('Success', 'login successful');
    setEmail('');
    setPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputView}>
        <Text style={styles.title}>MusiK</Text>
        <TextInput
          style={styles.input}
          placeholder="EMAIL OR USERNAME"
          placeholderTextColor={colors.textSecondary}
          value={email}
          onChangeText={value => setEmail(value)}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
          value={password}
          onChangeText={value => setPassword(value)}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.rememberView}>
        <View style={styles.switch}>
          <Switch
            value={click}
            onValueChange={setClick}
            trackColor={{true: 'green', false: 'gray'}}
          />
          <Text style={styles.rememberText}>Remember Me</Text>
        </View>
        <View>
          <Pressable onPress={() => Alert.alert('Forget Password!')}>
            <Text style={styles.forgetText}>Forgot Password?</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
      </View>

      <Text style={styles.optionsText}>OR LOGIN WITH</Text>
      <View style={styles.mediaIcons}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.freepik.com/256/15707/15707884.png',
          }}
          style={styles.icons}
        />
        <Image
          source={{
            uri: 'https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk4Mi1kNS0wOC5wbmc.png',
          }}
          style={styles.icons}
        />
        <Image
          source={{
            uri: 'https://cdn3.iconfinder.com/data/icons/inficons/512/linkedin.png',
          }}
          style={styles.icons}
        />
      </View>

      <Pressable onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.footerText}>
          Don't Have Account?<Text style={styles.signup}> Sign Up</Text>
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};
export default WelcomeScreen;

// import React, {useState} from'react';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // borderWidth: 2,
    // borderColor: 'gray',
  },
  image: {
    height: 160,
    width: 170,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: 'bold',
    // textTransform: 'uppercase',
    textAlign: 'center',
    paddingVertical: 40,
    color: 'red',
  },
  inputView: {
    flex: 2,
    gap: 15,
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 5,
    justifyContent: 'flex-end',
    // borderWidth: 2,
    // borderColor: 'gray',
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 7,
    color: colors.textPrimary,
  },
  rememberView: {
    // flex: 1,
    width: '100%',
    paddingTop: 50,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
    // borderWidth: 2,
    // borderColor: 'gray',
  },
  switch: {
    flexDirection: 'row',
    gap: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  forgetText: {
    fontSize: 11,
    color: 'red',
  },
  button: {
    backgroundColor: 'red',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonView: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 50,
    // borderWidth: 2,
    // borderColor: 'gray',
  },
  optionsText: {
    textAlign: 'center',
    paddingVertical: 10,
    color: 'gray',
    fontSize: 13,
    marginBottom: 6,
  },
  mediaIcons: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 23,
  },
  icons: {
    width: 40,
    height: 40,
  },
  footerText: {
    textAlign: 'center',
    color: 'gray',
    paddingBottom: 10,
  },
  signup: {
    color: 'red',
    fontSize: 13,
  },
});
