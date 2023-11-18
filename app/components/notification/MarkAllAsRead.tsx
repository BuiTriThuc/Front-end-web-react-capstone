
export interface MarkAllAsReadProps {
  setAllAsRead: Function;
}
export default function MarkAllAsRead({ setAllAsRead }: MarkAllAsReadProps) {
  return (
    <button
      onClick={() => setAllAsRead(true)}
      className="text-violet-500 font-bold text-xs hover:text-violet-400 hover:border-violet-400 p-1 border border-violet-500"
    >
      Mark all as read
    </button>
  );
}