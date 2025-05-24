const UserCard = (props) => {
	const { user, isEdit = false, handleSendRequest } = props;
	const { photoUrl, firstName, lastName, age, gender, about, _id } =
		user || {};
	return (
		<div className="card bg-base-200 w-full max-w-xs sm:max-w-sm shadow-sm">
			<figure>
				<img
					src={
						photoUrl ||
						"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
					}
					alt="photo"
					// className="w-full h-50 sm:h-55 object-cover"
				/>
			</figure>
			<div className="card-body p-4 sm:p-6">
				<h2 className="card-title text-lg sm:text-xl capitalize">{`${firstName} ${
					lastName || ""
				}`}</h2>
				{age && gender && (
					<p className="text-sm sm:text-base capitalize">{`${age}, ${gender}`}</p>
				)}
				<p className="text-sm sm:text-base">
					{about || "No bio available"}
				</p>
				{!isEdit && (
					<div className="card-actions justify-center my-4 sm:my-5 gap-3 sm:gap-4">
						<button
							className="btn btn-primary btn-sm sm:btn-md w-1/3 sm:w-auto"
							onClick={() => handleSendRequest("ignored", _id)}
						>{`Ignored`}</button>
						<button
							className="btn btn-neutral btn-sm sm:btn-md w-1/3 sm:w-auto"
							onClick={() => handleSendRequest("interested", _id)}
						>{`Interested`}</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserCard;
