import { Entities } from './models/Entities';

export enum EntityActionTypes {
  INIT_ENTITIES_FROM_INDEXEDDB = 'INIT_ENTITIES_FROM_INDEXEDDB',
}

export interface InitEntitiesFromIndexedDb {
  type: EntityActionTypes.INIT_ENTITIES_FROM_INDEXEDDB;
  entities: Entities;
}

export type EntityAction = InitEntitiesFromIndexedDb;
