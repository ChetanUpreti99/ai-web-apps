"use client";
import Message, { TMessage } from "@/components/Message";
import { useEffect, useRef } from "react";

type Props = {
  messages: TMessage[];
};

const ResponseAndSources = ({ messages }: Props) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the messages container when new messages are added
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={messagesContainerRef}
      className="w-full flex flex-col space-y-2 overflow-y-scroll max-h-[calc(100vh-250px)]"
    >
      {messages &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
    </div>
  );
};

export default ResponseAndSources;