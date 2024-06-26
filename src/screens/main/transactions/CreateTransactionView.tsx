import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../utils/Colors';
import TextButton from '../../../components/buttons/TextButton';
import { TextInput } from 'react-native-paper';
import NoResultsView from '../../../components/list-items/NoResultsView';
import TransactionMemberItem from '../../../components/list-items/TransactionMemberItem';
import { Toast } from 'toastify-react-native';
import { useNavigation } from '@react-navigation/native';
import ItemSeparator from '../../../components/list-items/ItemSeparator';

const CreateTransactionView = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [participants, setParticipants] = useState([
    { _id: '1', name: 'Sandesh Shrestha', amount: 10, paid: false },
    { _id: '2', name: 'Alice', amount: 20, paid: false },
    { _id: '3', name: 'Bob', amount: 15, paid: false },
  ]);
  const [loading, setLoading] = useState(false);

  const createTransaction = async () => {
    let sum = 0.0;
    participants.map((p) => (sum += p.amount));

    if (title.trim() === '') {
      Alert.alert('Error!', 'Please enter name of the bill');
    } else if (participants.some((participant) => participant.amount < 0)) {
      Alert.alert('Error!', 'Please enter correct amount');
    } else if (sum > 45) {
      // Total amount (replace with your static total amount)
      Alert.alert(
        'Error!',
        'Sum of participant amounts cannot be greater than total amount'
      );
    } else {
      setLoading(true); // Simulate processing
      console.log('Creating transaction (static data):', {
        title,
        participants,
      });
      // Simulate success
      Toast.success('New bill created');
      setLoading(false);
      // You can navigate back here if needed
    }
  };

  return (
    <View style={{ display: 'flex', flex: 1 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 0.1,
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{ flex: 0.2 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name='chevron-back-sharp' size={34} color={Colors.TEAL} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: 'white',
            textAlign: 'center',
            flex: 0.6,
          }}
        >
          Split Bill
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 0.2,
          }}
        >
          {loading ? (
            <ActivityIndicator size={'small'} color={Colors.BLUE} />
          ) : (
            <TextButton
              btnText={'Save'}
              isDisabled={title.trim() === ''}
              handleFunction={() => createTransaction()}
            />
          )}
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 0.1,
          alignItems: 'center',
          paddingHorizontal: 8,
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        <TextInput
          style={styles.textInput}
          dense={true}
          mode='outlined'
          textColor={'white'}
          keyboardType={'twitter'}
          placeholder='Title'
          placeholderTextColor={Colors.DARK_GRAY}
          maxLength={128}
          outlineColor={Colors.DARK_GRAY}
          activeOutlineColor={Colors.TEAL}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: 'white',
            textAlign: 'center',
            flex: 0.35,
          }}
        >
          $45.00 {/* Replace with your static total amount */}
        </Text>
      </View>
      <FlatList
        style={{ flex: 0.8 }}
        data={participants}
        keyExtractor={({ _id }) => _id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<NoResultsView type={3} />}
        ItemSeparatorComponent={ItemSeparator}
        initialNumToRender={20}
        removeClippedSubviews={false}
        renderItem={({ item }) => (
          <TransactionMemberItem
            item={item}
            participants={participants}
            setParticipants={setParticipants}
          />
        )}
      />
    </View>
  );
};

export default CreateTransactionView;

const styles = StyleSheet.create({
  textInput: {
    flex: 0.65,
    borderRadius: 4,
    backgroundColor: Colors.DARK,
    color: 'white',
  },
});
