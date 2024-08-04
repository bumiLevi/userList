import React, {useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import AddData from './addData.js'
import UpdateDete from './updeteDate.js'
import Sort from './sort.js'
import axios from 'axios';

//import { calculateResult } from './CalculatorFunctions'; 

function App() {
    
      const [data, setData] = useState([]); 
      const [currentPage, setCurrentPage] = useState(0); 
      const [modalVisible, setModalVisible] = useState(false);
      const [modalVisibleup, setModalVisibleup] = useState(false);
      const [modalVisibleso, setModalVisibleso] = useState(false);
      const [initialized, setInitialized] = useState(false);
      useEffect(() => {
        if (!initialized) {
        async function fetchData() {
          try {
            const response = await axios.get(`http://10.0.2.2:3000/users`);
            setData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      
        fetchData();
        setInitialized(true); 
      }
      }, []);
    

    const loadNextPage = () => {
      setCurrentPage(currentPage + 1);
    };
  
    const loadPreviousPage = () => {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };
  
   
    const handleDelete = async (item) => {
      try{
      const response = await
      axios.delete(`http://10.0.2.2:3000/users/${item.id}`)
      console.log('User deleted successfully:', response.data);
      }
      catch(error){
      console.error('Error deleting user:', error);
      };
      // So that we will also see it directly
      const newData = data.filter((da) => da !== item);
      setData(newData)
    };
    
     
      return (
        <View style={styles.container}>
          <View style={{ backgroundColor: 'white' ,borderTopWidth: 5}} />
          <Button title="sort" onPress={() => setModalVisibleso(true)} />
          <Sort data={data} setData={setData} start={modalVisibleso} end={() => setModalVisibleso(false)} />
          <View>
          {data.length > 0 ? (
             data.slice((currentPage*10),(currentPage*10 +9)).map((item) =>  (
              <View style={styles.row}>
                <Text style={styles.column}>{item. firstName}</Text>
                <Text style={styles.column}>{item. lastName}</Text>
                <Text style={styles.column}>{item. phoneNumber}</Text>
                <Text style={styles.column}>{item. email}</Text>
                <Text style={styles.column}>{item. role}</Text>
                <TouchableOpacity onPress={() => setModalVisibleup(true)}>
                <Text style={styles.button}>update</Text>
                </TouchableOpacity>
                <UpdateDete item={item} setData={setData} start={modalVisibleup} end={() => setModalVisibleup(false)} />  
                <TouchableOpacity onPress={() => handleDelete(item)}>
                <Text style={styles.button}>delete</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noDataMessage}>No data available for display.</Text>
          )}
          </View>
          <TouchableOpacity onPress={loadPreviousPage}>
            <Text style={styles.paginationButton}>Previous page</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={loadNextPage}>
            <Text style={styles.paginationButton}>Next page</Text>
          </TouchableOpacity>
          <Button title="Insert Row" onPress={() => setModalVisible(true)} />
          <AddData setData={setData} start={modalVisible} end={() => setModalVisible(false)} />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderTopWidth: 60, 
        borderBottomWidth: 60, 
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#008080',
      },
      column: {
        flex: 1,
        marginRight: 10,
        fontSize: 16,
      },
      button: {
        color: 'blue',
        fontSize: 14,
      },
      paginationButton: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
      },
      addButton: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
      },
    });
    
    //export default MyTable;
export default App;

