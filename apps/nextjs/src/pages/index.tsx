import type { NextPage } from "next";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@chat/api";
import { useUser } from '@auth0/nextjs-auth0';
import LoginButton from '@chat/ui/src/ui/Button/LoginButton';
import LogoutButton from '@chat/ui/src/ui/Button/LogoutButton';
import Nav from '@chat/ui/src/ui/NavBar/HomeNav';
import Nav2 from '@chat/ui/src/ui/NavBar/AppNav';
import { useChannelMessage, useReadChannelState } from "@onehop/react";
import { startTransition, useEffect, useRef, useState } from "react";
import { HOP_CHANNEL_NAME } from "../utils/config";
import { getErrorMessage } from "../utils/errors";
import { Message, PickWhereValuesAre } from "../utils/types";
import { useTheme } from "next-themes";

const Home: NextPage = () => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState<Array<Message>>([]);
  const { theme, setTheme } = useTheme();
	const [message, setMessage] = useState<Omit<Message, "id" | "isAdmin">>({
		author: "",
    picture: "",
		content: "",
	});
  const { user, error, isLoading } = useUser();
	const inputRef = useRef<HTMLInputElement | null>(null);
  const { state } = useReadChannelState<{ messages: Message[] }>(HOP_CHANNEL_NAME);

	useChannelMessage<Message>(HOP_CHANNEL_NAME, "MESSAGE_CREATE", message => {
		setMessages(messages => [message, ...messages]);
	});

	useEffect(() => {
		if (messages.length === 0 && state && state.messages.length > 0) {
			setMessages(state.messages);
		}
    if (message.author === user?.nickname) {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
	}, [state, messages]);

	useEffect(() => {
		if (!loading) {
			inputRef.current?.focus();
		}
	}, [loading]);

	const set = (key: keyof PickWhereValuesAre<Omit<Message, "id">, string>) => {
		return (event: React.ChangeEvent<HTMLInputElement>) => {
			setMessage(m => ({ ...m, [key]: event.target.value }));
		};
	};

  function ChatMessage(props: { message: { content: string; picture: string | null | undefined; author: string | null | undefined;}; }) {
    const { content, picture, author} = props.message;
  
    return (
      <li className=" -rotate-180">
        <div className='flex justify-items-start'>
          <div className="absolute">
            {/* @ts-ignore */}
            <img className="inline-block h-9 w-9 rounded-full" src={picture}/>
          </div>
          <div className="pl-12">
            <p className="text-base font-medium text-gray-700 dark:text-green-50 font-poppins ">{author}</p>
            <p className="text-sm font-medium text-gray-500 dark:text-green-50 font-poppins ">{content}</p>
          </div>
        </div>
      </li>
      )}

  const SendMessage = async (e: { preventDefault: () => void; }) => {
          e.preventDefault();

          // onclick scroll to bottom of this div
          const messagesEnd = document.getElementById("messagesEnd");
          messagesEnd?.scrollIntoView({ behavior: "smooth" });
					if (message.content.trim() === "") {
            return;
					}
					setLoading(true);
          
          {/* @ts-ignore */}
          message.author = user.name;
          {/* @ts-ignore */}
          message.picture = user.picture;
          
					try {
            const request = new Request("/api/message", {
              method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(message),
						});
            console.log(message)
            
						const response = await fetch(request);
						const body = (await response.json()) as
            | { success: true }
            | { success: false; message: string };

						if (!body.success) {
              throw new Error(body.message);
						}
            
						setMessage(old => ({ ...old, content: "" }));
          } catch (e: unknown) {
              console.error(e);
				  		alert(getErrorMessage(e));
				  	} finally {
              startTransition(() => {
                setLoading(false);
				  		});
				  	}
			  	}

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <>
      <div className="flex-col flex justify-between w-screen h-screen bg-gray-50 dark:bg-gray-700 z-[999] fixed" >
      <Nav2 />
      <div className="max-h-screen overflow-auto px-8 lg:px-16">
			<ul className="flex flex-col gap-5 rotate-180 justify-start">
        {messages.map(message => <ChatMessage message={message} />)}
			</ul>
        <div ref={messageEndRef} />
      </div>
      <div className="my-auto px-8 lg:px-16 py-4">
			<form
        
				onSubmit={SendMessage}>
        <div className="flex justify-between bg-gray-200 dark:bg-gray-800 rounded-full mx-auto px-4 my-auto">
				  <input
          className="bg-transparent py-2 w-full focus:outline-none font-poppins"
          ref={inputRef}
          disabled={loading}
          type="text"
          placeholder="Write a message..."
          value={message.content}
          onChange={set("content")}
          >
          </input>
          <button
          className="py-2 px-4"
          disabled={loading}
          type="submit"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.77816 12.6777L13.7279 20.4558L20.0919 1.36396L0.999983 7.72792L8.77816 12.6777ZM8.77816 12.6777L14.435 7.02082" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          </div>
			  </form>
          </div>
          </div>
    </>
    )
  }

  return (
    <>
      <div className="bg-gray-900 w-screen h-screen z-[999] fixed p-16 lg:py-16 lg:px-32 bg-cover bg-center" style={{ backgroundImage: `url("https://i.imgur.com/5OKCdVy.png")` }}>
        <div className="w-full h-full max-w-[90rem] mx-auto flex flex-col">
          <Nav/>
          <div className="flex justify-between">
            <div>
              <div className="flex flex-col gap-8 w-full mt-[calc((100vh/2)-15rem)] mx-auto text-left md:mx-0 md:max-w-[33rem] lg:max-w-[40rem] 2xl:max-w-[46rem]">
                <div className="flex flex-col gap-7 font-krona">
                  <h1 className="text-5xl font-bold text-white">
                    <span>Chat with like-minded gen-z&nbsp;</span>
                     <span className="bg-gradient-to-bl from-pink-600 to-indigo-500 text-transparent bg-clip-text">coders</span>
                  </h1>
                <p className="text-white text-2xl font-medium font-krona">Chatgroop is where young builders network, chat, and grow together.</p>
              </div>
              <LoginButton />
              </div>
            </div>
              <div>
                <video className="h-full w-96 -mt-28 pr-4 object-cover rounded-2xl" autoPlay loop muted>
                  <source src="/video.webm" type='video/webm' data-src='/video.webm' />
                </video>
              </div>  
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
