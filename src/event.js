const makeEvent = (state) => {
  const btnModal = document.querySelectorAll('.btn-mod');

  const { posts } = state;
  const allPosts = [];

  btnModal.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const modalTitle = document.querySelector('.modal-title');
      const linkModal = document.querySelector('.link-modal');
      const modalDescription = document.querySelector('.modal-description');

      const elByid = document.querySelector(`[data-id="${e.target.dataset.id}"]`);
      const title = elByid.textContent;
      const link = elByid.href;

      modalTitle.textContent = title.trim();
      linkModal.href = link;

      state.openLink.push(elByid.href);

      elByid.classList.add('link-secondary');

      for (let i = posts.length - 1; i >= 0; i -= 1) {
        allPosts.push(...posts[i]);
      }

      for (let i = 0; i < allPosts.length - 1; i += 1) {
        const el = allPosts[i];
        if (el.title === title.trim()) {
          modalDescription.innerHTML = el.description;
        }
      }
    });
  });
};

export default makeEvent;
