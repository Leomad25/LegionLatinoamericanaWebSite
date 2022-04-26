window.onscroll = () => {
    stickyTitle();
}

function stickyTitle() {
    const titleBar = document.getElementById('title');
    if (window.pageYOffset >= titleBar.offsetTop) {
        titleBar.querySelector('table').classList.add('sticky-title');
        titleBar.style.height = (titleBar.querySelector('table').offsetHeight + 2) + 'px';
    } else {
        titleBar.querySelector('table').classList.remove('sticky-title');
        titleBar.style.height = 'auto';
    }
}