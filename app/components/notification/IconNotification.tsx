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
    { Rocket: <Rocket size={30} strokeWidth={1.5}/> },
    { Hotel: <Hotel /> },
    { User: <User /> },
    { Star: <Star size={30} strokeWidth={1.5}/> },
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
            <div key={key} className="flex rounded-full w-11 h-11 items-center">
              {component}
            </div>
          );
        }
        return null;
      })}
    </>
  );
}