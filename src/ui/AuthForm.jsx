import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuthForm = (props) => {
	const { isLogin, error, handleSubmit } = props;

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="card bg-base-200 w-full max-w-md sm:max-w-lg shadow-sm border border-base-300">
			<div className="card-body p-4 sm:p-6">
				<h2 className="card-title justify-center text-lg sm:text-xl">
					{isLogin ? "Log In" : "Sign Up"}
				</h2>

				{!isLogin && (
					<React.Fragment>
						<div className="my-2 sm:my-3">
							<label className="label text-sm sm:text-base">
								First Name
							</label>
							<input
								type="text"
								className="input input-bordered w-full text-sm sm:text-base"
								placeholder="First Name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div className="my-2 sm:my-3">
							<label className="label text-sm sm:text-base">
								Last Name
							</label>
							<input
								type="text"
								className="input input-bordered w-full text-sm sm:text-base"
								placeholder="Last Name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
					</React.Fragment>
				)}

				<div className="my-2 sm:my-3">
					<label className="label text-sm sm:text-base">Email</label>
					<input
						type="email"
						className="input input-bordered w-full text-sm sm:text-base"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="my-2 sm:my-3">
					<label className="label text-sm sm:text-base">
						Password
					</label>
					<input
						type="password"
						className="input input-bordered w-full text-sm sm:text-base"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				{error && (
					<p className="text-red-500 text-sm sm:text-base">{error}</p>
				)}
				<div className="card-actions justify-center my-4 sm:my-5">
					<button
						className="btn btn-primary btn-md sm:btn-md w-full sm:w-auto"
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
				<div className="flex justify-center text-sm sm:text-base">
					{isLogin ? (
						<span>
							Don't have an account?{" "}
							<Link
								to={"/register"}
								className="text-info hover:underline"
							>
								Sign Up
							</Link>
						</span>
					) : (
						<span>
							Have an account?{" "}
							<Link
								to={"/login"}
								className="text-info hover:underline"
							>
								Log In
							</Link>
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
