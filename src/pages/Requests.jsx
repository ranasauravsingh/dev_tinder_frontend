import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { REQUEST_USER_CONNECTION_REQUESTS } from "../services/user";
import { handleError } from "../helpers/common_functions";
import { storeRequests } from "../store/requestSlice";
import ListItem from "../ui/ListItem";

const Requests = () => {
	const dispatch = useDispatch();

	const userRequests = useSelector((state) => state?.requests);

	const fetchRequests = () => {
		REQUEST_USER_CONNECTION_REQUESTS()
			.then((res) => {
				const requestsData = res?.data?.data;
				if (requestsData) {
					const fromUserRequests = requestsData?.map(
						(request) => request?.fromUserId
					);
					dispatch(storeRequests(fromUserRequests));
				}
			})
			.catch((err) => {
				handleError(err);
			});
	};

	useEffect(() => {
		if (!userRequests) {
			fetchRequests();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (userRequests?.length === 0)
		return (
			<div className="flex justify-center my-50 text-lg">No Requests</div>
		);

	return (
		<div className="flex justify-center my-10">
			<div>
				<div className="text-center text-lg font-semibold">
					Requests
				</div>
				<ul className="list bg-base-100 rounded-box shadow-md my-5">
					{userRequests?.map((request) => (
						<ListItem listData={request} key={request?._id} isRequest={true} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default Requests;
