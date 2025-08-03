import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { REQUEST_USER_CONNECTION_REQUESTS } from "../services/user";
import { handleError } from "../helpers/common_functions";
import { storeRequests } from "../store/requestSlice";
import ListItem from "../ui/ListItem";
import { REQUEST_REVIEW_USER_REQUEST } from "../services/request";

const Requests = () => {
	const dispatch = useDispatch();

	const userRequests = useSelector((state) => state?.requests) || [];

	const [toast, setToast] = useState("");

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

	const handleReviewRequest = (status, fromUserId) => {
		const requestParams = {
			status,
			fromUserId,
		};

		REQUEST_REVIEW_USER_REQUEST({}, requestParams)
			.then((res) => {
				const reviewResponse = res?.data?.data;
				if (reviewResponse) {
					fetchRequests();
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
		if (userRequests?.length === 0) {
			fetchRequests();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			{userRequests?.length > 0 ? (
				<div className="flex justify-center my-6 sm:my-10">
					<div className="w-full max-w-md sm:max-w-lg">
						<div className="text-center text-lg sm:text-xl font-semibold mb-4 sm:mb-5">
							Requests
						</div>
						<ul className="list bg-base-100 rounded-box shadow-md p-4 sm:p-6">
							{userRequests?.map((request) => (
								<ListItem
									listData={request}
									key={request?._id}
									isRequest={true}
									handleReviewRequest={handleReviewRequest}
								/>
							))}
						</ul>
					</div>
				</div>
			) : (
				<div className="flex justify-center my-50 text-lg">
					No Requests
				</div>
			)}
			{toast && (
				<div className="toast toast-bottom toast-end z-[1]">
					<div className="alert alert-success text-sm sm:text-base">
						<span>{toast}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default Requests;
