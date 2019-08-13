const fetch = require("isomorphic-unfetch");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
module.exports = {
    // target: "serverless",
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
        server: {
            analyzerMode: "static",
            reportFilename: "../bundles/server.html"
        },
        browser: {
            analyzerMode: "static",
            reportFilename: "../bundles/client.html"
        }
    },
    // exportTrailingSlash: true,
    exportPathMap: async function() {
        const paths = {
            "/": { page: "/" },
            "/about": { page: "/about" }
            // "/agent": { page: "/agent" }
        };
        const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
        const data = await res.json();
        const shows = data.map(entry => entry.show);

        function getPosts() {
            return [
                { id: "hello-nextjs", title: "Hello Next.js" },
                {
                    id: "learn-nextjs",
                    title: "Learn Next.js is awesome"
                },
                { id: "deploy-nextjs", title: "Deploy apps with ZEIT" }
            ];
        }

        shows.forEach(show => {
            paths[`/show/${show.id}`] = {
                page: "/show/[id]",
                query: { id: show.id }
            };
        });

        getPosts().forEach(show => {
            paths[`/p/${show.id}`] = {
                page: "/p/[id]",
                query: { id: show.id }
            };
        });

        console.log(paths);
        return paths;
    }
};
