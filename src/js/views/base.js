export const elements = {
    searchBox: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    loader: 'loader',
    recipe: document.querySelector('.recipe'),
    wrapper: document.querySelector('.wrapper-el'),
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elements.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elements.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};

export const scrollToTop = () => {
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
    });
};

export const apiTools = {
    keys: ['769d447afbec39f60297c0f3bc6aab14', '989b0516cc7f7f45946f767ae654a3df', '8036a931f33976ac29c4fec8067b65c2', '52d5b14a8d4b9b4925047abff6bde975'],
    proxy: 'https://cors-anywhere.herokuapp.com/'
}