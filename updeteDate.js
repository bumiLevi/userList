import React, { useState } from 'react';
import {StyleSheet, Text, Modal, TextInput, View, Button} from 'react-native';
import MyComponent from './roleData.js'
import axios from 'axios';

const UpdateDete =  ({item, setData,start,end}) => {
    const[firstName, setfirstName] = useState (item.firstName);
    const[lastName, setlastName] = useState (item.lastName);
    const[phoneNumber, setphoneNumber] = useState (item.phoneNumber);
    const[email, setemail] = useState (item.email);
    const[role, setrole] = useState (item.role);
    const[integrityF, setintegrityF] = useState (true);
    const[integrityL, setintegrityL] = useState (true);
    const[integrityP, setintegrityP] = useState (true);
    const[integrityE, setintegrityE] = useState (true);
    const[integrityR, setintegrityR] = useState (true);

    //Checks for exactly 10 digits
    const checksPhone = /^0\d{9} $/;
    //Checks to have a maximum of 10 letters
    const checksName = /^[a-zA-Z]{1,10}$/;
    //Checks that there is a name, and domain 
    const emailChecks = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,} $/;

    const startup = () => {
      setfirstName(item.firstName);
      setlastName(item.lastName);
      setphoneNumber(item.phoneNumber);
      setemail(item.email);
      setrole(item.role);
      setintegrityF(true);
      setintegrityL(true);
      setintegrityP(true);
      setintegrityE(true);
      setintegrityR(true);
    };

    const ntegrityFirstName = (text) => {
        if (checksName.test(text)){
            setfirstName(text);
            setintegrityF(true);
        }
        else{
            setfirstName('Error The value you entered is invalid');
            setintegrityF(false);
        }
    }

    const ntegrityLastName = (text) => {
            if (checksName.test(text)){
                setlastName(text);
                setintegrityL(true);
            }
            else{
                setlastName('Error The value you entered is invalid');
                setintegrityL(false);
            }
    }

    const ntegrityPhoneNumber = (text) => {
      setphoneNumber(text);
      if (text && (text.endsWith(' '))){
        if (checksPhone.test(text)){
            setintegrityP(true);
        }
        else{
            setphoneNumber('Error The value you entered is invalid');
            setintegrityP(false);
        }
    }}

    const ntegrityEmail = (text) => {
      setemail(text);
      if (text && (text.endsWith(' '))){
        if (emailChecks.test(text)){
            setintegrityE(true);
        }
        else{
            setemail('Error The value you entered is invalid');
            setintegrityE(false);
        }}
    } 

    const addNewRow = async (item, firstName, lastName, phoneNumber, email ,role) => {
       if (integrityF && integrityL && integrityP && integrityE && integrityR){
        const newRow = {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
          role: role,
        }
        try{
        const response = await
        axios.put(`http://10.0.2.2:3000/users/${item.id}`, newRow)
        setData(prevData => {
              const rowIndex = prevData.findIndex(row => row.includes(item.firstName));
              const newData = [...prevData];
              newData[rowIndex] = newRow;
              return newData;
            })//So that we will also see it directly
        }
        catch(error) {
          console.error('Error upDate data:', error);
        };
        end();
        }
    }
      

      return (
        <Modal visible={start}>
          <View style={styles.container}>
          <Text>Please, after inserting the enamel and phone number at the end of the field, add the space character</Text>
            <TextInput
              style={styles.input}
              placeholder="first name"
              value={firstName}
              onChangeText={ntegrityFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="last name"
              value={lastName}
              onChangeText={ntegrityLastName}
            />
            <TextInput
              style={styles.input}
              placeholder="phone number"
              value={phoneNumber}
              onChangeText={ntegrityPhoneNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="email"
              value={email}
              onChangeText={ntegrityEmail}
            />
            <MyComponent  setrole = {setrole} setintegrityR = {setintegrityR}/>
            <Button title="save" onPress={() => addNewRow(item, firstName, lastName, phoneNumber, email, role)} />
          </View>
        </Modal>
      );
    }
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          backgroundColor: '#f9f9f9',
        },
        input: {
          width: '100%',
          height: 40,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          paddingHorizontal: 10,
          marginBottom: 10,
        },
        button: {
          backgroundColor: '#008080',
          color: 'white',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          textAlign: 'center',
        },
      });

export default UpdateDete;