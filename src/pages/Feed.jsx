import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleError } from "../helpers/common_functions";
import { REQUEST_USER_FEED } from "../services/user";
import { storeFeed } from "../store/feedSlice";
import UserCard from "../ui/UserCard";

const Feed = () => {
	const dispatch = useDispatch();
	const userFeed = useSelector((state) => state?.feed) || [];

	const fetchFeed = () => {
		REQUEST_USER_FEED()
			.then((res) => {
				const feedData = res?.data?.data;
				if (feedData?.length > 0) {
					dispatch(storeFeed(feedData));
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

	if (userFeed?.length === 0) return <div className="flex justify-center my-50 text-lg">No feed</div>;

	return (
		<div className="flex items-center justify-center my-10">
			<UserCard user={userFeed[0]} />
		</div>
	);
};

export default Feed;
