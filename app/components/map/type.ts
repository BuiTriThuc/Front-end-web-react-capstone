import { StaticImageData } from 'next/image';

export interface CustomLink {
  label: string;
  href: string;
  targetBlank?: boolean;
}

export interface TaxonomyType {
  id: string | number;
  name: string;
  href: string;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
  listingType?: "stay" | "experiences" | "car";
}

export interface AuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string | StaticImageData;
  bgImage?: string | StaticImageData;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: string;
  starRating?: number;
}

export interface PostDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  categories: TaxonomyType[];
  title: string;
  featuredImage: StaticImageData | string;
  desc?: string;
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType?: "standard" | "video" | "gallery" | "audio";
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

export interface GuestsObject {
  guestAdults?: number;
  guestChildren?: number;
  guestInfants?: number;
  rooms?: number;
}

export type StaySearchFormFields = "location" | "guests" | "dates";

export interface PropertyType {
  name: string;
  description: string;
  checked: boolean;
}

export interface ClassOfProperties extends PropertyType {}

export type DateRage = [Date | null, Date | null];

export interface InRoomAmenity {
  id: number;
  inRoomAmenityName: string;
  inRoomAmenityDescription: string;
  inRoomAmenityLinkIcon: string;
  isDeleted: boolean;
  inRoomAmenityTypeId: number;
}

export interface InRoomAmenityType {
  id: number;
  inRoomAmenityTypeName: string;
  inRoomAmenityTypeDescription: string;
  isDeleted: boolean;
  inRoomAmenities: InRoomAmenity[];
}

export interface PropertyView {
  id: number;
  propertyViewName: string;
  propertyViewDescription: string;
  deleted: boolean;
}

export interface PropertyType {
  id: number;
  propertyTypeName: string;
  propertyTypeDescription: string;
  deleted: boolean;
}

export interface Property {
  id: number;
  propertyName: string;
  propertyDescription: string;
  numberKingBeds: number;
  numberQueenBeds: number;
  numberSingleBeds: number;
  numberDoubleBeds: number;
  numberTwinBeds: number;
  numberFullBeds: number;
  numberSofaBeds: number;
  numberMurphyBeds: number;
  numberBedsRoom: number;
  numberBathRoom: number;
  roomSize: number;
  isDeleted: boolean;
  status: string;
  resortId: number;
  propertyType: PropertyType;
  propertyView: PropertyView;
  inRoomAmenityType: InRoomAmenityType[];
  propertyImage: {
    id: number;
    propertyId: number;
    link: string;
    deleted: boolean;
  }[];
}

export interface Resort {
  id: number;
  resortName: string;
  resortDescription: string;
  resortImages: any[]; // Assuming it's an array of images
  propertyTypes: PropertyType[];
  resortAmenityTypes: any; // Type not provided in the JSON
  addressLine: string;
  locationFormattedName: string;
  locationDescription: string;
  locationCode: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  deleted: boolean;
}

export interface User {
  userId: number;
  email: string;
  username: string;
  gender: string;
  dob: number[];
  phone: string;
  status: string;
  avatar?: string;
  role: {
    roleId: number;
    name: string;
  };
  createdOn: any;
  createdBy: any;
  lastModifiedOn: any;
  lastModifiedBy: any;
  email_verified: boolean;
  phone_verified: boolean;
}

export interface AvailableTime {
  id: number;
  startTime: string;
  endTime: string;
  pricePerNight: number;
  status: string;
  timeFrameId: number;
  deleted: boolean;
}

export interface CoOwnerId {
  propertyId: number;
  userId: number;
  roomId: string;
}

export interface ApartmentForRent {
  coOwnerId: CoOwnerId;
  property: Property;
  resort: Resort;
  user: User;
  availableTime: AvailableTime;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface ApartmentForRentResponse {
  content: ApartmentForRent[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface StayDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: StaticImageData | string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: (StaticImageData | string)[];
  price: string;
  listingCategory: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  saleOff?: string | null;
  isAds: boolean | null;
  roomSize: string | null;
  propertyView?: string | null;
  resortName?: string | null;
  ownerName?: string | null;
  ownerAvatar?: string | null;
  map: {
    lat: number;
    lng: number;
  };
}

export interface SearchApartmentForRentParams {
  locationName: string;
  resortId: number | null;
  checkIn: Date | null;
  checkOut: Date | null;
  min: number | null;
  max: number | null;
  guest: number | null;
  listOfInRoomAmenity: number[];
  listOfPropertyView: number[];
  listOfPropertyType: number[];
  sortBy: string;
  sortDirection: "asc" | "desc";
}

export interface InRoomAmenity {
  id: number;
  inRoomAmenityName: string;
  inRoomAmenityDescription: string;
  inRoomAmenityLinkIcon: string;
  isDeleted: boolean;
  inRoomAmenityTypeId: number;
}

export interface InRoomAmenityType {
  id: number;
  inRoomAmenityTypeName: string;
  inRoomAmenityTypeDescription: string;
  isDeleted: boolean;
  inRoomAmenities: InRoomAmenity[];
}

export interface InRoomAmenityTypeResponse {
  content: InRoomAmenityType[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface PropertyType {
  id: number;
  propertyTypeName: string;
  propertyTypeDescription: string;
  deleted: boolean;
}

export interface PropertyTypeResponse {
  content: PropertyType[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}


export interface PropertyView {
  id: number;
  propertyViewName: string;
  propertyViewDescription: string;
  deleted: boolean;
}

export interface PropertyViewResponse {
  content: PropertyView[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}