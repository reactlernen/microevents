export interface EventResponse {
  id: number;
  title: string;
  shortDescription: string;
  eventDate: any;
  pictureUrl: string;
  organizerId: number;
  participantIds: number[];
}
