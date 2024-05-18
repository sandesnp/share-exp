import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import TransactionItem from '../../../components/list-items/TransactionItem';
import Colors from '../../../utils/Colors';
import NoResultsView from '../../../components/list-items/NoResultsView';

const GroupTransactions = () => {
  const [loading, setLoading] = useState(false);
  const [groupTransactions, setGroupTransactions] = useState([
    {
      _id: '1',
      name: 'Sandesh',
      amount: 100,
      category: 'Food',
      date: '2024-05-13',
      isPaid: true,
      groupId: '',
      creatorId: '',
      title: '',
      totalAmount: 0,
      participants: [],
      createdAt: '',
    },
  ]);

  return (
    <SafeAreaView style={{ display: 'flex', flex: 1 }}>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size={'small'}
          color={Colors.NIGHT_GREEN}
        />
      ) : (
        <FlashList
          contentContainerStyle={{ padding: 10 }}
          data={groupTransactions}
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

export default GroupTransactions;
