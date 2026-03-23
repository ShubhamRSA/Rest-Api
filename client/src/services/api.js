import RestAPIModel from "./apiModel";
import apiClient from "./apiClient";

// Initialize API models for each entity
const personAPI = new RestAPIModel("/person");
const carAPI = new RestAPIModel("/car");
const authAPI = new RestAPIModel("/auth");

// Auth APIs
export const registerUser = (userData) => authAPI.post("/register", userData);
export const loginUser = (credentials) => authAPI.post("/login", credentials);
export const getCurrentUser = () => apiClient.get("/auth/me");

// Person APIs
export const getPersons = () => personAPI.getAll();
export const getPerson = (id) => personAPI.getById(id);
export const createPerson = (personData) => personAPI.create(personData);
export const updatePerson = (id, personData) =>
  personAPI.update(id, personData);
export const deletePerson = (id) => personAPI.delete(id);

// Car APIs
export const getCars = () => carAPI.getAll();
export const getCar = (id) => carAPI.getById(id);
export const createCar = (carData) => carAPI.create(carData);
export const updateCar = (id, carData) => carAPI.update(id, carData);
export const deleteCar = (id) => carAPI.delete(id);

// Custom/Specialized API calls (if needed)
export const getCarsByPerson = (personId) => carAPI.get(`/person/${personId}`);

export default {
  personAPI,
  carAPI,
  authAPI,
};
