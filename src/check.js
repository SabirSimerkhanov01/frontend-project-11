import axios from 'axios';
import parser from './parser.js';

const getDifference = (oldObj, newObj) => {
  const oldPosts = oldObj.posts;
  const newPosts = newObj.posts;
  for (let i = newPosts.length - 1; i >= 0; i -= 1) {
    const newLinks = newPosts[i].map((el) => el.link);
    const oldLinks = oldPosts[i].map((el) => el.link);
    const filtered = newLinks.filter((el) => !oldLinks.includes(el));
    const dataOfFilt = newPosts[i].filter((el) => filtered.includes(el.link));
    oldPosts[i].push(...dataOfFilt);
  }
};
const check = (state) => {
  const { feeds } = state;
  const newState = {
    posts: [],
    feeds: [],
  };
  const promises = feeds.map((feed) => {
    const agent = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(feed.link)}`;
    return axios.get(agent)
      .then((response) => {
        const data = response.data.contents;
        return parser(data, feed.link);
      })
      .catch((e) => e);
  });
  Promise.all(promises)
    .then((data) => {
      data.forEach((el) => {
        const newPosts = el.posts;
        const newFeeds = el.feeds;
        newState.posts.push(newPosts);
        newState.feeds.push(newFeeds);
      });
    })
    .then(() => getDifference(state, newState))
    .catch((e) => {
      console.log(e);
    });
};
export default check;
