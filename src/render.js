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

  const allFeeds = [];
  const allPosts = [];
  const everyPost = [];

  feeds.forEach((feed) => {
    allFeeds.push(
      `<h3 class="h6 m-0">${feed.name}</h3>`,
      `<p class="m-0 small text-black-50">${feed.description}</p>`,
    );
  });

  posts.forEach((post) => {
    allPosts.push(...post);
  });

  allPosts.forEach((el) => {
    everyPost.push(
      `
      <ul class="list-group border-0 rounded-0">
      <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">

      <a href="${el.link}" class="fw-bold" data-id="${allPosts.indexOf(el)}" target="_blank" rel="noopener noreferrer">
        ${el.title}
      </a>

      <button type="button" class="btn btn-outline-primary btn-sm btn-mod" data-id="${allPosts.indexOf(el)}" data-bs-toggle="modal" data-bs-target="#modal">
        Просмотр
      </button>

        </li>
      </ul>
    `,
    );
  });

  if (allPosts.length !== 0) {
    docFeeds.innerHTML = `
        <div class="card border-0">
            <div class="card-body">
                <h2 class="card-title h4">${nameFeed}</h2>
                ${allFeeds.join('\n')}
            </div>
        </div>
    `;
    docPosts.innerHTML = `
      <div class="card border-0">
        <div class="card-body">
          <h2 class="card-title h4">${namePost}</h2>
            </div>
              ${everyPost.join('\n')}
            </div>
    `;
  }

  state.openLink.forEach((href) => {
    const postsHtml = document.querySelector('.posts');
    const el = postsHtml.querySelector(`[href="${href}"]`);
    el.classList.add('link-secondary');
  });
};

export default render;
