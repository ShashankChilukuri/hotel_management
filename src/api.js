import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Room-related API functions
export const fetchRooms = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/rooms`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching rooms');
  }
};

export const createRoom = async (roomData) => {
  try {
    const response = await axios.post(`${BASE_URL}/rooms`, roomData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating room');
  }
};



// Booking-related API functions
export const fetchBookings = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/bookings`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching bookings');
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${BASE_URL}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating booking');
  }
};

export const deleteBooking = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/bookings/${id}/cancel`);
    return response.data;
  } catch (error) {
    throw new Error('Error canceling booking');
  }
};

// Customer-related API functions
export const fetchCustomers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/customers`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching customers');
  }
};

export const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(`${BASE_URL}/customers`, customerData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating customer');
  }
};

// User-related API functions
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating user');
  }
};

