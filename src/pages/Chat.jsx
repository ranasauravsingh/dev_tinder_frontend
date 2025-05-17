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
		<div className="flex mx-auto my-10 flex-col w-3/4 border border-orange-600 rounded-lg h-[70vh]">
			<h1 className="p-5 border-b border-orange-600">Chat</h1>
			<div className="flex-1 overflow-scroll p-5">
				{messages?.map((message, index) => {
					return (
						<div
							key={index}
							className={`chat ${
								user?._id === message?._id
									? "chat-end"
									: "chat-start"
							}`}
						>
							<div className="chat-header">
								{`${message?.firstName} ${message?.lastName}`}
								<time className="text-xs opacity-50">
									12:45
								</time>
							</div>
							<div className="chat-bubble">
								{`${message?.text}`}
							</div>
							<div className="chat-footer opacity-50">
								Delivered
							</div>
						</div>
					);
				})}
				<div ref={messagesEndRef} />
			</div>
			<div className="p-5 border-t border-orange-600 flex items-center gap-2">
				<input
					className="flex-1 border input border-orange-500 rounded p-2"
					value={newMessage}
					onChange={(e) => setNewMessage(e?.target?.value)}
				/>
				<button className="btn btn-neutral" onClick={handleSendMessage}>
					Send
				</button>
			</div>
		</div>
	);
};

export default Chat;
