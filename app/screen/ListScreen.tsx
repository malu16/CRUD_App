import React, { useContext, useState } from 'react';
import { FlatList, View, Text, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import EditUserModal from '../components/EditUserModal';
import { UserContext } from '../context/UserContext';
import type { User } from '../types/User';

const ListScreen = ({ navigation }: any) => {
  const ctx = useContext(UserContext)!;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

if (!ctx) return null;

const {
  users,
  loading,
  deleteUser,
  addUser,
  updateUser,
  loadMore
} = ctx;

  if (loading) return <ActivityIndicator />;

  return (
    <View>
      <Button title="Add User" onPress={() => { setSelectedUser(undefined); setModalVisible(true); }} />
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMore}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('UserDetail', { user: item })}>
            <View style={{ padding: 10, borderBottomWidth: 1 , flexDirection: 'row'}}>
              <Text style={{ flex:1, color: '#000'}} >{item.name}</Text>
              <View style={{ flex:1, flexDirection:'row', justifyContent: 'space-evenly'}}>
                <Button title="Edit" onPress={() => { setSelectedUser(item); setModalVisible(true); }} />
                <Button title="Delete" onPress={() => deleteUser(item.id)} />
              </View>
              
            </View>
          </TouchableOpacity>
        )}
      />
      <EditUserModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        initialData={selectedUser}
        onSubmit={(data) => {
          selectedUser ? updateUser(data as User) : addUser(data as Omit<User, 'id'>);
          setModalVisible(false);
        }}
        isEdit={!!selectedUser}
      />
    </View>
  );
};

export default ListScreen;