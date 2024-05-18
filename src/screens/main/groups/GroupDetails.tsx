import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import TextButton from '../../../components/buttons/TextButton';
import Colors from '../../../utils/Colors';
import * as Clipboard from 'expo-clipboard';

const GroupDetails = () => {
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState({
    inviteCode: 'Join123NP', // Static invite code
  });

  const copyGroupInviteCode = async () => {
    if (group && group.inviteCode) {
      try {
        await Clipboard.setString(group.inviteCode);
        console.log('Copied to clipboard!');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  };

  return (
    <View style={{ display: 'flex', flex: 1, padding: 10 }}>
      {loading || !group ? (
        <ActivityIndicator color={Colors.NIGHT_GREEN} size={'small'} />
      ) : (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: '300', color: 'white', fontSize: 15 }}>
            Invite Code:{' '}
          </Text>
          <TextButton
            btnText={group.inviteCode}
            handleFunction={() => copyGroupInviteCode()}
            isDisabled={false}
          />
        </View>
      )}
    </View>
  );
};

export default GroupDetails;
