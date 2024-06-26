import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Colors from '../../utils/Colors';
import { ParamListBase, useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

interface LoginProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const LoginScreen = ({ navigation }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigateToRegisterScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'RegisterScreen' }],
    });
  };

  const handleSignIn = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Input is empty', 'Please enter correct details!');
    } else if (password.trim().length < 8) {
      Alert.alert('Invalid password', 'Password must be atleast 8 characters!');
    } else {
      setLoading(true);
      try {
        const users = [
          {
            email: 'Sandesh@yahoo.com',
            password: 'sandesh123',
            name: 'Sandesh Shrestha',
          },
          {
            email: 'user2@example.com',
            password: 'password2',
            name: 'Jane Doe',
          },
        ];
        const foundUser = users.find(
          (user) => user.email === email && user.password === password
        );
        if (foundUser) {
          await AsyncStorage.setItem('user', JSON.stringify(foundUser));
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainRoute' }],
          });
        } else {
          Alert.alert('Login failed', 'Invalid email or password');
        }
      } catch (e) {
        console.error('Login error:', e);
        Alert.alert('Error!', 'Cannot sign in');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.DARK,
        paddingHorizontal: 15,
      }}
      keyboardShouldPersistTaps={'never'}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 0.2, justifyContent: 'center' }}>
        <Text style={{ fontSize: 40, fontWeight: '700', color: 'white' }}>
          Welcome back!
        </Text>
      </View>
      <View
        style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}
      >
        <TextInput
          style={styles.textInput}
          mode='outlined'
          textColor={'white'}
          placeholder='Enter Email'
          placeholderTextColor={Colors.DARK_GRAY}
          keyboardType='email-address'
          outlineColor={Colors.DARK_GRAY}
          activeOutlineColor={Colors.TEAL}
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <View style={styles.innerMargin} />
        <TextInput
          style={styles.textInput}
          mode='outlined'
          textColor={'white'}
          placeholder='Set Password'
          placeholderTextColor={Colors.DARK_GRAY}
          secureTextEntry
          maxLength={24}
          outlineColor={Colors.DARK_GRAY}
          activeOutlineColor={Colors.TEAL}
          selectionColor={Colors.WHITISH}
          theme={{ colors: { text: 'white' } }}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity
          style={styles.buttonSubmit}
          disabled={loading}
          onPress={() => handleSignIn()}
        >
          {loading ? (
            <ActivityIndicator color={'white'} />
          ) : (
            <Text style={styles.btnText}>Sign In</Text>
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: Colors.DARK_GRAY }}>Don't have an account</Text>
        <TouchableOpacity
          onPress={() =>
            requestAnimationFrame(() => {
              navigation.navigate('RegisterScreen');
            })
          }
        >
          <Text
            style={{ marginStart: 4, color: Colors.BLUE, fontWeight: '500' }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: Colors.DARK,
    color: 'white',
  },
  innerMargin: {
    height: 20,
  },
  buttonSubmit: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.TEAL,
    borderRadius: 4,
    elevation: 4,
    marginTop: 30,
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
