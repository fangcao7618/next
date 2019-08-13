import Layout from "../components/MyLayout";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
// import loadDB from "../lib/load-db";
// import Highlight from "react-highlight";
import marked from "marked";
import dynamic from "next/dynamic";

const Highlight = dynamic(() => import("react-highlight"));

function getPosts() {
    return [
        { id: "hello-nextjs", title: "Hello Next.js" },
        { id: "learn-nextjs", title: "Learn Next.js is awesome" },
        { id: "deploy-nextjs", title: "Deploy apps with ZEIT" }
    ];
}

const PostLink = ({ post }) => {
    return (
        <>
            <li>
                <Link href="/show/[id]" as={`/show/${post.id}`}>
                    <a>{post.name}</a>
                </Link>
            </li>
            <style jsx>
                {`
                    h1,
                    a {
                        font-family: "Arial";
                    }
                    ul {
                        padding: 0;
                    }
                    li {
                        list-style: none;
                        margin: 5px 0;
                    }
                    a {
                        text-decoration: none;
                        color: blue;
                    }
                    a:hover {
                        opacity: 0.6;
                    }
                `}
            </style>
        </>
    );
};
const blogPostMarkdown = `export default ()=> (<div><p>Next.js is great</p></div>)`;
const Index = props => (
    <Layout>
        <h1>My Blog</h1>
        <ul>
            {props.shows &&
                props.shows.map(show => <PostLink key={show.id} post={show} />)}
            {getPosts().map(post => (
                <li key={post.id}>
                    <Link href={`/p/${post.id}`}>
                        <a>{post.title}</a>
                    </Link>
                </li>
            ))}
        </ul>
        <style jsx>
            {`
                h1,
                a {
                    font-family: "Arial";
                }
                ul {
                    padding: 0;
                }
                li {
                    list-style: none;
                    margin: 5px 0;
                }
                a {
                    text-decoration: none;
                    color: blue;
                }
                a:hover {
                    opacity: 0.6;
                }
            `}
        </style>
        <h1>Hacker News - Latest</h1>
        <ul>
            {props.stories &&
                props.stories.map(story => (
                    <PostLink
                        key={story.id}
                        id={story.id}
                        title={story.title}
                    />
                ))}
        </ul>
        <Highlight innerHTML>{marked(blogPostMarkdown)}</Highlight>
    </Layout>
);
Index.getInitialProps = async function() {
    const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
    const data = await res.json();
    // console.log(`Show data fetched. Count: ${data.length}`, data);

    // const db = await loadDB();
    // const ids = await db.child("topstories").once("value");
    // let stories = await Promise.all(
    //     ids
    //         .val()
    //         .slice(0, 10)
    //         .map(id =>
    //             db
    //                 .child("item")
    //                 .child(id)
    //                 .once("value")
    //         )
    // );

    // stories = stories.map(s => s.val());

    return {
        shows: data.map(entry => entry.show)
        // stories: stories
    };
};

export default Index;
