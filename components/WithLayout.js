import Header from "./Header";

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: "1px solid #ddd"
};

const withLayout = Page => {
    return () => (
        <div style={layoutStyle}>
            HOC高阶
            <Page />
        </div>
    );
};
const Page = () => <p>index</p>;
export default withLayout(Page);
