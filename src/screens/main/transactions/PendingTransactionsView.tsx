import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../utils/Colors';
import { FlashList } from '@shopify/flash-list';
import TransactionItem from '../../../components/list-items/TransactionItem';
import NoResultsView from '../../../components/list-items/NoResultsView';

const PendingTransactionsView = () => {
  const [loading, setLoading] = useState(false);
  const [pendingTransactions, setPendingTransactions] = useState([
    // Replace this with your static data for pending transactions
    // Each item should be an object with the same structure as expected
    // by the TransactionItem component. Here's an example:
    {
      _id: '1',
      groupId: 'group1',
      creatorId: 'user1',
      title: 'Dinner',
      totalAmount: 50.0,
      participants: [
        { userId: 'user2', amount: 20.0, paid: false },
        { userId: 'user3', amount: 15.0, paid: true },
        { userId: 'user4', amount: 15.0, paid: false },
      ],
    },
    // You can add more transaction objects here
  ]);

  const onRefresh = () => {
    setLoading(true); // Simulate a refresh action
    setTimeout(() => {
      setLoading(false); // Stop the loading indicator
    }, 1000); // Simulate a delay for a network request
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10 }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: '700',
          color: 'white',
          paddingVertical: 15,
          alignItems: 'center',
        }}
      >
        Pending Payments
      </Text>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size={'small'}
          color={Colors.NIGHT_GREEN}
        />
      ) : (
        <FlashList
          data={pendingTransactions}
          keyExtractor={({ _id }) => _id}
          estimatedItemSize={75}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<NoResultsView type={1} />}
          removeClippedSubviews={false}
          renderItem={({ item }) => <TransactionItem item={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default PendingTransactionsView;
