import './index.css';
import 'bootstrap';
import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import render from './render.js';
import parser from './parser.js';
import axios from 'axios';
import resources from './locales/index.js';
import event from './event.js';
import check from './check';

const app = () => {
  const rssForm = document.querySelector('.rss-form');
  const titles = document.querySelector('.titles');
  const buttonAdd = document.querySelector('.btn-lg');
  const exampleLink = document.querySelector('.example-link');
  const rssLink = document.querySelector('.rss-link');
  const feedBack = document.querySelector('.feedback');
  const urlInput = document.getElementById('url-input');

  const i18nexts = i18next.createInstance();
  i18nexts
    .init({
      lng: 'ru',
      debug: true,
      resources,
    });

  yup.setLocale({
    mixed: {
      default: i18nexts.t('noError.correct'),
      notOneOf: i18nexts.t('error.notOneOf'),
    },
  });

  const state = {
    inputForm: {
      links: [],
      valid: '',
    },
      language: '',
      feeds: [],
      posts: [],
      openLink: [],
      error: '',
  };

  const addSuccess = () => {
    urlInput.classList.remove('is-invalid');
    feedBack.classList.remove('text-danger');
    feedBack.classList.add('text-success');
    urlInput.classList.add('is-valid');
  };

  const addInvalid = () => {
    urlInput.classList.remove('is-valid');
    feedBack.classList.remove('text-success');
    feedBack.classList.add('text-danger');
    urlInput.classList.add('is-invalid');
  };

  const watchedState = onChange(state, (path, value, previousValue) => {
    render(state);
    event(state);

    if (path === 'error') {
      addInvalid();
      if (value.message === 'this must be a valid URL') {
        feedBack.textContent = i18nexts.t('error.url');
      } else {
        feedBack.textContent = i18nexts.t(`error.${value.name}`);
      }
    }

    if (path === 'inputForm.valid') {
      if (value === true) {
        addSuccess();
        urlInput.value = '';
        feedBack.textContent = i18nexts.t('noError.success');
      }
    }

    if (path === 'language') {
      if (previousValue === '') {
        previousValue = 'ru';
      }
      i18nexts.changeLanguage(value);
      const nowLang = document.getElementById(value);
      const prevLang = document.getElementById(previousValue);
      nowLang.classList.remove('btn-outline-primary');
      nowLang.classList.add('btn-primary');
      prevLang.classList.remove('btn-primary');
      prevLang.classList.add('btn-outline-primary');
      titles.textContent = i18nexts.t('form.name');
      buttonAdd.textContent = i18nexts.t('button.reset');
      exampleLink.textContent = i18nexts.t('form.example');
      rssLink.textContent = i18nexts.t('form.link');
  }
});

  setTimeout(function run() {
    check(state);
    render(state);
    event(state);
        setTimeout(run, 5000);
    }, 5000);

  const getData = (link) => {
    const agent = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`;
    axios.get(agent)
    .then((response) => {
      const data = response.data.contents;
      return parser(data, link);
    })
    .then((data) => {
      watchedState.inputForm.valid = true;
      watchedState.inputForm.links.push(link);
      const { feeds, posts } = data;
      watchedState.feeds.push(feeds);
      watchedState.posts.push(posts);
    })
    .catch((e) => {
      watchedState.inputForm.valid = false;
      watchedState.error = e;
    });
  };

  rssForm.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.inputForm.valid = '';
    feedBack.textContent = '';

    const formData = new FormData(e.target);
    const link = formData.get('url');
    const userSchema = yup.string().notOneOf(state.inputForm.links).url();
    userSchema.validate(link)

    .then(() => {
        getData(link);
    })
    .catch((e) => {
        console.log(e);
        watchedState.error = e;
    });
});

    document.querySelectorAll('.lang').forEach((el) => {
        el.addEventListener('click', (e) => {
            watchedState.language = e.target.id;
        });
    });
};

app();
