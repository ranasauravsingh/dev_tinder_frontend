import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleError } from "../helpers/common_functions";
import { REQUEST_USER_FEED } from "../services/user";
import { storeFeed } from "../store/feedSlice";
import UserCard from "../ui/UserCard";
import { REQUEST_SEND_USER_REQUEST } from "../services/request";

const Feed = () => {
	const dispatch = useDispatch();
	const userFeed = useSelector((state) => state?.feed) || [];

	const [toast, setToast] = useState("");

	const fetchFeed = () => {
		REQUEST_USER_FEED()
			.then((res) => {
				const feedData = res?.data?.data;
				if (feedData) {
					dispatch(storeFeed(feedData));
				}
			})
			.catch((err) => {
				handleError(err);
			});
	};

	const handleSendRequest = (status, toUserId) => {
		const requestParams = {
			status,
			toUserId,
		};

		REQUEST_SEND_USER_REQUEST(null, requestParams)
			.then((res) => {
				const sendResponse = res?.data?.data;
				if (sendResponse) {
					fetchFeed();
				}

				if (res?.data?.message) {
					setToast(res?.data?.message);
					setTimeout(() => {
						setToast("");
					}, 3000);
				}
			})
			.catch((err) => {
				handleError(err);
			});
	};

	useEffect(() => {
		if (userFeed?.length === 0) {
			fetchFeed();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			{userFeed?.length > 0 ? (
				<div className="flex items-center justify-center my-10">
					<UserCard
						user={userFeed[0]}
						handleSendRequest={handleSendRequest}
					/>
				</div>
			) : (
				<div className="flex justify-center my-50 text-lg">No feed</div>
			)}
			{toast && (
				<div className="toast toast-top toast-end">
					<div className="alert alert-success">
						<span>{toast}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default Feed;
