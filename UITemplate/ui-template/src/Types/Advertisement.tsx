export interface AdvertisementAddress {
  street: string;
  city: string;
  postalCode: string;
}

export interface AdvertisementRealEstate {
  disposition: string;
  location: string;
  size: number;
  address: AdvertisementAddress;
}

export interface Advertisement {
  id: string;
  title: string;
  price: string;
  realEstate: AdvertisementRealEstate;
}
