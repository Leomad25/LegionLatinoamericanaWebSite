function loadData(opt) {
    const content = document.getElementById('content-tables');
    let str = '';
    // when OPT is 0. (Squads).
    if (opt == 0) {
        console.log(data);
        data.forEach((element) => {
            str += '<section class="sec-table">';
            str += '<h3 class="title-table">' + element.squad + '</h3>';
            str += '<table>';
            element.list.forEach((subElement) => {
                str +=
                    '<tr>' +
                        '<td><img src="/"></td>' +
                        '<td>' + subElement.rank + '</td>' +
                        '<td>' + subElement.name + '</td>' +
                    '</tr>';
            });
            str += '</table>';
            str += '</section>';
        });
    }
    // when OPT is 1. (Staff).
    if (opt == 1) {
        console.log(staff);
        str += '<section class="sec-table">';
        str += '<table>';
        staff.forEach((element) => {
            str +=
                '<tr>' +
                    '<td><img src="/"></td>' +
                    '<td>' + element.rank + '</td>' +
                    '<td>' + element.name + '</td>' +
                '</tr>';
        });
        str += '</table>';
        str += '</section>';
    }
    // inser to HTML
    content.innerHTML = str;
}

window.onload = () => {
    loadData(0);
}