import apiClient from "./apiClient";

/**
 * Reusable REST API Model for CRUD operations
 * Simplifies common REST API patterns
 */
export class RestAPIModel {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  /**
   * GET - Fetch all items
   */
  async getAll() {
    const response = await apiClient.get(this.endpoint);
    return response.data;
  }

  /**
   * GET - Fetch single item by ID
   */
  async getById(id) {
    const response = await apiClient.get(`${this.endpoint}/${id}`);
    return response.data;
  }

  /**
   * POST - Create new item
   */
  async create(data) {
    const response = await apiClient.post(this.endpoint, data);
    return response.data;
  }

  /**
   * PUT - Update item by ID
   */
  async update(id, data) {
    const response = await apiClient.put(`${this.endpoint}/${id}`, data);
    return response.data;
  }

  /**
   * DELETE - Delete item by ID
   */
  async delete(id) {
    const response = await apiClient.delete(`${this.endpoint}/${id}`);
    return response.data;
  }

  /**
   * GET - Custom endpoint
   */
  async get(path) {
    const response = await apiClient.get(`${this.endpoint}${path}`);
    return response.data;
  }

  /**
   * POST - Custom endpoint
   */
  async post(path, data) {
    const response = await apiClient.post(`${this.endpoint}${path}`, data);
    return response.data;
  }
}

export default RestAPIModel;
