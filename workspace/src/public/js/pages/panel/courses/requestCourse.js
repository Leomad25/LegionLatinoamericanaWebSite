function openMenuCurses() {
    const menuDeploy = document.getElementById('deploy-menu');
    const ref = document.getElementById('courses-selected-input');
    if (!(menuDeploy.classList.contains('menu-open'))) {
        menuDeploy.classList.add('menu-open');
        menuDeploy.style.maxHeight = (ref.offsetHeight * 3) + 'px';
    } else {
        menuDeploy.classList.remove('menu-open');
        menuDeploy.style.maxHeight = '0px';
    }
}

function coursesSelected(opt) {
    const name = document.getElementById('item-course-' + opt).children[0].innerHTML;
    const input = document.getElementById('courses-selected-input');
    input.value = name;
    openMenuCurses();
    const requirements = document.getElementsByClassName('requirement-card');
    for ( i=0; i<requirements.length; i++) requirements[i].style.display = 'none';
    document.getElementById('requirement-card-' + opt).style.display = 'block';
}