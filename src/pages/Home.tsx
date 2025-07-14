import PostList from "../components/PostList";

const Page = () => {
	return (
		<div>
			<h2 className="text-center">Recent posts</h2>
			<div className="p-4">
				<PostList />
			</div>
		</div>
	);
};

export default Page;
