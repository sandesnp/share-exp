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
import Colors from '../../../utils/Colors';
import { useNavigation } from '@react-navigation/core';
import { TextInput } from 'react-native-paper';

const CreateJoinGroupView = () => {
  const navigation = useNavigation();
  const [createLoading, setCreateLoading] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  const handleCreateGroup = async () => {
    if (groupName.trim() === '') {
      Alert.alert('Error!', 'Group name cannot be empty');
    } else {
      // Simulate creating a group with static data
      console.log('Group created:', groupName);
      setCreateLoading(false); // Simulate completion of creating group
      navigation.goBack(); // Simulate navigating back after success
    }
  };

  const handleJoinGroup = async () => {
    if (inviteCode.trim() === '') {
      Alert.alert('Error!', 'Invite code cannot be empty');
    } else {
      // Simulate joining a group with static data
      console.log('Joined group with invite code:', inviteCode);
      setJoinLoading(false); // Simulate completion of joining group
      navigation.goBack(); // Simulate navigating back after success
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        padding: 14,
      }}
      keyboardShouldPersistTaps={'never'}
      showsVerticalScrollIndicator={false}
    >
      <TextInput
        style={styles.textInput}
        mode='outlined'
        textColor={'white'}
        placeholder='Enter Group Name'
        placeholderTextColor={Colors.DARK_GRAY}
        maxLength={64}
        outlineColor={Colors.DARK_GRAY}
        activeOutlineColor={Colors.TEAL}
        value={groupName}
        onChangeText={(name) => setGroupName(name)}
      />
      <TouchableOpacity
        style={styles.buttonSubmit}
        disabled={createLoading || joinLoading}
        onPress={() => handleCreateGroup()}
      >
        {createLoading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <Text style={styles.btnText}>Create a new group</Text>
        )}
      </TouchableOpacity>
      <View style={{ height: 50 }} />
      <TextInput
        style={styles.textInput}
        mode='outlined'
        textColor={'white'}
        placeholder='Enter Invite Code'
        placeholderTextColor={Colors.DARK_GRAY}
        maxLength={64}
        outlineColor={Colors.DARK_GRAY}
        activeOutlineColor={Colors.TEAL}
        value={inviteCode}
        onChangeText={(code) => setInviteCode(code)}
      />
      <TouchableOpacity
        style={styles.buttonSubmit}
        disabled={createLoading || joinLoading}
        onPress={() => handleJoinGroup()}
      >
        {joinLoading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <Text style={styles.btnText}>Join group</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateJoinGroupView;

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    borderRadius: 4,
    color: 'white',
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
