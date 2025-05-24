import { useState } from "react";
import { useDispatch } from "react-redux";

import UserCard from "../ui/UserCard";
import { REQUEST_PROFILE_EDIT } from "../services/profile";
import { handleError } from "../helpers/common_functions";
import { addUser } from "../store/userSlice";

const EditProfile = (props) => {
	const { user } = props;

	const dispatch = useDispatch();

	const [firstName, setFirstName] = useState(user?.firstName || "");
	const [lastName, setLastName] = useState(user?.lastName || "");
	const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
	const [age, setAge] = useState(user?.age || "");
	const [gender, setGender] = useState(user?.gender || "");
	const [about, setAbout] = useState(user?.about || "");
	const [error, setError] = useState("");
	const [toast, setToast] = useState("");

	const handleSaveProfile = () => {
		const requestPayload = {
			firstName,
			lastName,
			age,
			gender,
			about,
			photoUrl,
		};
		REQUEST_PROFILE_EDIT(requestPayload)
			.then((res) => {
				const updatedProfileData = res?.data?.data;
				if (updatedProfileData) {
					setError("");
					dispatch(addUser(updatedProfileData));
				}
				if (res?.data?.message) {
					setToast(res?.data?.message);
					setTimeout(() => {
						setToast("");
					}, 3000);
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
		<div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-6 my-6 sm:my-10">
			<div className=" w-full max-w-xs sm:max-w-sm">
				<div className="card bg-base-200 shadow-sm border border-base-300">
					<div className="card-body p-4 sm:p-6">
						<h2 className="card-title text-lg sm:text-xl flex justify-center">
							Edit Profile
						</h2>

						<div className="my-2 sm:my-3">
							<label className="label text-sm sm:text-base">
								First Name
							</label>
							<input
								type="text"
								className="input input-bordered w-full text-sm sm:text-base"
								placeholder="First Name"
								value={firstName}
								onChange={(e) => setFirstName(e?.target?.value)}
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
								onChange={(e) => setLastName(e?.target?.value)}
							/>
						</div>
						<div className="my-2 sm:my-3">
							<label className="label text-sm sm:text-base">
								Photo Url
							</label>
							<textarea
								className="textarea textarea-bordered w-full text-sm sm:text-base"
								placeholder="Photo Url"
								value={photoUrl}
								onChange={(e) => setPhotoUrl(e?.target?.value)}
							></textarea>
						</div>
						<div className="my-2 sm:my-3">
							<label className="label text-sm sm:text-base">
								Age
							</label>
							<input
								type="text"
								className="input input-bordered w-full text-sm sm:text-base"
								placeholder="Age"
								value={age}
								onChange={(e) => setAge(e?.target?.value)}
							/>
						</div>
						<div className="my-2 sm:my-3 flex items-center gap-3 sm:gap-4">
							<div className="dropdown dropdown-right w-25">
								<div
									tabIndex={0}
									role="button"
									className="btn btn-sm sm:btn-md"
								>{`Gender`}</div>
								<ul
									tabIndex={0}
									className="menu dropdown-content bg-base-100 rounded-box z-[1] w-40 sm:w-52 p-2 shadow-sm"
								>
									<li>
										<a
											className={
												gender === "male"
													? `active`
													: ""
											}
											onClick={() => {
												setGender("male");
											}}
										>
											Male
										</a>
									</li>
									<li>
										<a
											className={
												gender === "female"
													? `active`
													: ""
											}
											onClick={() => {
												setGender("female");
											}}
										>
											Female
										</a>
									</li>
								</ul>
							</div>
							<div className="text-sm sm:text-base capitalize">
								{gender}
							</div>
						</div>
						<div className="my-2 sm:my-3">
							<label className="label text-sm sm:text-base">
								About
							</label>
							<textarea
								className="textarea textarea-bordered w-full text-sm sm:text-base"
								placeholder="About"
								value={about}
								onChange={(e) => setAbout(e?.target?.value)}
							></textarea>
						</div>
						{error && (
							<p className="text-red-500 text-sm sm:text-base">
								{error}
							</p>
						)}
						<div className="card-actions justify-center mt-4 sm:mt-5">
							<button
								className="btn btn-neutral btn-sm sm:btn-md w-full sm:w-auto"
								onClick={handleSaveProfile}
							>
								Save Profile
							</button>
						</div>
					</div>
				</div>
			</div>
			<UserCard
				user={{ photoUrl, firstName, lastName, age, gender, about }}
				isEdit={true}
			/>
			{toast && (
				<div className="toast toast-bottom toast-end z-[1]">
					<div className="alert alert-success text-sm sm:text-base">
						<span>{toast}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default EditProfile;
