const ListItem = (props) => {
	const { listData } = props;
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
			{/* <button className="btn btn-square btn-ghost">
				<svg
					className="size-[1.2em]"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<g
						strokeLinejoin="round"
						strokeLinecap="round"
						strokeWidth="2"
						fill="none"
						stroke="currentColor"
					>
						<path d="M6 3L20 12 6 21 6 3z"></path>
					</g>
				</svg>
			</button>
			<button className="btn btn-square btn-ghost">
				<svg
					className="size-[1.2em]"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<g
						strokeLinejoin="round"
						strokeLinecap="round"
						strokeWidth="2"
						fill="none"
						stroke="currentColor"
					>
						<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
					</g>
				</svg>
			</button> */}
		</li>
	);
};

export default ListItem;
