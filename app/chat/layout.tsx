import React from "react";
import SidebarChat from "./components/SidebarChat";
import GetConversations from "../actions/getConversations";
import ConversationList from "./components/ConversationList";
import Sidebar from '@/app/components/dashboard/Sidebar';
import Provider from '@/app/components/Provider';
import { Layout } from 'antd';
import GetCurrentUser from '@/app/actions/getCurrentUser';

// export default async function ChatLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const conversations = await GetConversations();
//   return (
//     <SidebarChat>
//       <ConversationList initialItems={conversations} />
//       <div className="h-full">{children}</div>
//     </SidebarChat>
//   );
// }
export default async function ChatLayout({
                                           children,
                                         }: {
  children: React.ReactNode;
}) {
  const conversations = await GetConversations();
  const currentUser = await GetCurrentUser();
  return (
    <>
      <Provider>
        <div className="flex flex-row">
          <div>
            <Sidebar />
          </div>
          <main className="pt-5 w-full pr-14">
            <Layout className="bg-gray-200 h-screen">
              <ConversationList initialItems={conversations} currentUser={currentUser}/>
              <Layout>
                <div className="h-screen">{children}</div>
              </Layout>
            </Layout>
          </main>
        </div>
      </Provider>
    </>
  );
}
