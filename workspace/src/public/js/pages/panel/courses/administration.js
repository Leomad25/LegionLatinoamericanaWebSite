function deployOrderMenu() {
    const menu = document.getElementById('filter-order').children[1];
    if (menu.classList.contains('close')) {
        menu.classList.remove('close');
    } else {
        menu.classList.add('close');
    }
}

function openGeneralTable() {
    const table = document.getElementById('requestList-general').children[1];
    const btn = document.getElementById('requestList-general').children[2];
    if (table.classList.contains('close')) {
        table.classList.remove('close');
        table.classList.add('open');
        btn.children[0].classList.add('close');
        btn.children[1].classList.remove('close');
    } else {
        table.classList.remove('open');
        table.classList.add('close');
        btn.children[0].classList.remove('close');
        btn.children[1].classList.add('close');
    }
}

function openSpecificTable() {
    const table = document.getElementById('requestList-specific').children[1];
    const btn = document.getElementById('requestList-specific').children[2];
    if (table.classList.contains('close')) {
        table.classList.remove('close');
        table.classList.add('open');
        btn.children[0].classList.add('close');
        btn.children[1].classList.remove('close');
    } else {
        table.classList.remove('open');
        table.classList.add('close');
        btn.children[0].classList.remove('close');
        btn.children[1].classList.add('close');
    }
}

function setDataSpecificTable(tag) {
    const tableSpecific = document.getElementById('requestList-specific').children[1];
    if (tableSpecific.classList.contains('close')) openSpecificTable();
    hideInfoRequestTables(1);
    const tableSpecificBody = tableSpecific.children[0].children[1];
    for (let i = 0; i < tableSpecificBody.childElementCount; i++) {
        if (tableSpecificBody.children[i].children[1].innerHTML == tag)
            tableSpecificBody.children[i].classList.remove('hide-row');
    }
}

function updateFilterRole() {
    let input = document.getElementById('roleNameFilter').value;
    const tableGeneral = document.getElementById('requestList-general').children[1];
    if (tableGeneral.classList.contains('close')) openGeneralTable();
    const tableSpecific = document.getElementById('requestList-specific').children[1];
    if (tableSpecific.classList.contains('close')) openSpecificTable();
    if (input != '') {
        input = input.toLowerCase();
        hideInfoRequestTables(0);
        const tableGeneralBody = tableGeneral.children[0].children[1];
        for (let i = 0; i < tableGeneralBody.childElementCount; i++) {
            if (tableGeneralBody.children[i].children[1].innerHTML.includes(input))
                tableGeneralBody.children[i].classList.remove('hide-row');
        }
        hideInfoRequestTables(1);
        const tableSpecificBody = tableSpecific.children[0].children[1];
        for (let i = 0; i < tableSpecificBody.childElementCount; i++) {
            if (tableSpecificBody.children[i].children[1].innerHTML.includes(input))
                tableSpecificBody.children[i].classList.remove('hide-row');
        }
    } else {
        showInfoRequestTables(0);
        showInfoRequestTables(1);
    }
}

function updateFilterUser() {
    let input = document.getElementById('userNameFilter').value;
    const tableSpecific = document.getElementById('requestList-specific').children[1];
    if (tableSpecific.classList.contains('close')) openSpecificTable();
    if (input != '') {
        input = input.toLowerCase();
        hideInfoRequestTables(1);
        const tableSpecificBody = tableSpecific.children[0].children[1];
        for (let i = 0; i < tableSpecificBody.childElementCount; i++) {
            if (tableSpecificBody.children[i].children[0].innerHTML.includes(input))
                tableSpecificBody.children[i].classList.remove('hide-row');
        }
    } else showInfoRequestTables(1);
}

function orderRequestTables(opt, id) {

}

function hideInfoRequestTables(num) {
    if (num == 0) {
        const tableGeneral = document.getElementById('requestList-general').children[1].children[0].children[1];
        for (let i = 0; i < tableGeneral.childElementCount; i++) {
            tableGeneral.children[i].classList.add('hide-row');
        }
    }
    if (num == 1) {
        const tableSpecific = document.getElementById('requestList-specific').children[1].children[0].children[1];
        for (let i = 0; i < tableSpecific.childElementCount; i++) {
            tableSpecific.children[i].classList.add('hide-row');
        }
    }
}

function showInfoRequestTables(num) {
    if (num == 0) {
        const tableGeneral = document.getElementById('requestList-general').children[1].children[0].children[1];
        for (let i = 0; i < tableGeneral.childElementCount; i++) {
            tableGeneral.children[i].classList.remove('hide-row');
        }
    }
    if (num == 1) {
        const tableSpecific = document.getElementById('requestList-specific').children[1].children[0].children[1];
        for (let i = 0; i < tableSpecific.childElementCount; i++) {
            tableSpecific.children[i].classList.remove('hide-row');
        }
    }
}

function openFormsMenu(num) {
    var form;
    if (num == 0) {
        form = document.getElementById('forms-enableRequest');
        if (!(form.children[1].classList.contains('close'))) {
            form.children[1].classList.remove('open');
            form.children[1].classList.add('close');
        } else {
            form.children[1].classList.remove('close');
            form.children[1].classList.add('open');
        }
    }
    if (num == 1) {
        form = document.getElementById('forms-prerequisites');
        if (!(form.children[1].classList.contains('close'))) {
            form.children[1].classList.remove('open');
            form.children[1].classList.add('close');
        } else {
            form.children[1].classList.remove('close');
            form.children[1].classList.add('open');
        }
    }
    if (num == 2) {
        form = document.getElementById('form-openCurse');
        if (!(form.children[1].classList.contains('close'))) {
            form.children[1].classList.remove('open');
            form.children[1].classList.add('close');
        } else {
            form.children[1].classList.remove('close');
            form.children[1].classList.add('open');
        }
    }
}

function openFormRoleSelector() {
    const panel = document.getElementById('forms-selectRole').children[1];
    if (panel.classList.contains('close')) {
        panel.classList.remove('close');
        panel.classList.add('open');
    } else {
        panel.classList.remove('open');
        panel.classList.add('close');
    }
}

function formRoleSelected(id) {
    const roleList = document.getElementById('forms-selectRole').children[1].children[0];
    let selected = undefined;
    for (let i = 0; i < roleList.childElementCount; i++) {
        const role = roleList.children[i];
        if (role.children[0].innerHTML == id) selected = role;
        if (selected != undefined) break;
    }
    loadDataToForms(selected);
}

function loadDataToForms(dataPacket) {
    if (dataPacket == undefined) return;
    let str = '';
    // change the tag of the btn of role selector.
    const roleSelectorBtn = document.getElementById('forms-selectRole').children[0];
    str = dataPacket.children[1].innerHTML;
    roleSelectorBtn.children[1].innerHTML = str.charAt(0).toUpperCase() + str.slice(1);
    // deploy form menu.
    const panels = document.getElementById('forms-panels');
    panels.style.display = 'block';
    // close form role selector.
    if (!(document.getElementById('forms-selectRole').children[1].classList.contains('close')))
        openFormRoleSelector();
}