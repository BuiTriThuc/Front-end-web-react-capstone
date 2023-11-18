import { Rocket, User, Star, Flag, MessageSquare, Hotel } from "lucide-react";
export interface IconNotificationProps {
  selectedIcon: string;
}

export interface TypeIconsProps {
  [key: string]: JSX.Element;
}
export default function IconNotification({
                                           selectedIcon,
                                         }: IconNotificationProps) {
  const typeIcons: TypeIconsProps[] = [
    { Rocket: <Rocket /> },
    { Hotel: <Hotel /> },
    { User: <User /> },
    { Star: <Star /> },
    { Chat: <MessageSquare /> },
    { Flag: <Flag /> },
  ];

  return (
    <>
      {typeIcons.map((item) => {
        const key = Object.keys(item)[0];
        const component = item[selectedIcon];
        if (component) {
          return (
            <div key={key} className="m-auto">
              {component}
            </div>
          );
        }
        return null;
      })}
    </>
  );
}