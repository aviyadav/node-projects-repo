// import { getAllPosts } from './postController.js';

import getAllPosts, { getPostsLength } from './postController.js';

const posts = getAllPosts();
console.log('All Posts:', posts);
console.log('Total Number of Posts:', getPostsLength());


