export interface CollectionSearchEvent {
  readonly triggeredAt: Date;
  readonly searchText: string;
  readonly collectionId: string;
}
