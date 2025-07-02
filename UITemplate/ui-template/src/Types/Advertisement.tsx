export interface AdvertisementRealEstate {
  disposition: string;
  location: string;
  size: number;
}

export interface Advertisement {
  id: string;
  title: string;
  price: string;
  realEstate: AdvertisementRealEstate;
}
