import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import supabase from "../utils/supabase";

interface PostInput {
	title: string;
	content: string;
}

const createPost = async (post: PostInput) => {
	const { data, error } = await supabase.from("posts").insert(post);
	if (error) throw new Error(error.message);
	return data;
};

const CreatePost = () => {
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");

	const { mutate } = useMutation({
		mutationFn: createPost,
		onSuccess: () => {
			setTitle("");
			setContent("");
		},
	});

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		mutate({ title, content });
		setTitle("");
		setContent("");
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label className="block" htmlFor="title">
						Title
					</label>
					<input
						className="input block"
						type="text"
						id="title"
						required
						onChange={(event) => setTitle(event.target.value)}
						value={title}
					/>
				</div>
				<div>
					<label htmlFor="content" className="block">
						Content
					</label>
					<textarea
						className="textarea block"
						id="content"
						required
						rows={5}
						onChange={(event) => setContent(event.target.value)}
						value={content}
					/>
				</div>
				<button className="btn btn-soft btn-info" type="submit">
					Create Post
				</button>
			</form>
		</div>
	);
};

export default CreatePost;
