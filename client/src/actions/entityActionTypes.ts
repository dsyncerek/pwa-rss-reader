import { RootEntitiesType } from './rootTypes';

export enum EntityActionTypes {
  INIT_ENTITIES_FROM_INDEXEDDB = 'INIT_ENTITIES_FROM_INDEXEDDB',
}

export interface InitEntitiesFromIndexedDb {
  type: EntityActionTypes.INIT_ENTITIES_FROM_INDEXEDDB;
  entities: RootEntitiesType;
}

export type EntityAction = InitEntitiesFromIndexedDb;
