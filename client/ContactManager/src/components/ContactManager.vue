<template>
  <h1>Contact Manager</h1>
  <div>
    <div>
      <input type="text" v-model="searchQuery" :class="searchBar" placeholder="Search contacts by name" />
    </div>
    <form @submit.prevent="isEditing ? updateContact() : addContact()">
      <input type="text" v-model="contact.name" placeholder="Name" required />
      <input type="email" v-model="contact.email" placeholder="Email" required />
      <input type="text" v-model="contact.phone" placeholder="Phone" required />
      <button type="submit" :class="addBtn">{{ isEditing ? 'Update' : 'Add' }} Contact</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in filteredContacts" :key="contact._id">
          <td>{{ contact.name }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.phone }}</td>
          <td>
            <button @click="editContact(contact)">Edit</button>
            <button @click="deleteContact(contact._id)" :class="delBtn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';

const contacts = ref([])
const contact = ref({ name: '', email: '', phone: '' })
const isEditing = ref(false)
const editingContactId = ref(null)
const delBtn = ref('delBtn')
const addBtn = ref('addBtn')
const searchBar = ref('searchBar')
const searchQuery = ref('')

const filteredContacts = computed(() => {
  return contacts.value.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

async function fetchContacts() {
  try {
    const response = await axios.get('https://contactmanager1-t5jh.onrender.com/api/contacts');
    contacts.value = response.data;
    sortByName();
  } catch (error) {
    console.error('Error fetching contacts:', error);
  }
}

function sortByName(){
  contacts.value.sort((a, b) => a.name.localeCompare(b.name));
}

async function addContact() {
  try {
    const response = await axios.post('api/contacts/add', contact.value);
    contacts.value.push(response.data);
    resetForm();
    sortByName();
  } catch (error) {
    console.error('Error adding contact:', error);
  }
}

async function deleteContact(id) {
  try {
    await axios.delete(`api/contacts/delete/${id}`);
    contacts.value = contacts.value.filter(contact => contact._id !== id);
  } catch (error) {
    console.error('Error deleting contact:', error);
  }
}

function editContact(contactToEdit) {
  isEditing.value = true;
  editingContactId.value = contactToEdit._id;
  contact.value = { ...contactToEdit };
}

async function updateContact() {
  try {
    const response = await axios.put(`api/contacts/edit/${editingContactId.value}`, contact.value);
    const index = contacts.value.findIndex(contact => contact._id === editingContactId.value);
    contacts.value.splice(index, 1, response.data);
    resetForm();
  } catch (error) {
    console.error('Error updating contact:', error);
  }
}

function resetForm() {
  contact.value = { name: '', email: '', phone: '' };
  isEditing.value = false;
  editingContactId.value = null;
}

onMounted(() => {
  fetchContacts();
});
</script>

<style scoped>
form {
  margin-bottom: 30px;
  text-align: center;
}

input {
  margin-right: 10px;
  padding: 10px;
}

input:focus {
  border: 3px solid #555;
  background-color: lightgrey;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

button {
  background-color: #008CBA;
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.delBtn {
  background-color: #f44336;
}

.addBtn{
  background-color: #555555;;
}

h1{
  margin: 20px 0px 50px 0px;
}

.searchBar{
  width:60%;
  margin: 20px;
}
</style>