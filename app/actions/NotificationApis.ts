import AxiosClient from '@/app/libs/AxiosConfig';
import { NotificationResponse } from '@/app/components/notification/types';

const NotificationApis = {
  getAll: (): Promise<NotificationResponse[]> => AxiosClient.get('/notifications/current-user'),
  readAll: (): Promise<void> => AxiosClient.put('/notifications/current-user/read-all'),
  deleteAll: (): Promise<void> => AxiosClient.delete('/notifications/current-user'),
  deleteById: (id: number): Promise<void> => AxiosClient.delete(`/notifications/current-user/${id}`),
};

export default NotificationApis;