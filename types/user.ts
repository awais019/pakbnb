export default interface User {
  objectID: string;
  joined: Date;
  name: string;
  email: string;
  image: string;
  reviewCount: number;
  description: string;
  homeId: string[];
}
