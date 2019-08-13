import { useRouter } from "next/router";
import Markdown from "react-markdown";
import Layout from "../../components/MyLayout";
const Post = props => {
    let router = useRouter();
    console.log(router);
    return (
        <Layout>
            <h1>{router.query.id}</h1>
        </Layout>
    );
};

export default Post;
