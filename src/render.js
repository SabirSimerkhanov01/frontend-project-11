const render = (state) => {
    const urlInput = document.getElementById('url-input');
    const {
        language,
        feeds,
        posts,
        error,
        states,
    } = state;

    for (let i = 0; i < feeds.length; i += 1) {
        console.log(feeds[i]);
        console.log(posts[i]);
    }
};

export default render;
