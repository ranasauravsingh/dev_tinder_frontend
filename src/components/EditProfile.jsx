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
                if(res?.data?.message) {
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
		<div>
			<div className="flex items-start justify-center gap-5 my-10">
				<div className="flex justify-center">
					<div className="card card-border bg-base-200 w-86">
						<div className="card-body">
							<h2 className="card-title flex justify-center">
								Edit Profile
							</h2>

							<div className="my-1">
								<label className="label">First Name</label>
								<input
									type="text"
									className="input"
									placeholder="First Name"
									value={firstName}
									onChange={(e) =>
										setFirstName(e?.target?.value)
									}
								/>
							</div>
							<div className="my-1">
								<label className="label">Last Name</label>
								<input
									type="text"
									className="input"
									placeholder="Last Name"
									value={lastName}
									onChange={(e) =>
										setLastName(e?.target?.value)
									}
								/>
							</div>
							<div className="my-1">
								<label className="label">Photo Url</label>
								<textarea
									className="textarea"
									placeholder="Photo Url"
									value={photoUrl}
									onChange={(e) =>
										setPhotoUrl(e?.target?.value)
									}
								></textarea>
							</div>
							<div className="my-1">
								<label className="label">Age</label>
								<input
									type="text"
									className="input"
									placeholder="Age"
									value={age}
									onChange={(e) => setAge(e?.target?.value)}
								/>
							</div>
							<div className="my-1 flex items-center gap-5">
								<div className="dropdown dropdown-right w-25">
									<div
										tabIndex={0}
										role="button"
										className="btn m-1"
									>{`Gender`}</div>
									<ul
										tabIndex={0}
										className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
									>
										<li>
											<a
												className={
													gender === "male"
														? `menu-active`
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
														? `menu-active`
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
								<div className="capitalize">{gender}</div>
							</div>
							<div className="my-1">
								<label className="label">About</label>
								<textarea
									className="textarea"
									placeholder="About"
									value={about}
									onChange={(e) => setAbout(e?.target?.value)}
								></textarea>
							</div>
							{error && <p className="text-red-500">{error}</p>}
							<div className="card-actions justify-center mt-5">
								<button
									className="btn btn-neutral"
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
			</div>
			{toast && (
				<div className="toast toast-top toast-end">
					<div className="alert alert-success">
						<span>{toast}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default EditProfile;
