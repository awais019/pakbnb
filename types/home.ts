export default interface Home {
  objectID: string;
  images: string[];
  title: string;
  description: string;
  note: string;
  features: string[];
  pricePerNight: number;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  reviewValue: number;
  reviewCount: number;
  location:
    | string
    | {
        address: string;
        city: string;
        state: string;
        country: string;
      };
  _geoloc: {
    lat: number;
    lng: number;
  };
  availability: string[];
}
