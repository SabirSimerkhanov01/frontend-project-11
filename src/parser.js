const parser = (data, url) => {
  const feeds = {
    name: '',
    link: '',
    description: '',
  };

  const domParser = new DOMParser();
  const doc = domParser.parseFromString(data, 'text/xml');
  const titleOfFeed = doc.querySelector('title');
  const desOfFeed = doc.querySelector('description');
  const errorNode = doc.querySelector('parsererror');
  if (errorNode) {
    throw new Error('rss');
  }
  if (titleOfFeed === null) {
    throw new Error('rss');
  }
  if (titleOfFeed.textContent === 'Just a moment...') {
    throw new Error('rss');
  }
  feeds.name = titleOfFeed.textContent;
  feeds.link = url;
  feeds.description = desOfFeed.textContent;
  const posts = [];
  const items = doc.querySelectorAll('item');
  items.forEach((el) => {
    const titleOfPost = el.querySelector('title');
    const desOfPost = el.querySelector('description');
    const linkOfPost = el.querySelector('link');
    posts.push({
      title: titleOfPost.textContent,
      link: linkOfPost.textContent,
      description: desOfPost.textContent,
    });
  });

  return {
    feeds,
    posts,
  };
};

export default parser;
