const render = (state) => {
    const urlInput = document.getElementById('url-input');
    const docPosts = document.querySelector('.posts');
    const docFeeds = document.querySelector('.feeds');

    const {
        inputForm,
        language,
        feeds,
        posts,
        error,
    } = state;

    const nameFeed = language === 'en' ? 'Feeds' : 'Фиды';
    const namePost = language === 'en' ? 'Posts' : 'Посты';

    let allFeeds = [];
    let allPosts = [];

    for (let i = feeds.length - 1; i >= 0; i -= 1) {
        allFeeds.push(
            `<h3 class="h6 m-0">${feeds[i].name}</h3>`,
            `<p class="m-0 small text-black-50">${feeds[i].description}</p>`,
        );
    }

    posts.forEach((el) => {
        console.log(el);
    });

    const div = document.createElement('div');
    div.classList.add('card', 'border-0');
    div.innerHTML = `
    <div class="card-body">
        <h2 class="card-title h4">${nameFeed}</h2>
    </div>
        <ul class="list-group">
            <li>
                ${allFeeds.join('\n')}
            </li>
        </ul>
    `;

    const div2 = document.createElement('div');
    div2.classList.add('card', 'border-0');
    div2.innerHTML = `
    <div class="card-body">
    <h2 class="card-title h4">${namePost}</h2>
</div>
    <ul class="list-group">
        ${allPosts.join('\n')}
    </ul>
    `;

    docFeeds.innerHTML = div.innerHTML;
};

export default render;
