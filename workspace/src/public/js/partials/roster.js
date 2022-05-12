function loadData(opt) {
    const content = document.getElementById('content-tables');
    let str = '';
    // when OPT is 0. (Squads).
    const personal = document.getElementsByClassName('btns-personal')[0].children[0];
    if (opt == 0) {
        personal.children[0].className = 'item selected';
        personal.children[2].className = 'item';
        data.forEach((element) => {
            str += '<section class="sec-table">';
            str += '<h3 class="title-table">' + element.squad + '</h3>';
            str += '<table>';
            let strAwards = '';
            element.list.forEach((subElement) => {
                //console.log(subElement);
                strAwards = '';
                subElement.awards.forEach((award) => {
                    strAwards += '<li>';
                    strAwards += '<section class="awardIcon"><img src="' + award.award + '"></section>';
                    strAwards += '<section class="awardAmount"> x ' + award.amount + '</section>';
                    strAwards += '</li>';
                });
                str +=
                    '<tr>' +
                        '<td><img src="' + subElement.rankIcon + '"></td>' +
                        '<td>' + subElement.rank + '</td>' +
                        '<td>' + subElement.name + '</td>' +
                        '<td class="awards hide">' +
                            '<ul>' +
                                strAwards +
                            '</ul>' +
                        '</td>' +
                    '</tr>';
            });
            str += '</table>';
            str += '</section>';
        });
    }
    // when OPT is 1. (Staff).
    if (opt == 1) {
        personal.children[0].className = 'item';
        personal.children[2].className = 'item selected';
        str += '<section class="sec-table">';
        str += '<table>';
        staff.forEach((element) => {
            str +=
                '<tr>' +
                    '<td><img src="' + element.rankIcon + '"></td>' +
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