import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "../ui/NavBar";
import Footer from "../ui/Footer";

const Body = () => {
	return (
		<React.Fragment>
			<NavBar />
			<Outlet />
			<Footer />
		</React.Fragment>
	);
};

export default Body;
