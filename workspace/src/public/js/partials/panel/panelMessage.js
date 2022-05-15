function panelMessageClose() {
    const element = document.getElementById('panelMessage').children[1];
    element.classList.add('close');
    setTimeout(() => {
        document.getElementById('panelMessage').style.display = 'none';
        location.reload();
    }, 500);
}