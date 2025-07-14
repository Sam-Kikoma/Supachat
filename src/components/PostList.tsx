import { useQuery } from "@tanstack/react-query";
import supabase from "../utils/supabase";
import PostItem from "./PostItem";

export interface Post {
	id: number;
	title: string;
	content: string;
	created_at: string;
	image_url: string;
}

const fetchPosts = async (): Promise<Post[]> => {
	const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data as Post[];
};

const PostList = () => {
	const { data, error, isLoading } = useQuery<Post[], Error>({ queryKey: ["posts"], queryFn: fetchPosts });
	if (isLoading) {
		<div>
			<p>Loading....</p>
		</div>;
	}
	if (error) {
		<div role="alert" className="alert alert-error alert-soft">
			<span>Error loading posts.</span>
		</div>;
	}
	console.log(data);

	return (
		<div className="flex flex-col md:flex-row gap-4 flex-wrap">
			{data?.map((post, key) => (
				<PostItem post={post} key={key} />
			))}
		</div>
	);
};

export default PostList;
