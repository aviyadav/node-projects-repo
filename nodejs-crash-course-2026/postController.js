const posts = [
    { id: 1, title: "First Post", content: "This is the first post." },
    { id: 2, title: "Second Post", content: "This is the second post." },
    { id: 3, title: "Third Post", content: "This is the third post." },
];

const getAllPosts = () => posts;

const getPostsLength = () => posts.length;

export { getPostsLength };

export default getAllPosts;