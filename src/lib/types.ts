export type Bedroom = {
  name: string;
  beds: string;
  photo?: string;
};

export type Host = {
  name: string;
  tags: string[];
};

export type ListingData = {
  sourceUrl: string;
  lastUpdated: string;
  title: string;
  locationText: string;
  summary: string;
  stats: {
    guests: number;
    bedrooms: number;
    beds: number;
    baths: number;
  };
  rating?: {
    value: number;
    reviewCount: number;
  };
  highlights: string[];
  descriptionBlocks: string[];
  houseRules: string[];
  bedrooms: Bedroom[];
  sharedAreas: string[];
  amenities: string[];
  host: Host;
  photos: string[];
};
