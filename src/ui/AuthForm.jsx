import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuthForm = (props) => {
	const { isLogin, error, handleSubmit } = props;

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="card card-border bg-base-200 w-96">
			<div className="card-body">
				<h2 className="card-title justify-center">{isLogin ? "Log In" : "Sign Up"}</h2>

				{!isLogin && (
					<React.Fragment>
						<label className="label">First Name</label>
						<input
							type="text"
							className="input"
							placeholder="First Name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<label className="label">Last Name</label>
						<input
							type="text"
							className="input"
							placeholder="Last Name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</React.Fragment>
				)}

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
				{error && <p className="text-red-500">{error}</p>}
				<div className="card-actions justify-center my-5">
					<button
						className="btn btn-primary"
						onClick={() => {
							const payload = {
								...(firstName !== "" && { firstName }),
								...(lastName !== "" && { lastName }),
								email,
								password,
							};
							handleSubmit(payload);
						}}
					>
						{isLogin ? "Log in" : "Sign up"}
					</button>
				</div>
				<div className="flex justify-center">
					{isLogin ? (
						<Link to={"/register"}>Don't have account? Sign Up</Link>
					) : (
						<Link to={"/login"}>Have an account? Log In</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
