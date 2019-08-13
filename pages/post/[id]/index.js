import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../../../components/header";
import Layout from "../../../components/MyLayout";

const Post = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Layout>
            <h1>Post: {id}</h1>
            <ul>
                <li>
                    <Link
                        href="/post/[id]/[comment]"
                        as={`/post/${id}/first-comment`}
                    >
                        <a>First comment</a>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/post/[id]/[comment]"
                        as={`/post/${id}/second-comment`}
                    >
                        <a>Second comment</a>
                    </Link>
                </li>
            </ul>
        </Layout>
    );
};
export default Post;
