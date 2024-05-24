import axios from "../backend/vhs-rental-be-php";
import { Customer, CustomerRepository } from "../../domain/index";

export default class CustomerRepositoryImpl implements CustomerRepository {
  async createCustomer(customerData: Omit<Customer, "id">): Promise<Customer> {
    try {
      const response = await axios.post("/customers", customerData);
      return response.data;
    } catch (error) {
      throw new Error("Error al crear cliente");
    }
  }

  async getAllCustomers(): Promise<Customer[]> {
    try {
      const response = await axios.get("/customers");
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener clientes");
    }
  }

  async getCustomerById(id: number): Promise<Customer | null> {
    try {
      const response = await axios.get(`/customers/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener cliente por ID");
    }
  }

  async updateCustomer(customerData: Customer): Promise<Customer> {
    try {
      const response = await axios.put(
        `/customers/${customerData.id}`,
        customerData
      );
      return response.data;
    } catch (error) {
      throw new Error("Error al actualizar cliente");
    }
  }

  async deleteCustomer(id: number): Promise<void> {
    try {
      await axios.delete(`/customers/${id}`);
    } catch (error) {
      throw new Error("Error al eliminar cliente: ");
    }
  }
}
