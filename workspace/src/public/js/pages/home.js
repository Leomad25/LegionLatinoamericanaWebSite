let screenPos = 1;
let lastDelta = 0;

window.onload = () => {
    const nav = [
        document.getElementById('item-label-1'),
        document.getElementById('item-label-2'),
        document.getElementById('item-label-3'),
        document.getElementById('item-label-4'),
        document.getElementById('item-label-5')
    ]
    
    for (let index = 0; index < nav.length; index++) {
        nav[index].addEventListener('click', () => {
            if (index == 0) {
                screenPos = 1;
                moveScroll();
            }
            if (index == 1) {
                screenPos = 2;
                moveScroll();
            }
            if (index == 2) {
                screenPos = 3;
                moveScroll();
            }
            if (index == 3) {
                screenPos = 4;
                moveScroll();
            }
            if (index == 4) {
                if (nav[index].firstChild.className == 'login-btn') window.location.href = '/auth/login';
                if (nav[index].firstChild.className == 'panel-btn') window.location.href = '/panel';
            };
        });
    }
}

window.addEventListener("resize", () => {
    moveScroll();
});

window.addEventListener("wheel", (event) => {
    const delta = Math.sign(event.deltaY);
    if (delta > lastDelta) next();
    if (delta < lastDelta) prev();
    event.preventDefault();
}, {passive: false});

window.addEventListener("keydown", function(e) {
    if(["ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    } else if (["Space","ArrowDown"].indexOf(e.code) > -1) {
        next();
        e.preventDefault();
    } else if (["ArrowUp"].indexOf(e.code) > -1) {
        prev();
        e.preventDefault();
    }
}, false);

function next() {
    if (screenPos != 4) {
        screenPos ++;
    } else {
        screenPos = 1;
    }
    moveScroll();
}

function prev() {
    if (screenPos != 1) {
        screenPos --;
    }
    moveScroll();
}

function moveScroll() {
    if (screenPos == 1) scroll({
        top: document.getElementById('presentation').offsetTop,
        behavior: 'smooth'
    });
    //document.body.scrollTo(0, document.getElementById('presentation').offsetTop);
    if (screenPos == 2) scroll({
        top: document.getElementById('aboutUs').offsetTop,
        behavior: 'smooth'
    });
    //document.body.scrollTo(0, document.getElementById('aboutUs').offsetTop);
    if (screenPos == 3) scroll({
        top: document.getElementById('schedule').offsetTop,
        behavior: 'smooth'
    });
    //document.body.scrollTo(0, document.getElementById('schedule').offsetTop);
    if (screenPos == 4) scroll({
        top: document.getElementById('socialNetworks').offsetTop,
        behavior: 'smooth'
    });
    //document.body.scrollTo(0, document.getElementById('socialNetworks').offsetTop);
}