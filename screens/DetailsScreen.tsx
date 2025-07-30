import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const DetailsScreen = () => {
  const route = useRoute();
  const navigation: any = useNavigation();
  const { item }: any = route.params;

  const markCompleted = async () => {
    await updateDoc(doc(db, 'bucketList', item.id), { completed: true });
    navigation.goBack();
  };

  const deleteItem = () => {
    Alert.alert("Delete", "Are you sure you want to delete this?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          await deleteDoc(doc(db, 'bucketList', item.id));
          navigation.goBack();
        },
        style: "destructive"
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>Due: {item.due}</Text>
      <Text>Priority: {item.priority ? 'Yes' : 'No'}</Text>
      <Text>Status: {item.completed ? 'Completed ✅' : 'Pending ❌'}</Text>

      {!item.completed && (
        <Button
          title='Mark as Completed'
          color="green"
          onPress={markCompleted}
        />
      )}

      <Button
        title='Delete Item'
        color="red"
        onPress={deleteItem}
      />
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 20,
    gap: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});