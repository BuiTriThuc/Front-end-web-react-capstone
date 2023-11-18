import AxiosClient from '@/app/libs/AxiosConfig';

export interface Message {
  messageId: number;
  text: string;
  image: string | null;
  createdOn: string;
  authorId: number;
  messageType: "TEXT" | "TEXT_AND_IMAGE" | string;
}

const MessageApis = {
  getMessagesByConversationId: (conversationId: string): Promise<Message[]> => AxiosClient.get(`/message/${conversationId}/messages`),
  sendMessage: (conversationId: string, message: FormData): Promise<any> => AxiosClient.post(`/message/${conversationId}/send`, message, {
    headers: {
      "Content-Type": "multipart/form-data",
    }}),
};

export default MessageApis;