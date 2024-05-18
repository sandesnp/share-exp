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
import ImageButton from '../../../components/buttons/ImageButton';
import { RefreshControl } from 'react-native-gesture-handler';

const TransactionDetailsView = () => {
  const [settle, setSettled] = useState(false);
  const currentUser = { name: 'Sandesh Shrestha', _id: '1' };
  const staticDetails = [
    { name: 'Sandesh Shrestha', userId: '1', amount: 10, paid: true },
    { name: 'Alice', userId: '2', amount: 20, paid: true },
    { name: 'Bob', userId: '3', amount: 15, paid: true },
  ];
  let totalAmount = 0;
  staticDetails.filter((participant) => {
    totalAmount += participant.amount;
  });
  const staticTransaction = {
    title: 'Dinner',
    totalAmount,
    creatorId: '1',
    participants: ['1', '2', '3'],
  };
  const staticCreator = { name: 'Sandesh Shrestha', _id: '1' }; // Assuming creator details are static

  const [details, setDetails] = useState(staticDetails);
  const [transaction, setTransaction] = useState(staticTransaction);
  const [creator, setCreator] = useState(staticCreator);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false); // State variable to control refresh state

  const onRefresh = () => {
    setRefresh(true); // Set refresh state to true on refresh action
    // Simulate data refresh here (e.g., fetch data again)
    console.log('Refreshing data...'); // Placeholder for actual data refresh logic
    setRefresh(false); // Set refresh state back to false after a short delay
  };

  let sum = 0.0;

  const logoutAlert = () => {
    Alert.alert(
      'Confirmation',
      'Do you want to delete this bill?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => console.log('Deleted!') }, // Simulate deletion
      ],
      { cancelable: true }
    );
  };

  if (transaction) {
    transaction.participants.map(
      (p) => (sum += details.find((d) => d.userId === p)?.amount || 0)
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        padding: 10,
      }}
      keyboardShouldPersistTaps={'never'}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={onRefresh}
          enabled={true}
        />
      }
    >
      {loading || !transaction || !creator ? (
        <ActivityIndicator color={Colors.NIGHT_GREEN} size={'small'} />
      ) : transaction && details.length > 0 ? (
        <>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: 'white',
                display: 'flex',
                flex: 0.75,
              }}
            >
              {transaction.title}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: 'white',
                display: 'flex',
                flex: 0.25,
                textAlign: 'right',
              }}
            >
              $ {transaction.totalAmount}
            </Text>
          </View>

          {creator._id === currentUser._id ? (
            <View
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                maxHeight: 30,
                marginTop: 10,
              }}
            >
              <ImageButton
                btnText={'delete'}
                handleFunction={() => logoutAlert()}
                color={Colors.NIGHT_RED}
                isLoading={false}
                size={24}
              />
            </View>
          ) : null}
          <View
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              maxHeight: 60,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color:
                  transaction.creatorId === currentUser._id
                    ? Colors.NIGHT_GREEN
                    : 'white',
                display: 'flex',
                flex: 1,
              }}
              numberOfLines={1}
            >
              {creator.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: 'white',
                display: 'flex',
                flex: 1,
                textAlign: 'left',
              }}
            >
              Outstanding To:
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: 'white',
                display: 'flex',
                flex: 0.25,
                textAlign: 'left',
              }}
            >
              Alice
            </Text>
          </View>
          {creator ? (
            <View
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                maxHeight: 60,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: 'white',
                  display: 'flex',
                  flex: 0.25,
                  textAlign: 'left',
                }}
              >
                $7.78
              </Text>

              <TouchableOpacity style={settle ? styles.btnGreen : styles.btn}>
                <Text
                  style={styles.btnText}
                  onPress={() => setSettled(!settle)}
                >
                  {settle ? 'Settled' : 'Settle'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={{ marginVertical: 20 }} />
          {details.map((it, index) => (
            <React.Fragment key={index}>
              <View
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  maxHeight: 75,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color:
                      it.userId === currentUser._id
                        ? Colors.NIGHT_GREEN
                        : 'white',
                    display: 'flex',
                    flex: 0.5,
                  }}
                  numberOfLines={1}
                >
                  {it.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color:
                      it.userId === currentUser._id
                        ? Colors.NIGHT_GREEN
                        : 'white',
                    display: 'flex',
                    flex: 0.25,
                    textAlign: 'left',
                  }}
                >
                  $ {it.amount}
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: it.paid ? Colors.NIGHT_GREEN : Colors.NIGHT_RED,
                    display: 'flex',
                    flex: 0.25,
                    textAlign: 'right',
                  }}
                >
                  {it.paid ? 'Paid' : 'Unpaid'}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: Colors.DARK_GRAY,
                  height: StyleSheet.hairlineWidth,
                }}
              />
            </React.Fragment>
          ))}
        </>
      ) : (
        <Text style={{ fontSize: 15, fontWeight: '500', color: Colors.BLUE }}>
          Please refresh...
        </Text>
      )}
    </ScrollView>
  );
};

export default TransactionDetailsView;

const styles = StyleSheet.create({
  btnText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  btn: {
    display: 'flex',
    flex: 0.25,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.NIGHT_RED,
    padding: 4,
    backgroundColor: Colors.NIGHT_RED,
  },
  btnGreen: {
    display: 'flex',
    flex: 0.25,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.NIGHT_GREEN,
    padding: 4,
    backgroundColor: Colors.NIGHT_GREEN,
  },
});
