export const state = () => ({
  // Auth2 config
  client_id: 'vWH694NVtAjBy5zW6K119ViSypMjuZ3lstEBfGlSSwA',
  client_secret: '75yh1Jdj6AKwWVHQNaPEQZkdpIWvZlYxqCuo0YI_BPI',
  redirect_uri: 'https://vue-aniseria-v2.firebaseapp.com/login',
  // ------------------
  stats: {
    planned: 'Запланировано',
    watching: 'Смотрю',
    rewatching: 'Пересматриваю',
    completed: 'Просмотрено',
    on_hold: 'Отложено',
    dropped: 'Брошено'
  },
  kind: {
    tv: 'TV Сериал',
    movie: 'Фильм',
    ova: 'OVA',
    ona: 'ONA',
    special: 'Спешл',
    music: 'Клип',
    manga: 'Манга',
    manhwa: 'Манхва',
    manhua: 'Маньхуа',
    one_shot: 'Ваншот',
    doujin: 'Додзинси'
  },
  statusAnime: {
    anons: 'Анонсировано',
    ongoing: 'Сейчас выходит',
    released: 'Вышедшее'
  },
  // Nav
  nav: [
    {
      to: '/',
      text: 'Домой',
      svg: 'fas fa-home',
      auth: 'nd'
    },
    {
      to: '/animes',
      text: 'аниме',
      svg: 'fas fa-play',
      auth: 'nd'
    }
    // {
    //   to: 'Mangas',
    //   text: 'манга',
    //   svg: 'fas fa-book',
    //   auth: 'nd'
    // },
    // {
    //   to: 'Calendar',
    //   text: 'Календарь',
    //   svg: 'far fa-calendar-alt',
    //   auth: 'nd'
    // },
    // {
    //   to: 'Login',
    //   text: 'войти',
    //   svg: 'fas fa-sign-in-alt',
    //   class: 'signup login',
    //   auth: 'nli'
    // }
  ],
  theme: 'light',
  transparent: false,
  genres: [
    {
      id: 89,
      name: 'Police',
      russian: 'Полиция',
      kind: 'manga'
    },
    {
      id: 8,
      name: 'Drama',
      russian: 'Драма',
      kind: 'anime'
    },
    {
      id: 11,
      name: 'Game',
      russian: 'Игры',
      kind: 'anime'
    },
    {
      id: 40,
      name: 'Psychological',
      russian: 'Психологическое',
      kind: 'anime'
    },
    {
      id: 67,
      name: 'Psychological',
      russian: 'Психологическое',
      kind: 'manga'
    },
    {
      id: 72,
      name: 'Demons',
      russian: 'Демоны',
      kind: 'manga'
    },
    {
      id: 79,
      name: 'Game',
      russian: 'Игры',
      kind: 'manga'
    },
    {
      id: 87,
      name: 'Josei',
      russian: 'Дзёсей',
      kind: 'manga'
    },
    {
      id: 2,
      name: 'Adventure',
      russian: 'Приключения',
      kind: 'anime'
    },
    {
      id: 75,
      name: 'Yuri',
      russian: 'Юри',
      kind: 'manga'
    },
    {
      id: 47,
      name: 'Shounen',
      russian: 'Сёнен',
      kind: 'manga'
    },
    {
      id: 49,
      name: 'Comedy',
      russian: 'Комедия',
      kind: 'manga'
    },
    {
      id: 48,
      name: 'Supernatural',
      russian: 'Сверхъестественное',
      kind: 'manga'
    },
    {
      id: 50,
      name: 'Drama',
      russian: 'Драма',
      kind: 'manga'
    },
    {
      id: 51,
      name: 'Ecchi',
      russian: 'Этти',
      kind: 'manga'
    },
    {
      id: 63,
      name: 'Shoujo',
      russian: 'Сёдзе',
      kind: 'manga'
    },
    {
      id: 64,
      name: 'Vampire',
      russian: 'Вампиры',
      kind: 'manga'
    },
    {
      id: 65,
      name: 'Yaoi',
      russian: 'Яой',
      kind: 'manga'
    },
    {
      id: 19,
      name: 'Music',
      russian: 'Музыка',
      kind: 'anime'
    },
    {
      id: 88,
      name: 'Samurai',
      russian: 'Самураи',
      kind: 'manga'
    },
    {
      id: 56,
      name: 'Action',
      russian: 'Экшен',
      kind: 'manga'
    },
    {
      id: 86,
      name: 'Parody',
      russian: 'Пародия',
      kind: 'manga'
    },
    {
      id: 54,
      name: 'Slice of Life',
      russian: 'Повседневность',
      kind: 'manga'
    },
    {
      id: 68,
      name: 'Adventure',
      russian: 'Приключения',
      kind: 'manga'
    },
    {
      id: 78,
      name: 'Music',
      russian: 'Музыка',
      kind: 'manga'
    },
    {
      id: 80,
      name: 'Horror',
      russian: 'Ужасы',
      kind: 'manga'
    },
    {
      id: 83,
      name: 'Mecha',
      russian: 'Меха',
      kind: 'manga'
    },
    {
      id: 62,
      name: 'Romance',
      russian: 'Романтика',
      kind: 'manga'
    },
    {
      id: 55,
      name: 'Shounen Ai',
      russian: 'Сёнен Ай',
      kind: 'manga'
    },
    {
      id: 69,
      name: 'Historical',
      russian: 'Исторический',
      kind: 'manga'
    },
    {
      id: 1,
      name: 'Action',
      russian: 'Экшен',
      kind: 'anime'
    },
    {
      id: 4,
      name: 'Comedy',
      russian: 'Комедия',
      kind: 'anime'
    },
    {
      id: 6,
      name: 'Demons',
      russian: 'Демоны',
      kind: 'anime'
    },
    {
      id: 39,
      name: 'Police',
      russian: 'Полиция',
      kind: 'anime'
    },
    {
      id: 57,
      name: 'Fantasy',
      russian: 'Фэнтези',
      kind: 'manga'
    },
    {
      id: 58,
      name: 'Magic',
      russian: 'Магия',
      kind: 'manga'
    },
    {
      id: 71,
      name: 'Harem',
      russian: 'Гарем',
      kind: 'manga'
    },
    {
      id: 76,
      name: 'Sports',
      russian: 'Спорт',
      kind: 'manga'
    },
    {
      id: 59,
      name: 'Hentai',
      russian: 'Хентай',
      kind: 'manga'
    },
    {
      id: 29,
      name: 'Space',
      russian: 'Космос',
      kind: 'anime'
    },
    {
      id: 60,
      name: 'School',
      russian: 'Школа',
      kind: 'manga'
    },
    {
      id: 85,
      name: 'Space',
      russian: 'Космос',
      kind: 'manga'
    },
    {
      id: 9,
      name: 'Ecchi',
      russian: 'Этти',
      kind: 'anime'
    },
    {
      id: 10,
      name: 'Fantasy',
      russian: 'Фэнтези',
      kind: 'anime'
    },
    {
      id: 12,
      name: 'Hentai',
      russian: 'Хентай',
      kind: 'anime'
    },
    {
      id: 13,
      name: 'Historical',
      russian: 'Исторический',
      kind: 'anime'
    },
    {
      id: 14,
      name: 'Horror',
      russian: 'Ужасы',
      kind: 'anime'
    },
    {
      id: 16,
      name: 'Magic',
      russian: 'Магия',
      kind: 'anime'
    },
    {
      id: 18,
      name: 'Mecha',
      russian: 'Меха',
      kind: 'anime'
    },
    {
      id: 20,
      name: 'Parody',
      russian: 'Пародия',
      kind: 'anime'
    },
    {
      id: 21,
      name: 'Samurai',
      russian: 'Самураи',
      kind: 'anime'
    },
    {
      id: 22,
      name: 'Romance',
      russian: 'Романтика',
      kind: 'anime'
    },
    {
      id: 23,
      name: 'School',
      russian: 'Школа',
      kind: 'anime'
    },
    {
      id: 27,
      name: 'Shounen',
      russian: 'Сёнен',
      kind: 'anime'
    },
    {
      id: 30,
      name: 'Sports',
      russian: 'Спорт',
      kind: 'anime'
    },
    {
      id: 32,
      name: 'Vampire',
      russian: 'Вампиры',
      kind: 'anime'
    },
    {
      id: 33,
      name: 'Yaoi',
      russian: 'Яой',
      kind: 'anime'
    },
    {
      id: 34,
      name: 'Yuri',
      russian: 'Юри',
      kind: 'anime'
    },
    {
      id: 35,
      name: 'Harem',
      russian: 'Гарем',
      kind: 'anime'
    },
    {
      id: 53,
      name: 'Sci-Fi',
      russian: 'Фантастика',
      kind: 'manga'
    },
    {
      id: 28,
      name: 'Shounen Ai',
      russian: 'Сёнен-ай',
      kind: 'anime'
    },
    {
      id: 36,
      name: 'Slice of Life',
      russian: 'Повседневность',
      kind: 'anime'
    },
    {
      id: 26,
      name: 'Shoujo Ai',
      russian: 'Сёдзё-ай',
      kind: 'anime'
    },
    {
      id: 43,
      name: 'Josei',
      russian: 'Дзёсей',
      kind: 'anime'
    },
    {
      id: 74,
      name: 'Gender Bender',
      russian: 'Смена пола',
      kind: 'manga'
    },
    {
      id: 61,
      name: 'Doujinshi',
      russian: 'Додзинси',
      kind: 'manga'
    },
    {
      id: 81,
      name: 'Thriller',
      russian: 'Триллер',
      kind: 'manga'
    },
    {
      id: 37,
      name: 'Supernatural',
      russian: 'Сверхъестественное',
      kind: 'anime'
    },
    {
      id: 41,
      name: 'Thriller',
      russian: 'Триллер',
      kind: 'anime'
    },
    {
      id: 73,
      name: 'Shoujo Ai',
      russian: 'Сёдзе Ай',
      kind: 'manga'
    },
    {
      id: 24,
      name: 'Sci-Fi',
      russian: 'Фантастика',
      kind: 'anime'
    },
    {
      id: 25,
      name: 'Shoujo',
      russian: 'Сёдзё',
      kind: 'anime'
    },
    {
      id: 31,
      name: 'Super Power',
      russian: 'Супер сила',
      kind: 'anime'
    },
    {
      id: 82,
      name: 'Super Power',
      russian: 'Супер сила',
      kind: 'manga'
    },
    {
      id: 46,
      name: 'Mystery',
      russian: 'Детектив',
      kind: 'manga'
    },
    {
      id: 38,
      name: 'Military',
      russian: 'Военное',
      kind: 'anime'
    },
    {
      id: 7,
      name: 'Mystery',
      russian: 'Детектив',
      kind: 'anime'
    },
    {
      id: 70,
      name: 'Military',
      russian: 'Военное',
      kind: 'manga'
    },
    {
      id: 15,
      name: 'Kids',
      russian: 'Детское',
      kind: 'anime'
    },
    {
      id: 77,
      name: 'Kids',
      russian: 'Детское',
      kind: 'manga'
    },
    {
      id: 3,
      name: 'Cars',
      russian: 'Машины',
      kind: 'anime'
    },
    {
      id: 84,
      name: 'Cars',
      russian: 'Машины',
      kind: 'manga'
    },
    {
      id: 17,
      name: 'Martial Arts',
      russian: 'Боевые искусства',
      kind: 'anime'
    },
    {
      id: 66,
      name: 'Martial Arts',
      russian: 'Боевые искусства',
      kind: 'manga'
    },
    {
      id: 5,
      name: 'Dementia',
      russian: 'Безумие',
      kind: 'anime'
    },
    {
      id: 90,
      name: 'Dementia',
      russian: 'Безумие',
      kind: 'manga'
    },
    {
      id: 42,
      name: 'Seinen',
      russian: 'Сейнен',
      kind: 'anime'
    },
    {
      id: 52,
      name: 'Seinen',
      russian: 'Сейнен',
      kind: 'manga'
    }
  ],
  shikiUrl: 'https://shikimori.one'
})
export const mutations = {
  setTransparent (state, val) {
    state.transparent = val
  },
  setTheme (state, val) {
    state.theme = val
  }
}

export const actions = {
  changeTheme ({ commit, state }) {
    if (state.theme === 'light') {
      commit('setTheme', 'dark')
      // localStorage.theme = 'dark'
    } else {
      commit('setTheme', 'light')
      // localStorage.theme = 'light'
    }
  }

}
export const getters = {
  getTheme: s => s.theme,
  getTransparent: s => s.transparent,
  getGenres: s => s.genres,
  getShikiUrl: s => s.shikiUrl
}
