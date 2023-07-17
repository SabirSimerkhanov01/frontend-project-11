import axios from 'axios';
import parser from './parser.js';
import render from './render.js';
import makeEvent from './event.js';

const getDifference = (newState, oldState) => {
    const difLinks = [];

    for (let i = 0; i < newState.length; i += 1) {
        const newLinks = [];
        const oldLinks = [];

        newState[i].forEach((el) => {
            newLinks.push(el.link);
        });

        oldState[i].forEach((el) => {
            oldLinks.push(el.link)
        });

        newLinks.map((newLink) => {
            if (!oldLinks.includes(newLink)) {
                difLinks.push(newLink);
            }
        });
    }

    if (newState.length !== 0) {
        for (let i = 0; i < newState.length; i += 1) {
            for (const dLn of difLinks) {
                for (const nst of newState[i])
                if (nst.link === dLn) {
                    oldState.push(nst);
                }
            }
        }
    }

    return oldState;
};

const check = (state) => {
    const { feeds } = state;
    const newPosts = [];

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
                newPosts.push(el[1]);
            })
        })
        .then(() => {
            return getDifference(newPosts, state.posts);
        })
        .then(() => {
            render(state);
            makeEvent(state);
        })
        .catch((e) => {
            console.log(e);
        });

};
export default check;
