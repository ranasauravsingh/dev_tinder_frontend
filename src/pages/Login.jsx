import { useState } from "react";
import { REQUEST_LOGIN } from "../services/auth";

const Login = () => {
	const [email, setEmail] = useState("dhoni@test.com");
	const [password, setPassword] = useState("Admin@123");

	const handleLogin = () => {
		const requestPayload = {
			emailId: email,
			password,
		};

		REQUEST_LOGIN(requestPayload)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="flex justify-center my-10">
			<div className="card card-border bg-base-200 w-96">
				<div className="card-body">
					<h2 className="card-title">Login</h2>

					<label className="label">Email</label>
					<input
						type="email"
						className="input"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<label className="label">Password</label>
					<input
						type="password"
						className="input"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className="card-actions justify-center mt-5">
						<button
							className="btn btn-primary"
							onClick={handleLogin}
						>
							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
