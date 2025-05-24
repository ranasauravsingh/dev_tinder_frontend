import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="footer footer-center bg-base-300 text-base-content p-4 sm:p-6 fixed bottom-0 w-full">
			<aside>
				<p className="text-sm sm:text-base">
					Made with passion by{" "}
					<Link
						to="https://ranasauravsingh.site"
						target="_blank"
						rel="noopener noreferrer"
						className="text-info hover:underline"
					>
						ranasauravsingh
					</Link>{" "}
					{new Date().getFullYear()}
				</p>
			</aside>
		</footer>
	);
};

export default Footer;
