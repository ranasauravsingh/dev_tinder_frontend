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

		REQUEST_REVIEW_USER_REQUEST(null, requestParams)
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
				<div className="flex justify-center my-10">
					<div>
						<div className="text-center text-lg font-semibold">
							Requests
						</div>
						<ul className="list bg-base-100 rounded-box shadow-md my-5">
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
				<div className="toast toast-top toast-end">
					<div className="alert alert-success">
						<span>{toast}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default Requests;
