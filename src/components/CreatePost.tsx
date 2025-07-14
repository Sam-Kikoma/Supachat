import { useState, type ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import supabase from "../utils/supabase";

interface PostInput {
	title: string;
	content: string;
}

const createPost = async (post: PostInput, imageFile: File) => {
	const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;
	const { error: uploadError } = await supabase.storage.from("supachat").upload(filePath, imageFile);
	if (uploadError) throw new Error(uploadError.message);

	const { data: publicURLData } = supabase.storage.from("supachat").getPublicUrl(filePath);
	const { data, error } = await supabase.from("posts").insert({ ...post, image_url: publicURLData.publicUrl });
	if (error) throw new Error(error.message);
	return data;
};

const CreatePost = () => {
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const { mutate } = useMutation({
		mutationFn: (data: { post: PostInput; imageFile: File }) => {
			return createPost(data.post, data.imageFile);
		},
		onSuccess: () => {
			setTitle("");
			setContent("");
		},
	});

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (!selectedFile) return;
		mutate({ post: { title, content }, imageFile: selectedFile });
		setTitle("");
		setContent("");
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setSelectedFile(e.target.files[0]);
		}
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
				<div>
					<label htmlFor="image">Upload Image</label>
					<input type="file" id="image" required accept="image/*" onChange={handleFileChange} />
				</div>
				<button className="btn btn-soft btn-info mt-2" type="submit">
					Create Post
				</button>
			</form>
		</div>
	);
};

export default CreatePost;
