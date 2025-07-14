import CreatePost from "../components/CreatePost";

const CreatePostPage = () => {
	return (
		<div className="max-w-[350px] border-2 border-amber-100 flex flex-col p-2 rounded-lg">
			<h2 className="block text-center text-2xl">New Post</h2>
			<CreatePost />
		</div>
	);
};

export default CreatePostPage;
