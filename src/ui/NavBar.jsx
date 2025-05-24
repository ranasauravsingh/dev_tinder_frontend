import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { REQUEST_LOGOUT } from "../services/auth";
import { handleError } from "../helpers/common_functions";
import { removeUser } from "../store/userSlice";

const NavBar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const dropdownRef = useRef(null);

	const userState = useSelector((state) => state?.user);

	const handleLogout = () => {
		REQUEST_LOGOUT()
			.then(() => {
				navigate("/login");
				dispatch(removeUser());
			})
			.catch((err) => {
				handleError(err);
			});
	};

	const closeDropdown = () => {
		if (dropdownRef.current) {
			dropdownRef.current.blur();
			document.activeElement.blur();
		}
	};

	const handleMenuItemClick = (callback) => {
		closeDropdown();
		if (callback) callback();
	};

	return (
		<div className="navbar bg-base-300 shadow-sm px-4">
			<div className="flex-1">
				<Link to={"/"} className="btn btn-ghost text-xl">
					DevTinder
				</Link>
			</div>
			{userState && (
				<div className="flex items-center gap-3 sm:gap-5 mx-2 sm:mx-5">
					<span className="self-center capitalize">
						{userState?.firstName || "Nobody"}
					</span>
					<div className="dropdown dropdown-end">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle avatar"
							ref={dropdownRef}
						>
							<div className="w-8 sm:w-10 rounded-full">
								<img
									alt="avatar image"
									src={
										userState?.photoUrl ||
										"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
									}
								/>
							</div>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 sm:w-52 p-2 shadow"
						>
							<li>
								<Link
									to={"/profile"}
									className="justify-between"
									onClick={() => handleMenuItemClick()}
								>
									Profile
								</Link>
							</li>
							<li>
								<Link
									to={"/connections"}
									className="justify-between"
									onClick={() => handleMenuItemClick()}
								>
									Connections
								</Link>
							</li>
							<li>
								<Link
									to={"/requests"}
									className="justify-between"
									onClick={() => handleMenuItemClick()}
								>
									Requests
								</Link>
							</li>
							<li>
								<a
									onClick={() =>
										handleMenuItemClick(handleLogout)
									}
								>
									Logout
								</a>
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default NavBar;
