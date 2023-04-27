import { IAggregateRoot } from '../IAggregateRoot';
import { IDomainEvent } from './IDomainEvent';
import { UniqueEntityID } from '../UniqueEntityId';

// eslint-disable-next-line func-names
export const DomainEvents = (function () {
  let handlersMap = {};
  let markedAggregates: IAggregateRoot[] = [];

  /**
   * @method markAggregateForDispatch
   * @desc Called by aggregate root objects that have created domain
   * events to eventually be dispatched when the infrastructure commits
   * the unit of work.
   */

  function markAggregateForDispatch(aggregate: IAggregateRoot): void {
    const aggregateFound = !!findMarkedAggregateByID(aggregate.id);

    if (!aggregateFound) {
      markedAggregates.push(aggregate);
    }
  }

  function dispatchAggregateEvents(aggregate: IAggregateRoot): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) => dispatch(event));
  }

  function removeAggregateFromMarkedDispatchList(aggregate: IAggregateRoot): void {
    const index = markedAggregates.findIndex((a) => a.equals(aggregate));
    markedAggregates.splice(index, 1);
  }

  function findMarkedAggregateByID(id: UniqueEntityID): IAggregateRoot {
    let found: IAggregateRoot = null;
    // eslint-disable-next-line no-restricted-syntax
    for (const aggregate of markedAggregates) {
      if (aggregate.id.equals(id)) {
        found = aggregate;
      }
    }

    return found;
  }

  function dispatchEventsForAggregate(id: UniqueEntityID): void {
    const aggregate = findMarkedAggregateByID(id);
    if (aggregate) {
      dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  function register(callback: (event: IDomainEvent) => void, eventName: string): void {
    // eslint-disable-next-line no-prototype-builtins
    if (!handlersMap.hasOwnProperty(eventName)) {
      handlersMap[eventName] = [];
    }
    handlersMap[eventName].push(callback);
  }

  function clearHandlers(): void {
    handlersMap = {};
  }

  function clearMarkedAggregates(): void {
    markedAggregates = [];
  }

  function dispatch(event: IDomainEvent): void {
    const eventClassName: string = event.name;

    // eslint-disable-next-line no-prototype-builtins
    if (handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = handlersMap[eventClassName];
      // eslint-disable-next-line no-restricted-syntax
      for (const handler of handlers) {
        handler(event);
      }
    }
  }

  return {
    markAggregateForDispatch,
    dispatchEventsForAggregate,
    register,
    clearHandlers,
    clearMarkedAggregates,
  };
})();
