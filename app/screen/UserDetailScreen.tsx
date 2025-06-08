import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { User } from '../types/User';
import EditUserModal from '../components/EditUserModal';
import { useUserContext } from '../context/UserContext';

interface Props {
  route: RouteProp<{ params: { user: User } }, 'params'>;
}

const UserDetailScreen: React.FC<Props> = ({ route }) => {
  const { user: initialUser } = route.params;
  const { users, updateUser } = useUserContext();
  const [modalVisible, setModalVisible] = useState(false);

  const user = users.find((u) => u.id === initialUser.id);
  if (!user) return <Text>User not found</Text>;

  const renderRow = (label: string, value: string | number, index: number) => (
    <View
      key={label}
      style={[styles.row, index % 2 === 0 ? styles.rowEven : styles.rowOdd]}
    >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  const personalData = [
    ['ID', user.id],
    ['Name', user.name],
    ['Username', user.username],
    ['Email', user.email],
    ['Phone', user.phone],
    ['Website', user.website],
  ];

  const addressData = [
    ['Street', user.address.street],
    ['Suite', user.address.suite],
    ['City', user.address.city],
    ['Zipcode', user.address.zipcode],
    ['Latitude', user.address.geo.lat],
    ['Longitude', user.address.geo.lng],
  ];

  const companyData = [
    ['Name', user.company.name],
    ['Catch Phrase', user.company.catchPhrase],
    ['BS', user.company.bs],
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.table}>
          <Text style={styles.sectionTitle}>Personal Info</Text>
          {personalData.map(([label, value], i) => renderRow(label, value, i))}
        </View>

        <View style={styles.table}>
          <Text style={styles.sectionTitle}>Address</Text>
          {addressData.map(([label, value], i) => renderRow(label, value, i))}
        </View>

        <View style={styles.table}>
          <Text style={styles.sectionTitle}>Company</Text>
          {companyData.map(([label, value], i) => renderRow(label, value, i))}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => setModalVisible(true)} />
      </View>

      <EditUserModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        initialData={user}
        onSubmit={(data) => {
          updateUser(data as User);
          setModalVisible(false);
        }}
        isEdit={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 4,
  },
  table: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  rowEven: {
    backgroundColor: '#ffffff',
  },
  rowOdd: {
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontWeight: '500',
    color: '#444',
    flex: 1,
  },
  value: {
    flex: 2,
    textAlign: 'right',
    color: '#111',
  },
  buttonContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
});

export default UserDetailScreen;