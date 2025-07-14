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

	const { mutate, isPending, isError } = useMutation({
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
		<div className="w-full max-w-md">
			<form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-base-100 p-6 rounded-xl shadow-md">
				<div className="form-control">
					<label className="label" htmlFor="title">
						<span className="label-text">Title</span>
					</label>
					<input
						className="input input-bordered"
						type="text"
						id="title"
						required
						onChange={(event) => setTitle(event.target.value)}
						value={title}
					/>
				</div>

				<div className="form-control">
					<label htmlFor="content" className="label">
						<span className="label-text">Content</span>
					</label>
					<textarea
						className="textarea textarea-bordered"
						id="content"
						required
						rows={5}
						onChange={(event) => setContent(event.target.value)}
						value={content}
					/>
				</div>

				<div className="form-control">
					<label htmlFor="image" className="label">
						<span className="label-text">Upload Image</span>
					</label>
					<input
						type="file"
						id="image"
						required
						accept="image/*"
						onChange={handleFileChange}
						className="file-input file-input-bordered"
					/>
				</div>

				<button className="btn btn-info mt-2" type="submit">
					{isPending ? <span className="loading loading-spinner" /> : "Create Post"}
				</button>

				{isError && (
					<div role="alert" className="alert alert-error mt-2">
						<span>Error creating post</span>
					</div>
				)}
			</form>
		</div>
	);
};

export default CreatePost;
