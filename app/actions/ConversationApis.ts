import AxiosClient from '@/app/libs/AxiosConfig';
import { User } from '@/app/actions/UserApis';

export interface Message {
  messageId: number;
  text: string;
  image: string | null;
  createdOn: string;
  authorId: number;
  messageType: "TEXT" | "TEXT_AND_IMAGE" | string;
}

export interface Participant {
  leftChat: boolean;
  user: User;
}

export interface Conversation {
  conversationId: number;
  creationDate: string;
  conversationName: string | null;
  participants: Participant[];
  message: Message;
}


const ConversationApis = {
  getCurrentUserConversation: (): Promise<Conversation[]> => AxiosClient.get('/conversation/current-user'),
  createConversation: (conversationName: string, userIds: number[]): Promise<Conversation> => AxiosClient.post('/conversation/create', {
    conversationName,
    userIds,
  }),
  getContactWithOwner: (ownerId: string):Promise<Conversation> => AxiosClient.get(`/conversation/current-user/contact/${ownerId}`),
  createCurrentUserConversation: (ownerId: string): Promise<Conversation> => AxiosClient.post(`/conversation/current-user/contact/${ownerId}`),
};

export default ConversationApis;