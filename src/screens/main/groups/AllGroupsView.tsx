import React, { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import GroupItem from '../../../components/list-items/GroupItem';
import { Entypo } from '@expo/vector-icons';
import { ParamListBase, useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlashList } from '@shopify/flash-list';
import Colors from '../../../utils/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NoResultsView from '../../../components/list-items/NoResultsView';
import ItemSeparator from '../../../components/list-items/ItemSeparator';

interface Group {
  _id: string;
  name: string;
}

const AllGroupsView = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const insets = useSafeAreaInsets();
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [groups] = useState<Group[]>([
    { _id: 'group1', name: 'Family Group' },
    { _id: 'group2', name: 'Flatmates' },
    { _id: 'group3', name: 'Work Colleagues' },
    // You can add more groups here
  ]);

  const onRefresh = () => {
    setRefresh(true); // Simulate a refresh action
    setTimeout(() => {
      setRefresh(false);
    }, 1000); // Simulate a delay for network request
  };

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        paddingTop: insets.top,
        flexDirection: 'column',
        paddingHorizontal: 14,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: '700', color: 'white' }}>
          Groups
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateJoinGroupView')}
        >
          <Entypo name='dots-three-horizontal' size={20} color='white' />
        </TouchableOpacity>
      </View>
      <View style={{ height: 14 }} />
      {loading ? (
        <ActivityIndicator size={'small'} color={Colors.NIGHT_GREEN} />
      ) : (
        <FlashList
          data={groups}
          estimatedItemSize={75}
          keyExtractor={(_id) => '_id'}
          refreshing={refresh}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<NoResultsView type={2} />}
          ItemSeparatorComponent={() => <ItemSeparator />}
          removeClippedSubviews={false}
          renderItem={({ item }) => <GroupItem item={item} />}
        />
      )}
    </View>
  );
};

export default AllGroupsView;
