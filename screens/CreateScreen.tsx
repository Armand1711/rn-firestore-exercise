import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const CreateScreen = () => {
  const navigation: any = useNavigation();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(false);
  const [due, setDue] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async () => {
    try {
      await addDoc(collection(db, 'bucketList'), {
        title,
        due,
        description,
        priority,
        completed: false,
        createdAt: Timestamp.now(),
      });
      alert("Item added successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          style={styles.inputField}
          placeholder="Bucket List Title"
          onChangeText={setTitle}
          value={title}
        />

        <TextInput
          style={styles.inputField}
          placeholder="When do you want it done?"
          onChangeText={setDue}
          value={due}
        />

        <TextInput
          multiline
          numberOfLines={4}
          style={styles.inputField}
          placeholder="Description of bucket list"
          onChangeText={setDescription}
          value={description}
        />

        <View style={styles.switchRow}>
          <Switch
            trackColor={{ false: 'black', true: 'green' }}
            thumbColor={priority ? 'yellow' : 'white'}
            onValueChange={setPriority}
            value={priority}
          />
          <Text style={styles.label}>Priority?</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Create Bucket List Item</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  inputField: {
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 15,
    padding: 10
  },
  button: {
    backgroundColor: "green",
    padding: 15,
    marginTop: 30
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  switchRow: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  label: {
    fontSize: 16
  }
});