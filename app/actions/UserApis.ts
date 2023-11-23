import AxiosClient from '@/app/libs/AxiosConfig';
import { Pageable, Sort } from '@/app/components/map/type';

export interface User {
  userId: number;
  email: string;
  username: string;
  fullName: string | null;
  gender: "MALE" | "FEMALE" | "OTHER";
  dob: [number, number, number];
  phone: string;
  avatar: string | null;
  status: string;
  role: {
    roleId: number;
    name: string;
  };
  createdOn: string;
  createdBy: string;
  lastModifiedOn: string;
  lastModifiedBy: string;
  email_verified: boolean;
  phone_verified: boolean;
}

export interface UserResponse {
  content: User[];
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

const UserApis = {
  getAllMembership: (): Promise<UserResponse> => AxiosClient.get('/users/search?status=ACTIVE&roleIds=2&limit=1000&offset=0&sortProps=username&sortDirection=asc'),
  getCurrentUserProfile: (): Promise<User> => AxiosClient.get('/users/profile'),
  updateCurrentUserProfile: (form: FormData): Promise<any> => AxiosClient.put(`/users/profile`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    }}),
};

export default UserApis;