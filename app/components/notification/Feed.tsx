import { PropsWithChildren } from "react";

export interface FeedProps {
}
export default function Feed({
                               children
                             }: PropsWithChildren<FeedProps>) {
  return (
    <section>
      {children}
    </section>
  );
}