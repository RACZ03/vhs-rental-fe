export interface IMovie {
  id: number;
  title: string;
  topic_id: number;
  year: number;
  summary: string;
  available: number | string;
}

export interface ICustomer {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface ITopic {
  id: number;
  name_topic: string;
  state: number;
}
