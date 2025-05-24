import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import NavBar from "../ui/NavBar";
import Footer from "../ui/Footer";
import { REQUEST_PROFILE_VIEW } from "../services/profile";
import { handleError } from "../helpers/common_functions";
import { addUser } from "../store/userSlice";

const Body = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userState = useSelector((state) => state?.user);

	const fetchUser = () => {
		REQUEST_PROFILE_VIEW()
			.then((res) => {
				const userData = res?.data?.data;
				dispatch(addUser(userData));
			})
			.catch((err) => {
				handleError(err);
				if (err?.response?.status === 401) {
					navigate("/login");
					return;
				}
			});
	};

	useEffect(() => {
		if (!userState) {
			fetchUser();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-16 sm:pb-20 overflow-y-auto scroll-smooth">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Body;
