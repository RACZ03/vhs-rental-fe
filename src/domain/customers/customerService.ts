import { ICustomer } from "../shared/types";

export abstract class  CustomerService {
    abstract createCustomer(customerData: Omit<ICustomer, 'id'>): Promise<ICustomer>;
    abstract deleteCustomer(id: number): Promise<void>;
    abstract getAllCustomers(): Promise<ICustomer[]>;
    abstract getCustomerById(id: number): Promise<ICustomer | null>;
    abstract updateCustomer(customerData: ICustomer): Promise<ICustomer>;
  }