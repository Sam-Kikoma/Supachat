import { useState } from "react";

const CreatePost = () => {
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	return (
		<div>
			<form action="">
				<div>
					<label htmlFor="title">Title</label>
					<input type="text" id="title" required onChange={(event) => setTitle(event.target.value)} />
				</div>
				<div>
					<label htmlFor="content">Content</label>
					<textarea id="content" required rows={5} onChange={(event) => setContent(event.target.value)} />
				</div>
				<button className="btn btn-soft btn-info" type="submit">
					Create Post
				</button>
			</form>
		</div>
	);
};

export default CreatePost;
