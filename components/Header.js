import Link from "next/link";

const linkStyle = {
    marginRight: 15
};

export default function Header() {
    return (
        <div>
            <Link href="/">
                <a style={linkStyle}>Home</a>
            </Link>
            <Link href="/about">
                <a style={linkStyle}>About</a>
            </Link>
            <Link href="/post/[id]" as="/post/first">
                <a style={linkStyle}>First Post</a>
            </Link>
            <Link href="/post/[id]" as="/post/second">
                <a style={linkStyle}>Second Post</a>
            </Link>
        </div>
    );
}
