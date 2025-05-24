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
	const [isLoading, setIsLoading] = useState(true);

	const [toast, setToast] = useState("");

	const fetchFeed = () => {
		setIsLoading(true);
		REQUEST_USER_FEED()
			.then((res) => {
				const feedData = res?.data?.data;
				if (feedData) {
					dispatch(storeFeed(feedData));
				}
			})
			.catch((err) => {
				handleError(err);
			})
			.finally(() => {
				setIsLoading(false);
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
		else {
			setIsLoading(false);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return !isLoading ? (
		<div className="container mx-auto">
			{userFeed?.length > 0 ? (
				<div className="flex items-center justify-center my-6 sm:my-10">
					<UserCard
						user={userFeed[0]}
						handleSendRequest={handleSendRequest}
					/>
				</div>
			) : (
				<div className="flex justify-center my-10 sm:my-12 text-base sm:text-lg">No feed</div>
			)}
			{toast && (
				<div className="toast toast-bottom toast-end z-[1]">
					<div className="alert alert-success text-sm sm:text-base">
						<span>{toast}</span>
					</div>
				</div>
			)}
		</div>
	) : (
		<div className="flex items-center justify-center my-6 sm:my-10">
			<div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-3 sm:gap-4 px-4">
				<div className="skeleton h-40 sm:h-48 w-full"></div>
				<div className="skeleton h-4 w-20 sm:w-28"></div>
				<div className="skeleton h-4 w-20 sm:w-28"></div>
				<div className="skeleton h-4 w-full"></div>
				<div className="skeleton h-4 w-full"></div>
				<div className="flex items-center justify-center gap-3 sm:gap-4">
					<div className="skeleton h-8 sm:h-10 w-1/4"></div>
					<div className="skeleton h-8 sm:h-10 w-1/4"></div>
				</div>
			</div>
		</div>
	);
};

export default Feed;
