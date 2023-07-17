const render = (state) => {
    const docPosts = document.querySelector('.posts');
    const docFeeds = document.querySelector('.feeds');

    const {
        language,
        feeds,
        posts,
    } = state;

    const nameFeed = language === 'en' ? 'Feeds' : 'Фиды';
    const namePost = language === 'en' ? 'Posts' : 'Посты';

    let allFeeds = [];
    let allPosts = [];
    let everyPost = [];

    for (let i = feeds.length - 1; i >= 0; i -= 1) {
        allFeeds.push(
            `<h3 class="h6 m-0">${feeds[i].name}</h3>`,
            `<p class="m-0 small text-black-50">${feeds[i].description}</p>`,
        );
    }

    for (let i = posts.length - 1; i >= 0; i -= 1) {
        allPosts.push(...posts[i]);
    }

    for (let i = 0; i < allPosts.length - 1; i += 1) {
        let el = allPosts[i];

        everyPost.push(
            `
            <ul class="list-group border-0 rounded-0">
                <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">

                <a href="${el.link}" class="fw-bold" data-id="${i}" target="_blank" rel="noopener noreferrer">
                    ${el.title}
                </a>

            <button type="button" class="btn btn-outline-primary btn-sm btn-mod" data-id="${i}" data-bs-toggle="modal" data-bs-target="#modal">
                Просмотр
            </button>

                </li>
            </ul>
    `,
        );
    }

    const div = document.createElement('div');
    div.classList.add('card', 'border-0');
    div.innerHTML = `
    <div class="card-body">
        <h2 class="card-title h4">${nameFeed}</h2>
        ${allFeeds.join('\n')}
    </div>
    `;

    const div2 = document.createElement('div');
    div2.classList.add('card', 'border-0');
    div2.innerHTML = `
    <div class="card-body">
        <h2 class="card-title h4">${namePost}</h2>
    </div>
    ${everyPost.join('\n')}
    `;

    docFeeds.innerHTML = div.innerHTML;
    docPosts.innerHTML = div2.innerHTML;

    state.openLink.forEach((href) => {
        const postsHtml = document.querySelector('.posts');
        const el = postsHtml.querySelector(`[href="${href}"]`);
        el.classList.add('link-secondary');
    });
};

export default render;