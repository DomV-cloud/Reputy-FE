export interface AdvertisementAddress {
  street: string;
  city: string;
  postalCode: string;
}

export interface AdvertisementRealEstate {
  disposition: string;
  size: number;
  address: AdvertisementAddress;
}

export interface Advertisement {
  id: string;
  title: string;
  price: string;
  realEstate: AdvertisementRealEstate;
  landLord: Landlord;
  imageUrl?: string;
}

export interface Landlord {
  id: string;
  fullName: string;
  averageRating: number;
  isVerified: boolean;
  avatarUrl?: string;
}
