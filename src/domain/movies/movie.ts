export class Movie {
  id: number;
  title: string;
  topic: string;
  year: number;
  summary: string;
  available: boolean;

  constructor(
    id: number,
    title: string,
    topic: string,
    year: number,
    summary: string,
    available: boolean
  ) {
    this.id = id;
    this.title = title;
    this.topic = topic;
    this.year = year;
    this.summary = summary;
    this.available = available;
  }
}
