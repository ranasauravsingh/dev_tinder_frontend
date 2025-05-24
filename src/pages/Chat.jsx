import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../config/socket";
import { REQUEST_FETCH_CHATS } from "../services/chat";
import { handleError } from "../helpers/common_functions";

const Chat = () => {
	const { targetUserId } = useParams();
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const messagesEndRef = useRef(null);

	const user = useSelector((state) => state?.user);

	const scrollToBottom = () => {
		messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
	};

	const handleSendMessage = () => {
		const { firstName, lastName, _id } = user;
		const socket = createSocketConnection();
		socket?.emit("sendMessage", {
			firstName,
			lastName,
			userId: _id,
			targetUserId,
			text: newMessage,
		});
		setNewMessage("");
	};

	const fetchChats = () => {
		const requestParams = {
			targetUserId,
		};

		REQUEST_FETCH_CHATS(null, requestParams)
			.then((res) => {
				const chatResponse = res?.data?.data;
				if (chatResponse) {
					setMessages(chatResponse);
				}
			})
			.catch((err) => {
				handleError(err);
			});
	};

	useEffect(() => {
		if (!user || !targetUserId) {
			return;
		}

		const { firstName, lastName, _id } = user;
		const socket = createSocketConnection();
		socket.emit("joinChat", {
			firstName,
			lastName,
			userId: _id,
			targetUserId,
		});

		socket.on("messageReceived", ({ firstName, text, lastName, _id }) => {
			setMessages((prevState) => [
				...prevState,
				{ text, firstName, lastName, _id },
			]);
		});

		return () => {
			socket.disconnect();
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, targetUserId]);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	useEffect(() => {
		fetchChats();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="container mx-auto flex justify-center">
			<div className="flex flex-col w-full max-w-md sm:max-w-lg border border-base-300 rounded-lg h-[70vh] bg-base-100 shadow-sm">
				<h1 className="p-4 sm:p-5 border-b border-base-300 text-lg sm:text-xl font-semibold">Chat</h1>
				<div className="flex-1 overflow-y-auto p-4 sm:p-5 scroll-smooth">
					{messages?.map((message, index) => {
						return (
							<div
								key={index}
								className={`chat ${
									user?._id === message?._id
										? "chat-end"
										: "chat-start"
								} mb-3 sm:mb-4`}
							>
								<div className="chat-header text-sm sm:text-base">
									{`${message?.firstName} ${message?.lastName}`}
									<time className="text-xs opacity-50 ml-2">
										12:45
									</time>
								</div>
								<div className="chat-bubble text-sm sm:text-base">
									{`${message?.text}`}
								</div>
								<div className="chat-footer text-xs opacity-50">
									Delivered
								</div>
							</div>
						);
					})}
					<div ref={messagesEndRef} />
				</div>
				<div className="p-4 sm:p-5 border-t border-base-300 flex items-center gap-2 sm:gap-3">
					<input
						className="flex-1 input input-bordered text-sm sm:text-base rounded"
						value={newMessage}
						onChange={(e) => setNewMessage(e?.target?.value)}
						placeholder="Type a message"
						onKeyUp={(e) => e.key === "Enter" && handleSendMessage()}
					/>
					<button
						className="btn btn-neutral btn-sm sm:btn-md"
						onClick={handleSendMessage}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
