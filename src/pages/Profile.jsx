import React from "react";
import EditProfile from "../components/EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
	const user = useSelector((state) => state?.user);

	if (!user)
		return (
			<div className="flex justify-center my-50 text-lg">
				{`No user data`}
			</div>
		);

	return (
		<div className="container mx-auto">
			<EditProfile user={user} />
		</div>
	);
};

export default Profile;
