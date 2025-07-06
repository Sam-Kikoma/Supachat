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
		<nav className="relative  border-b-2 border-b-blue-200">
			<div className="flex justify-between p-4">
				<div>
					<Link to={"/"}>Supachat</Link>
				</div>
				{/* Desktop */}
				<div className="hidden md:flex md:gap-4">
					<Link to={"/"}>Home</Link>
					<Link to={"/create"}>New post</Link>
					<Link to={"/communities"}>Communities</Link>
					<Link to={"/community/create"}>New community</Link>
				</div>

				{/* Auth */}
				<div className="hidden md:flex gap-2">
					{user ? (
						<div>
							{user.user_metadata.avatar_url && (
								<img
									src={user.user_metadata.avatar_url}
									alt="User avatar"
									className="btn btn-ghost btn-circle avatar"
								/>
							)}
							<span className="p-4">{displayName}</span>
							<button onClick={signOut} className="cursor-pointer btn btn-outline btn-error">
								Sign Out
							</button>
						</div>
					) : (
						<button onClick={signInWithGithub} className="btn btn-outline cursor-pointer">
							Sign in with Github
						</button>
					)}

					{/* <button>Sign in</button> */}
				</div>

				{/* Mobile buttons */}
				{menu ? (
					<SlClose className="md:hidden" onClick={handleClick} />
				) : (
					<SlMenu className="md:hidden" onClick={handleClick} />
				)}
			</div>
			{/* Mobile */}
			<div
				className={
					menu
						? `absolute flex flex-col gap-10 items-center w-full h-300px bg-red-500 py-4 ease-in-out duration-500`
						: `absolute left-[-100%] ease-in-out duration-500`
				}
			>
				<Link to={"/"}>Home</Link>
				<Link to={"/create"}>New post</Link>
				<Link to={"/communities"}>Communities</Link>
				<Link to={"/community/create"}>New community</Link>
			</div>
		</nav>
	);
};

export default Navbar;
