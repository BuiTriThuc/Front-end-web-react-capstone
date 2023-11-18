export interface NotificationResponse {
  notificationId: number;
  subject: string | null  ;
  content: string | null;
  href: null | string;
  createdOn: string;
  isRead: boolean;
}