import { ITopic } from "../shared/types";

export abstract class TopicService {
  abstract createTopic(topicData: Omit<ITopic, "id">): Promise<ITopic>;
  abstract deleteTopic(id: number): Promise<void>;
  abstract getAllTopics(): Promise<ITopic[]>;
  abstract getTopicById(id: number): Promise<ITopic | null>;
  abstract updateTopic(topicData: ITopic): Promise<ITopic>;
}
