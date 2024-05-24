import { ITopic } from "../shared/types";

export abstract class TopicRepository {
  abstract createTopics(topicData: Omit<ITopic, "id">): Promise<ITopic>;
  abstract deleteTopics(id: number): Promise<void>;
  abstract getAllTopic(): Promise<ITopic[]>;
  abstract getTopicByIds(id: number): Promise<ITopic | null>;
  abstract updateTopics(topicData: ITopic): Promise<ITopic>;
}
