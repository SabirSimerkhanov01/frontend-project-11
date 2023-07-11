const parser = (data, url) => {
    const state = {
        feed: {
            name: '',
            link: '',
            description: '',
        },
        posts: [],
    }

    const domParser = new DOMParser();
    const doc = domParser.parseFromString(data, 'text/xml');
    const titleOfFeed = doc.querySelector('title');
    const desOfFeed = doc.querySelector('description');

    const errorNode = doc.querySelector('parsererror');
    if (errorNode) {
        throw new Error('parsererror');
    }

    if (titleOfFeed === null) {
        throw new Error('parsererror');
    }

    if (titleOfFeed.textContent === 'Just a moment...') {
        throw new Error('parsererror');
    }

    state.feed.name = titleOfFeed.textContent;
    state.feed.link = url;
    state.feed.description = desOfFeed.textContent;

    const items = doc.querySelectorAll('item');
    items.forEach((el) => {
        const titleOfPost = el.querySelector('title');
        const desOfPost = el.querySelector('description');
        const linkOfPost = el.querySelector('link');

        state.posts.push({
            name: titleOfPost.textContent,
            link: linkOfPost.textContent,
            description: desOfPost.textContent,
        })
    })

    const feed = state.feed;
    const posts = state.posts;
    return {
        feed: feed,
        posts: posts,
    };
};

export default parser;
