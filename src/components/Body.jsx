import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import NavBar from "../ui/NavBar";
import Footer from "../ui/Footer";
import { REQUEST_PROFILE_VIEW } from "../services/auth";
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
		<React.Fragment>
			<NavBar />
			<Outlet />
			<Footer />
		</React.Fragment>
	);
};

export default Body;
