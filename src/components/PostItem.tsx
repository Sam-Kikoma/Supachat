import { Link } from "react-router";
import type { Post } from "./PostList";

interface Props {
	post: Post;
}

const PostItem = ({ post }: Props) => {
	return (
		<Link to="/post" className="card bg-zinc-900 w-96 shadow-sm">
			<figure>
				<img src={post.image_url} />
			</figure>
			<div className="card-body flex-row justify-between">
				<h2 className="card-title">{post.title}</h2>
				<img alt="" className="btn btn-ghost btn-circle avatar" />
			</div>
		</Link>
	);
};
export default PostItem;
