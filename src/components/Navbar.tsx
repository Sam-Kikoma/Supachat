import { useEffect, useState } from "react";
import { Link } from "react-router";
import { SlMenu, SlClose } from "react-icons/sl";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
	const [menu, setMenu] = useState(false);
	const { user, signInWithGithub, signOut } = useAuth();
	const handleClick = () => {
		setMenu(!menu);
	};

	const displayName = user?.user_metadata.user_name || user?.email;

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768 && menu) {
				setMenu(false);
			}
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [menu]);

	return (
		<nav className="relative border-b-2 border-b-blue-200">
			<div className="flex items-center justify-between p-4 md:grid md:grid-cols-3 md:gap-4">
				{/* Left: Logo */}
				<div className="flex-none md:justify-self-start">
					<Link to={"/"} className="text-lg font-bold">
						Supachat
					</Link>
				</div>

				{/* Middle: Nav links */}
				<div className="hidden md:flex justify-center gap-4">
					<Link to="/">Home</Link>
					<Link to="/create">New post</Link>
					<Link to="/communities">Communities</Link>
					<Link to="/community/create">New community</Link>
				</div>

				{/* Right: Auth */}
				<div className="hidden md:flex gap-2 items-center justify-self-end">
					{user ? (
						<>
							{user.user_metadata.avatar_url && (
								<img src={user.user_metadata.avatar_url} alt="User avatar" className="w-10 h-10 rounded-full" />
							)}
							<span className="px-2">{displayName}</span>
							<button onClick={signOut} className="btn btn-outline btn-error btn-sm">
								Sign Out
							</button>
						</>
					) : (
						<button onClick={signInWithGithub} className="btn btn-outline btn-sm">
							Sign in with GitHub
						</button>
					)}
				</div>

				{/* Mobile menu toggle */}
				<div className="md:hidden ml-auto">
					{menu ? (
						<SlClose className="text-xl" onClick={handleClick} />
					) : (
						<SlMenu className="text-xl" onClick={handleClick} />
					)}
				</div>
			</div>

			{/* Mobile menu content */}
			<div
				className={`${
					menu ? "absolute flex flex-col gap-4 items-center w-full bg-base-100 py-6 z-10" : "hidden"
				} md:hidden transition-all duration-300`}
			>
				<Link to="/">Home</Link>
				<Link to="/create">New post</Link>
				<Link to="/communities">Communities</Link>
				<Link to="/community/create">New community</Link>
			</div>
		</nav>
	);
};

export default Navbar;
