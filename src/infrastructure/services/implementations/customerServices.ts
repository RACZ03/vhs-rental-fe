import {
  CustomerRepository,
  CustomerService,
  ICustomer,
} from "../../../domain";

export class CustomerServiceImpl implements CustomerService {
  constructor(private customerRepository: CustomerRepository) {}
  async createCustomer(
    customerData: Omit<ICustomer, "id">
  ): Promise<ICustomer> {
    return this.customerRepository.createCustomer(customerData);
  }

  async deleteCustomer(id: number): Promise<void> {
    return this.customerRepository.deleteCustomer(id);
  }

  async getAllCustomers(): Promise<ICustomer[]> {
    return this.customerRepository.getAllCustomers();
  }

  async getCustomerById(id: number): Promise<ICustomer | null> {
    return this.customerRepository.getCustomerById(id);
  }

  async updateCustomer(customerData: ICustomer): Promise<ICustomer> {
    return this.customerRepository.updateCustomer(customerData);
  }
}
