import { useNavigate } from "react-router-dom";

const ListItem = (props) => {
	const { listData, isRequest = false, handleReviewRequest } = props;
	const navigate = useNavigate();
	const { photoUrl, firstName, lastName, age, gender, about, _id } =
		listData || {};

	return (
		<li
			className="flex items-center gap-3 sm:gap-4 py-3 sm:py-4 border-b border-base-200 last:border-b-0"
			key={_id}
		>
			<div>
				<img
					className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover"
					src={
						photoUrl ||
						"https://img.daisyui.com/images/profile/demo/1@94.webp"
					}
					alt="User photo"
				/>
			</div>
			<div className="flex-1 min-w-0">
				<div className="capitalize font-semibold text-sm sm:text-base">{`${firstName} ${
					lastName || ""
				}`}</div>
				{age && gender && (
					<div className="text-xs sm:text-sm capitalize opacity-60 mt-1">
						{`${age}, ${gender}`}
					</div>
				)}
				<div className="text-xs sm:text-sm normal-case opacity-60 mt-0.5 truncate">
					{about || "No bio available"}
				</div>
			</div>
			{isRequest ? (
				<div className="flex items-center gap-2 sm:gap-3">
					<div className="tooltip tooltip-bottom" data-tip="Reject">
						<button
							className="btn btn-square btn-ghost btn-xs sm:btn-sm"
							onClick={() => handleReviewRequest("rejected", _id)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-5 sm:w-6 h-5 sm:h-6"
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
							className="btn btn-square btn-ghost btn-xs sm:btn-sm"
							onClick={() => handleReviewRequest("accepted", _id)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-5 sm:w-6 h-5 sm:h-6"
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
			) : (
				<div className="flex items-center gap-2 sm:gap-3">
					<div className="tooltip tooltip-bottom" data-tip="Chat">
						<button
							className="btn btn-square btn-ghost btn-xs sm:btn-sm"
							onClick={() => navigate(`/chat/${_id}`)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 sm:w-6 h-5 sm:h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
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
