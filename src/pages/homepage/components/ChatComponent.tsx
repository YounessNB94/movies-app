import { useState } from "react";
import { Card } from "./Card";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const OPENAIAPI_KEY = import.meta.env.VITE_OPENAI_KEY;

const systemMessage = {
  role: "system",
  content:
    "Explain things like you're talking to a user  who is looking for informations about movies, an if they ask something unrelated to movies, do not answer"
};
type MessageDirection = "incoming" | "outgoing";
export const ChatComponent = () => {
  interface MessageModel {
    message: string;
    sentTime?: string;
    sender: string;
    direction?: MessageDirection | undefined;
    position?: string;
  }
  const [messages, setMessages] = useState<MessageModel[]>([
    {
      message:
        "Hello, I'm ChatGPT! Do you want to know something about a movie? I can also help you find a movie if you give me details about it!",
      sender: "ChatGPT",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

 const handleSend = async (message: string) => {
   const newMessage: MessageModel = {
     message,
     direction: "outgoing",
     sender: "user",
   };

   const newMessages = [...messages, newMessage];

   setMessages(newMessages);

   setIsTyping(true);
   await processMessageToChatGPT(newMessages);
 };

  async function processMessageToChatGPT(
    chatMessages: { message: string; sender: string }[]
  ) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
      temperature: 0.1,
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + OPENAIAPI_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "400px", width: "300px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="ChatGPT is typing" />
                ) : null
              }
            >
              {messages.map((message, i) => {
                console.log(message);
                return (
                  <Message
                    key={i}
                    model={{
                      message: message.message,
                      sender: message.sender,
                      direction: message.direction || "incoming",
                      position: "normal",
                    }}
                  />
                );
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};
