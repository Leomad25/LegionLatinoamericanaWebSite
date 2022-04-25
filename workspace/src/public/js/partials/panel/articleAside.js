function navegationItem(index) {
    const item = document.getElementById(index);
    if (item != undefined) {
        if (item.children[0].children[1] != undefined) {
            const title = item.children[0].children[0];
            const subItmes = item.children[0].children[1];
            if (
                title.children[0].children[0].className == 'bar close-1' &&
                title.children[0].children[1].className == 'bar close-2'
            ) {
                title.children[0].children[0].className = 'bar open-1';
                title.children[0].children[1].className = 'bar open-2';
                subItmes.style.display = 'block';
                changeColor('ON', item);
                setTimeout(() => {
                    subItmes.style.transform = 'translateX(0%)';
                }, 100);
            } else {
                title.children[0].children[0].className = 'bar close-1';
                title.children[0].children[1].className = 'bar close-2';
                subItmes.style.transform = 'translateX(calc(-100% - 45px))';
                changeColor('OFF', item);
                setTimeout(() => {
                    subItmes.style.display = 'none';
                }, 500);
            }
        }
    }
}

function changeColor(opt, item) {
    const title = item.children[0].children[0];
    const body = item.children[0].children[1];
    if (opt == 'ON') {
        // background and colors
        title.style.backgroundColor = 'black';
        title.style.color = 'white';
        item.style.backgroundColor = 'black';
        body.style.borderTop = '2px solid white';
        // arrow title
        title.getElementsByClassName('bar')[0].style.backgroundColor = 'white';
        title.getElementsByClassName('bar')[1].style.backgroundColor = 'white';
        title.getElementsByClassName('animation')[0].style.borderRight = '3px solid white';
        // list
        body.children[0].style.backgroundColor = 'rgb(120, 120, 120)';
    } else if (opt == 'OFF') {
        // background and colors
        title.style.backgroundColor = 'gold';
        title.style.color = 'black';
        item.style.backgroundColor = 'gold';
        body.style.borderTop = '0';
        // arrow title
        title.getElementsByClassName('bar')[0].style.backgroundColor = 'black';
        title.getElementsByClassName('bar')[1].style.backgroundColor = 'black';
        title.getElementsByClassName('animation')[0].style.borderRight = '3px solid black';
        // list
        body.children[0].style.backgroundColor = 'gold';
    }
}