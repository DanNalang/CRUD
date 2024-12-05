import React, { useState } from 'react';
import {View,Text,TextInput,Button,FlatList,StyleSheet,TouchableOpacity,} from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const addUser = () => {
    if (name && lastName && age) {
      const newUser = { name, lastName, age };
      if (editingIndex !== null) {
        const updatedUsers = [...users];
        updatedUsers[editingIndex] = newUser;
        setUsers(updatedUsers);
        setEditingIndex(null);
      } else {
        setUsers([...users, newUser]);
      }
      clearInputs();
    }
  };

  const editUser = (index) => {
    const userToEdit = users[index];
    setName(userToEdit.name);
    setLastName(userToEdit.lastName);
    setAge(userToEdit.age.toString());
    setEditingIndex(index);
  };

  const deleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const clearInputs = () => {
    setName('');
    setLastName('');
    setAge('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native CRUD</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        keyboardType="numeric"
        onChangeText={setAge}
      />
      <Button title={editingIndex !== null ? 'Update User' : 'Add User'} onPress={addUser} />
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.userItem}>
            <Text>{`${item.name} ${item.lastName}, Age: ${item.age}`}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => editUser(index)} style={styles.editButton}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteUser(index)} style={styles.deleteButton}>
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  userItem: {
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
