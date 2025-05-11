const ListItem = (props) => {
	const { listData, isRequest = false, handleReviewRequest } = props;
	const { photoUrl, firstName, lastName, age, gender, about, _id } =
		listData || {};

	return (
		<li className="list-row" key={_id}>
			<div>
				<img
					className="size-11 rounded-full"
					src={
						photoUrl ||
						"https://img.daisyui.com/images/profile/demo/1@94.webp"
					}
				/>
			</div>
			<div>
				<div className="capitalize font-semibold">{`${firstName} ${
					lastName || ""
				}`}</div>
				{age && gender && (
					<div className="text-xs capitalize font-semibold opacity-60 mt-1.5">
						{`${age}, ${gender}`}
					</div>
				)}
				<div className="text-xs normal-case font-semibold opacity-60 w-100 mt-0.5">
					{about}
				</div>
			</div>
			{isRequest && (
				<div className="flex items-center gap-1">
					<div className="tooltip tooltip-bottom" data-tip="Reject">
						<button
							className="btn btn-square btn-ghost"
							onClick={() => handleReviewRequest("rejected", _id)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="size-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18 18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<div className="tooltip tooltip-bottom" data-tip="Accept">
						<button
							className="btn btn-square btn-ghost"
							onClick={() => handleReviewRequest("accepted", _id)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="size-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m4.5 12.75 6 6 9-13.5"
								/>
							</svg>
						</button>
					</div>
				</div>
			)}
		</li>
	);
};

export default ListItem;
