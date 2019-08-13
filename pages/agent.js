import { useAmp } from "next/amp";

// export const config = { amp: "hybrid" };
export const config = { amp: true };

const Agent = ({ userAgent }) => {
    const isAmp = useAmp();
    return (
        <>
            <h1>Your user agent is: {userAgent}</h1>
            <p>Welcome to the {isAmp ? "AMP" : "normal"} only Index page!!</p>
        </>
    );
};

Agent.getInitialProps = async ({ req }) => {
    const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
    return { userAgent };
};

export default Agent;
