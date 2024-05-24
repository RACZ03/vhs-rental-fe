export class LoanMovie {
  id: number;
  date_loan: string;
  date_return: string;
  movie_id: string;
  movie_name: string;
  client_id: string;
  client_name: string;
  topic_id: string;
  topic_name: string;
  state: boolean;

  constructor(id: number, date_loan: string, date_return: string, movie_id: string, movie_name: string, client_id: string, client_name: string, topic_id: string, topic_name: string, state: boolean) {
    this.date_loan = date_loan;
    this.date_return = date_return;
    this.movie_id = movie_id;
    this.movie_name = movie_name;
    this.client_id = client_id;
    this.client_name = client_name;
    this.topic_id = topic_id;
    this.topic_name = topic_name;
    this.state = state;
  }
}
