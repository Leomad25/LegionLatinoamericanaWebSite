function menuBarSwitch() {
    const aside = document.getElementById('aside');
    const asideCloseMenu = document.getElementById('aside-close-menu');
    const btn = document.getElementById('top-panel-bar');
    // is Close
    if (!(btn.classList.contains('isMenuOpen'))) {
        aside.style.transform = 'translateX(0%)';
        asideCloseMenu.style.transform = 'translateX(0%)';
        btn.classList.add('isMenuOpen');
    }
    // is Open
    else if (btn.classList.contains('isMenuOpen')) {
        aside.style.transform = 'translateX(-100%)';
        asideCloseMenu.style.transform = 'translateX(100%)';
        btn.classList.remove('isMenuOpen');
    }
}