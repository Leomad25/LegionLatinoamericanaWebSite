function closeFlash() {
    const element = document.getElementById('flashMessage');
    element.style.transition = 'all .5s';
    element.style.opacity = 0;
    element.style.top = 0;
    element.style.transform = 'translateX(-50%) translateY(-100%)';
    setTimeout(() => {
        element.style.display = 'none';
        location.reload();
    }, 500);
}