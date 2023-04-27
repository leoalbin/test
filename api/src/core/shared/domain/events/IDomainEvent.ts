import { UniqueEntityID } from '../UniqueEntityId';

export type EventName = string;

export interface IDomainEvent {
  dateTimeOccurred: Date;
  aggregateId: UniqueEntityID;
  name: EventName;
}
