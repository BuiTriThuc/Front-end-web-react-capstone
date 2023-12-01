
export interface RemoveAllProps {
  setAllRemove: Function;
}
export default function RemoveAll({ setAllRemove }: RemoveAllProps) {
  return (
    <button
      onClick={() => setAllRemove(true)}
      className="text-red-500 font-bold text-xs hover:text-red-900 hover:border-red-900 p-1 border border-red-500"
    >
      Remove all
    </button>
  );
}