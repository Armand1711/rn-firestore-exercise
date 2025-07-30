import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

type BucketListItem = {
  id: string;
  title: string;
  completed?: boolean;
  priority?: boolean;
    due?: string;
};

const ListScreen = () => {
  const navigation: any = useNavigation();
  const [items, setItems] = useState<BucketListItem[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'bucketList'), (snapshot) => {
      const newItems = snapshot.docs
        .map(doc => {
          const data = doc.data();
        
          if (typeof data.title === 'string') {
            return {
              id: doc.id,
              title: data.title,
              completed: data.completed,
              priority: data.priority,
              due: data.due,
            } as BucketListItem;
          }
          return null;
        })
        .filter((item): item is BucketListItem => item !== null);
      setItems(newItems);
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Add")}> 
          <Text style={styles.addButtonText}>Add</Text>
          <Entypo name="bucket" size={16} color="green" />
        </TouchableOpacity>

        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Details", { item })}
            >
              <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>{item.title}</Text>
              {item.priority && <AntDesign name="star" size={24} color="orange" />}
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  addButton: {
    backgroundColor: 'white',
    borderColor: 'green',
    borderWidth: 2,
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },
  addButtonText: {
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold'
  }
});