interface Features {
  id: string;
  type: string;
  place_name: string;
  center: number[];
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    wikidata: string;
  };
  context: {
    id: string;
    short_code: string;
    wikidata: string;
  }[];
}

export default interface Places {
  features: Features[];
}
