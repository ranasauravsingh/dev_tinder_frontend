import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { REQUEST_LOGIN } from "../services/auth";
import { addUser } from "../store/userSlice";
import { handleError } from "../helpers/common_functions";
import AuthForm from "../ui/AuthForm";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [error, setError] = useState("");

	const handleLogin = (payload) => {
		const requestPayload = {
			emailId: payload?.email,
			password: payload?.password,
		};

		REQUEST_LOGIN(requestPayload)
			.then((res) => {
				const userData = res?.data?.data;
				if (userData) {
					dispatch(addUser(userData));
					navigate("/");
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
			<AuthForm isLogin={true} error={error} handleSubmit={handleLogin} />
		</div>
	);
};

export default Login;
