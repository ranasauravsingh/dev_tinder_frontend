import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleError } from "../helpers/common_functions";
import { REQUEST_USER_CONNECTIONS } from "../services/user";
import { storeConnections } from "../store/connectionSlice";
import ListItem from "../ui/ListItem";

const Connections = () => {
	const dispatch = useDispatch();

	const userConnections = useSelector((state) => state?.connections) || [];

	const fetchConnections = () => {
		REQUEST_USER_CONNECTIONS()
			.then((res) => {
				const connectionData = res?.data?.data;
				if (connectionData) {
					dispatch(storeConnections(connectionData));
				}
			})
			.catch((err) => {
				handleError(err);
			});
	};

	useEffect(() => {
		if (userConnections?.length === 0) {
			fetchConnections();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (userConnections?.length === 0) return <div className="flex justify-center my-50 text-lg">No Connections</div>;

	return (
		<div className="flex justify-center my-6 sm:my-10">
			<div className="w-full max-w-md sm:max-w-lg">
				<div className="text-center text-lg sm:text-xl font-semibold mb-4 sm:mb-5">
					Connections
				</div>
				<ul className="list bg-base-100 rounded-box shadow-md p-4 sm:p-6">
					{userConnections?.map((connection) => (
						<ListItem listData={connection} key={connection?._id}/>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Connections;
