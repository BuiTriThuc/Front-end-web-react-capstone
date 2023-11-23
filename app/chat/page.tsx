"use client";

import React from "react";
import EmptyState from "../components/chat/EmptyState";
import clsx from "clsx";
import useConversation from "../hooks/useConverastion";

export default function Chat() {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx(
        `lg:block h-screen`,
        isOpen ? "block" : "hidden"
      )}
    >
      <EmptyState />
    </div>
  );
}
