import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import MemberItem from '../../../components/list-items/MemberItem';
import Colors from '../../../utils/Colors';
import ItemSeparator from '../../../components/list-items/ItemSeparator';
import NoResultsView from '../../../components/list-items/NoResultsView';
import { FlashList } from '@shopify/flash-list';

const GroupMembers = () => {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([
    { _id: '1', name: 'John Doe', avatar: 'https://via.placeholder.com/150' },
    { _id: '2', name: 'Jane Smith', avatar: 'https://via.placeholder.com/150' },
    {
      _id: '3',
      name: 'Michael Brown',
      avatar: 'https://via.placeholder.com/150',
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
        <>
          <ItemSeparator />
          <FlashList
            data={members}
            keyExtractor={({ _id }) => _id}
            estimatedItemSize={75}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<NoResultsView type={3} />}
            ItemSeparatorComponent={ItemSeparator}
            removeClippedSubviews={false}
            renderItem={({ item }) => <MemberItem item={item} />}
          />
        </>
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => console.log('Navigate to Transaction Route')} // Simulate navigation
      >
        <Feather name='plus' size={26} color='#FFF' />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default GroupMembers;

const styles = StyleSheet.create({
  fab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 63,
    height: 63,
    position: 'absolute',
    bottom: 40,
    right: 28,
    backgroundColor: Colors.BLUE,
    borderRadius: 100,
    elevation: 2,
  },
});
