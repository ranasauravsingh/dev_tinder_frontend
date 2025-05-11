import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { handleError } from "../helpers/common_functions";
import { REQUEST_SIGNUP } from "../services/auth";
import { addUser } from "../store/userSlice";
import AuthForm from "../ui/AuthForm";

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [error, setError] = useState("");

	const handleSignUp = (payload) => {
		const requestPayload = {
			firstName: payload?.firstName,
			lastName: payload?.lastName,
			emailId: payload?.email,
			password: payload?.password,
		};

		REQUEST_SIGNUP(requestPayload)
			.then((res) => {
				const userData = res?.data?.data;
				if (userData) {
					dispatch(addUser(userData));
					navigate("/profile");
				}
			})
			.catch((err) => {
				if (err?.response?.status === 400) {
					setError(`ERROR: ${err?.response?.data?.message}`);
				}
				handleError(err);
			});
	};

	return (
		<div className="flex justify-center my-10">
			<AuthForm
				isLogin={false}
				error={error}
				handleSubmit={handleSignUp}
			/>
		</div>
	);
};

export default Register;
