const select = document.getElementById('discovered');

select.addEventListener('change', (event) => {
    if (event.target.value === 'other') { 
        document.getElementById('tellUs').style.display = 'block';
    } else {
        document.getElementById('tellUs').style.display = 'none';
    }
});