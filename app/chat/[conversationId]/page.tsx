import EmptyState from '@/app/components/chat/EmptyState';
import Header from '@/app/components/chat/Header';
import Form from '@/app/components/chat/Form';
import Body from '@/app/components/chat/Body';
import GetConversations from '@/app/actions/getConversations';
import GetCurrentUser from '@/app/actions/getCurrentUser';
import ConversationApis, { Conversation } from '@/app/actions/ConversationApis';
import MessageApis from '@/app/actions/MessageApis';

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  // const conversations = await getConversationById(params.conversationId);
  const conversations = await GetConversations() as Conversation[];
  const currentUser= await GetCurrentUser();
  const messages = await MessageApis.getMessagesByConversationId(params.conversationId);

  if (!((conversations?.find((c:Conversation) => c?.conversationId?.toString()===params?.conversationId)as Conversation))) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen custom-max-height">
      <div className="h-screen flex flex-col custom-max-height">
        <Header conversation={(conversations?.find((c:Conversation) => c?.conversationId?.toString()===params?.conversationId)as Conversation)}
                currentUser={currentUser}
        />
        <Body initialMessages={messages.reverse()}
              users={
                  (conversations?.find((c:Conversation) => c?.conversationId?.toString()===params?.conversationId)as Conversation)
                    ?.participants.map((p)=>p.user)}
              currentUser={currentUser}/>
        <Form currentUser={currentUser}/>
      </div>
    </div>
  );
};

export default ConversationId;