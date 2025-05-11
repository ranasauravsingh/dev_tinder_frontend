const UserCard = (props) => {
	const { user, isEdit = false } = props;
	const { photoUrl, firstName, lastName, age, gender, about } = user || {};
	return (
		<div className="card bg-base-200 w-76 shadow-sm">
			<figure>
				<img
					src={
						photoUrl ||
						"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
					}
					alt="photo"
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title capitalize">{`${firstName} ${
					lastName || ""
				}`}</h2>
				{age && gender && (
					<p className="capitalize">{`${age}, ${gender}`}</p>
				)}
				<p>{about || ""}</p>
				{!isEdit && (
					<div className="card-actions justify-center my-5">
						<button className="btn btn-primary">{`Ignored`}</button>
						<button className="btn btn-neutral">{`Interested`}</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserCard;
