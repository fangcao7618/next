import Layout from "../../components/MyLayout";
import Markdown from "react-markdown";
import fetch from "isomorphic-unfetch";

const Show = props => (
    <Layout>
        <h1>{props.show.name}</h1>
        <p>{props.show.summary.replace(/<[/]?p>/g, "")}</p>
        <img src={props.show.image.medium} />

        <div className="markdown">
            <Markdown
                source={`
                markdown 测试，
Yes. We can have a [link](/link).
And we can have a title as well.

### This is a title

And here's the content.
                `}
            />
        </div>
        <style jsx global>
            {`
                .markdown {
                    font-family: "Arial";
                }
                .markdown a {
                    text-decoration: none;
                    color: blue;
                }

                .markdown a:hover {
                    opacity: 0.6;
                }

                .markdown h3 {
                    color: red;
                    margin: 0;
                    padding: 0;
                    text-transform: uppercase;
                }
            `}
        </style>
    </Layout>
);

Show.getInitialProps = async function(context) {
    const { id } = context.query;
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const show = await res.json();

    console.log(`Fetched show: ${show.name}`);

    return { show };
};

export default Show;
