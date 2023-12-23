import { LocationInterface } from './location.interface';

export interface AddressInterface {
  city: string;
  county: string;
  streetAddress: string;
  location: LocationInterface | null;
  distance: number | null;
}
