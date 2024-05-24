export class Customer {
  id: number;
  name: string;
  lastname: string;
  phone: string;
  email: string;
  state: boolean;

  constructor(id: number, name: string, lastname: string, phone: string, email: string, state: boolean) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.phone = phone;
    this.email = email;
    this.state = state;
  }
}
