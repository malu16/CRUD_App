import React, { useState, useEffect } from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
} from 'react-native';
import { User } from '../types/User';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (user: Omit<User, 'id'> | User) => void;
  initialData?: User;
  isEdit?: boolean;
}

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  keyboardType = 'default',
}: {
  label: string;
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}) => (
  <>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      placeholder={placeholder || label}
      value={value}
      onChangeText={onChange}
      style={styles.input}
      keyboardType={keyboardType}
      autoCapitalize="none"
    />
  </>
);

const EditUserModal: React.FC<Props> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
  isEdit,
}) => {
  const emptyForm: Omit<User, 'id'> = {
    name: '',
    username: '',
    email: '',
    address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
    phone: '',
    website: '',
    company: { name: '', catchPhrase: '', bs: '' },
  };

  const [form, setForm] = useState<Omit<User, 'id'>>(emptyForm);

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setForm(rest);
    } else {
      setForm(emptyForm);
    }
  }, [initialData, visible]);

  // Generic setter for nested fields using path as array
  const setNestedField = (path: (string | number)[], value: string) => {
    setForm((prev) => {
      const newForm = { ...prev };
      let current: any = newForm;

      for (let i = 0; i < path.length - 1; i++) {
        current[path[i]] = { ...current[path[i]] };
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;

      return newForm;
    });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{isEdit ? 'Edit' : 'Add'} User</Text>

        {/* Personal Info */}
        <Text style={styles.sectionTitle}>Personal Info</Text>
        <InputField
          label="Name"
          value={form.name}
          onChange={(text) => setNestedField(['name'], text)}
        />
        <InputField
          label="Username"
          value={form.username}
          onChange={(text) => setNestedField(['username'], text)}
        />
        <InputField
          label="Email"
          value={form.email}
          keyboardType="email-address"
          onChange={(text) => setNestedField(['email'], text)}
        />
        <InputField
          label="Phone"
          value={form.phone}
          keyboardType="phone-pad"
          onChange={(text) => setNestedField(['phone'], text)}
        />
        <InputField
          label="Website"
          value={form.website}
          onChange={(text) => setNestedField(['website'], text)}
        />

        {/* Address */}
        <Text style={styles.sectionTitle}>Address</Text>
        <InputField
          label="Street"
          value={form.address.street}
          onChange={(text) => setNestedField(['address', 'street'], text)}
        />
        <InputField
          label="Suite"
          value={form.address.suite}
          onChange={(text) => setNestedField(['address', 'suite'], text)}
        />
        <InputField
          label="City"
          value={form.address.city}
          onChange={(text) => setNestedField(['address', 'city'], text)}
        />
        <InputField
          label="Zipcode"
          value={form.address.zipcode}
          keyboardType="numeric"
          onChange={(text) => setNestedField(['address', 'zipcode'], text)}
        />

        {/* Geo */}
        <Text style={styles.subSectionTitle}>Geo Location</Text>
        <InputField
          label="Latitude"
          value={form.address.geo.lat}
          keyboardType="numeric"
          onChange={(text) => setNestedField(['address', 'geo', 'lat'], text)}
        />
        <InputField
          label="Longitude"
          value={form.address.geo.lng}
          keyboardType="numeric"
          onChange={(text) => setNestedField(['address', 'geo', 'lng'], text)}
        />

        {/* Company */}
        <Text style={styles.sectionTitle}>Company</Text>
        <InputField
          label="Company Name"
          value={form.company.name}
          onChange={(text) => setNestedField(['company', 'name'], text)}
        />
        <InputField
          label="Catch Phrase"
          value={form.company.catchPhrase}
          onChange={(text) => setNestedField(['company', 'catchPhrase'], text)}
        />
        <InputField
          label="BS"
          value={form.company.bs}
          onChange={(text) => setNestedField(['company', 'bs'], text)}
        />

        <View style={styles.buttonRow}>
          <Button
            title="Submit"
            onPress={() =>
              onSubmit(isEdit ? { ...initialData!, ...form } : form)
            }
          />
          <View style={{ width: 16 }} />
          <Button title="Cancel" onPress={onClose} color="#888" />
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 4,
    color: '#333',
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 8,
    paddingLeft: 4,
    color: '#555',
  },
  inputLabel: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 6,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
  },
});

export default EditUserModal;
