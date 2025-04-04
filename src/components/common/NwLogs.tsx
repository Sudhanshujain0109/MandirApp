import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import NetworkLogger from 'react-native-network-logger';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF3C2',
    padding: 5,
  },
});

const NWLogs = () => {
  const [isNWModalVisible, setNWModalVisibility] = useState(false);
  const toggleNWModal = () => setNWModalVisibility(!isNWModalVisible);

  return (
    <>
      <TouchableOpacity onPress={toggleNWModal} style={styles.container}>
        <Text>'Network Logs</Text>
      </TouchableOpacity>
      {isNWModalVisible ? <NetworkLogger /> : null}
    </>
  );

  return null;
};

export default NWLogs;
