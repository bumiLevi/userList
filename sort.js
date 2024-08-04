import React, { useState} from 'react';
import {Modal, View, Text, Button, StyleSheet} from 'react-native';

const Sort = ({data,setData,start,end}) => {

  const [primarySortColumn, setPrimarySortColumn] = useState(NaN);
  const [secondarySortColumn, setSecondarySortColumn] = useState(NaN);
  const [tertiarySortColumn, setTertiarySortColumn] = useState(NaN);
  const [fourmarySortColumn, setfourmarySortColumn] = useState(NaN);
  const [fivemarySortColumn, setfivemarySortColumn] = useState(NaN);

  const mysort = () => {
    const sortedData = [...data].sort((a, b) => {
      console.log('primarySortColumn:', primarySortColumn);
        if(!isNaN(a[primarySortColumn])){
            if ((!isNaN(a[secondarySortColumn])) && (a[primarySortColumn] === b[primarySortColumn])) {
                if ((!isNaN(a[tertiarySortColumn])) && (a[secondarySortColumn] === b[secondarySortColumn])) {
                    if ((!isNaN(a[fourmarySortColumn])) && (a[tertiarySortColumn] === b[tertiarySortColumn])) {
                        if ((!isNaN(a[fivemarySortColumn])) && (a[fourmarySortColumn] === b[fourmarySortColumn])) {
                            return a[fivemarySortColumn].localeCompare(b[fivemarySortColumn]);
                        }
                        return a[fourmarySortColumn].localeCompare(b[fourmarySortColumn]);
                    }
                    return a[tertiarySortColumn].localeCompare(b[tertiarySortColumn]);
                }
                return a[secondarySortColumn].localeCompare(b[secondarySortColumn]);
            }
            console.log('primarySortColumn:', primarySortColumn);
            return a[primarySortColumn].localeCompare(b[primarySortColumn]);
    }});
    setData(sortedData);
    end()
  }

  const levels = [{level: 1, set: setPrimarySortColumn}, {level: 2, set: setSecondarySortColumn}, {level: 3,  set: setTertiarySortColumn}, {level: 4,  set: setfourmarySortColumn}, {level: 5,  set: setfivemarySortColumn}];

  return (
    <Modal visible={start}>
      <View style={styles.container}>
        {levels.map((level) => (
          <View key={level.level} style={styles.levelContainer}>
            <Text style={styles.levelTitle}>Level {level.level}</Text>
            <View style={styles.buttonRow}>
              <Button title="firstName" onPress={() => level.set('firstName')} />
              <Button title="lastName" onPress={() => level.set('lastName')} />
              <Button title="phoneNumber" onPress={() => level.set('phoneNumber')} />
              <Button title="email" onPress={() => level.set('email')} />
              <Button title="role" onPress={() => level.set('role')} />
            </View>
          </View>
        ))}
        <View style={styles.button}>
          <Button title="Sort" onPress={() => mysort()} color="#fff" />
        </View>
      </View>
    </Modal>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  levelContainer: {
    marginBottom: 0,
    alignItems: 'center',
  },
  levelTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 400,
  },
  button: {
    backgroundColor: '#6200ee',
    borderRadius: 25,
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    alignItems: 'center',
    margin: 20, 
  }
});


export default Sort;
