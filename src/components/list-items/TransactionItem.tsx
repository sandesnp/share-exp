import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../utils/Colors';
import ViewMoreText from 'react-native-view-more-text';
import { ParamListBase, useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

interface TransactionItemProps {
  item: {
    _id: string;
    groupId: string;
    creatorId: string;
    title: string;
    totalAmount: number;
    participants: { userId: string; amount: number; paid: boolean }[];
    createdAt?: string; // Assuming createdAt is a string representation of the date
  };
}

const TransactionItem = ({ item }: TransactionItemProps) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [currentUser] = useState({ _id: '1', name: 'Sandesh Shrestha' }); // Replace with your static current user data
  const [group] = useState({ name: 'Food Stuff' }); // Replace with your static group data (if applicable)
  const [participantNames] = useState([
    'Alice',
    'Bob', // Replace with names of participants
  ]);
  const [creator] = useState({ name: 'Alice' }); // Replace with name of creator

  const renderViewMore = (onPress) => (
    <Text style={{ color: Colors.BLUE }} onPress={onPress}>
      View more
    </Text>
  );
  const renderViewLess = (onPress) => (
    <Text style={{ color: Colors.BLUE }} onPress={onPress}>
      View less
    </Text>
  );
  const date: Date = new Date(); // Create a Date instance
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  const formattedDate: string = date.toLocaleDateString('en-GB', options); // 'en-GB' for day-month-year format

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        minHeight: 128,
        backgroundColor: Colors.DARK,
        marginBottom: 14,
        borderRadius: 8,
        elevation: 4,
        display: 'flex',
        padding: 12,
      }}
      onPress={() =>
        requestAnimationFrame(() => {
          navigation.navigate('TransactionDetailsView', {
            transactionId: item._id,
            currentUser: currentUser,
          });
        })
      }
    >
      {item && currentUser && creator ? (
        <>
          <View
            style={{
              display: 'flex',
              flex: 1,
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
              numberOfLines={3}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: 'white',
                display: 'flex',
                flex: 0.25,
                textAlign: 'right',
              }}
            >
              $ {item.totalAmount}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}
          >
            <Text style={{ fontWeight: '300', color: 'white', fontSize: 15 }}>
              Created by{' '}
            </Text>
            <Text
              style={{
                fontWeight: currentUser._id === item.creatorId ? '500' : '400',
                color:
                  currentUser._id === item.creatorId
                    ? Colors.NIGHT_GREEN
                    : 'white',
                fontSize: 15,
              }}
            >
              {currentUser._id === item.creatorId ? 'You' : creator.name}{' '}
            </Text>
            <Text style={{ fontWeight: '300', color: 'white', fontSize: 15 }}>
              on{' '}
            </Text>
            <Text style={{ fontWeight: '300', color: 'white', fontSize: 15 }}>
              {formattedDate}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: '300', color: 'white', fontSize: 15 }}>
              Group:{' '}
            </Text>
            <Text style={{ fontWeight: '500', color: 'white', fontSize: 15 }}>
              {group ? group.name : ''}
            </Text>
          </View>
          <Text style={{ fontWeight: '300', color: 'white', fontSize: 15 }}>
            Bill split among:
          </Text>
          <ViewMoreText
            numberOfLines={3}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}
          >
            <Text style={{ fontWeight: '400', color: 'white', fontSize: 15 }}>
              {participantNames.join(', ')}
            </Text>
          </ViewMoreText>
          {item.participants.some((p) => p.userId === currentUser._id) ? (
            <Text
              style={{
                fontWeight: '400',
                color: Colors.NIGHT_GREEN,
                fontSize: 15,
                marginTop: 14,
              }}
            >
              You are included in this bill
            </Text>
          ) : null}
        </>
      ) : (
        <Text style={{ fontSize: 15, fontWeight: '500', color: Colors.BLUE }}>
          Loading...
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default TransactionItem;
