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
    // Change the tag of the btn of role selector.
    const roleSelectorBtn = document.getElementById('forms-selectRole').children[0];
    str = dataPacket.children[1].innerHTML;
    roleSelectorBtn.children[1].innerHTML = str.charAt(0).toUpperCase() + str.slice(1);
    // Deploy form menu.
    const panels = document.getElementById('forms-panels');
    panels.style.display = 'block';
    // Close form role selector.
    if (!(document.getElementById('forms-selectRole').children[1].classList.contains('close')))
        openFormRoleSelector();
    // Set roles on fomrs
    const formsPanel = document.getElementById('forms-panels');
    for (i = 0; i < 3; i++) formsPanel.children[i].children[1].children[0].value = dataPacket.children[0].innerHTML;
    // Load data to fomrs
    clearForms(formsPanel); // Clear forms
    let adminLock = false;
    if (dataPacket.children[2].children[0].innerHTML == 'true') adminLock = true;
    let request = false;
    if (dataPacket.children[2].children[1].innerHTML == 'true') request = true;
    // > form request
    loadDataForm('request', { adminLock, request });
    loadBtnsForm('request', {isAdmin: adminOpt, adminLock, request});
    loadDataToPrequestForm(adminLock, dataPacket);
}

function clearForms(fomrs) {
    // Forms request
    const request = fomrs.children[0].children[1];
    for (i = 0; i < 2; i++) {
        request.children[i + 1].children[1].className = 'opt';
        for (j = 0; j < 2; j++) request.children[i + 1].children[1].children[j].style.display = 'none';
    }
}

function loadDataForm(params, opt) {
    if (params == 'request') {
        const formRequest = document.getElementById('forms-enableRequest').children[1];
        if (opt.adminLock) {
            formRequest.children[1].children[1].children[0].style.display = 'block';
            formRequest.children[1].children[1].children[1].style.display = 'none';
        } else {
            formRequest.children[1].children[1].children[0].style.display = 'none';
            formRequest.children[1].children[1].children[1].style.display = 'block';
        }
        if (opt.request) {
            formRequest.children[2].children[1].children[0].style.display = 'block';
            formRequest.children[2].children[1].children[1].style.display = 'none';
        } else {
            formRequest.children[2].children[1].children[0].style.display = 'none';
            formRequest.children[2].children[1].children[1].style.display = 'block';
        }
    }
}

function loadBtnsForm(params, opt) {
    if (params == 'request') {
        const formRequest = document.getElementById('forms-enableRequest').children[1];
        const adminLock = formRequest.children[1].children[2];
        const status = formRequest.children[2].children[2];
        if (opt.isAdmin) {
            if (opt.adminLock) {
                formRequest.children[1].children[1].classList.add('active');
                adminLock.value = 'active';
            } else {
                formRequest.children[1].children[1].classList.add('disabled');
                adminLock.value = 'disabled';
            }
            if (opt.request) {
                formRequest.children[2].children[1].classList.add('active');
                status.value = 'active';
            } else {
                formRequest.children[2].children[1].classList.add('disabled');
                status.value = 'disable';
            }
        } else {
            formRequest.children[1].children[1].classList.add('static');
            adminLock.value = 'static';
            if (opt.adminLock) {
                formRequest.children[2].children[1].classList.add('static');
                status.value = 'static';
            } else {
                if (opt.request) {
                    formRequest.children[2].children[1].classList.add('active');
                    status.value = 'active';
                } else {
                    formRequest.children[2].children[1].classList.add('disabled');
                    status.value = 'disable';
                }
            }
        }
    }
}

function loadDataToPrequestForm(adminLock, dataPacket) {
    const ul_roles = dataPacket.children[2].children[2].children[0];
    const ul_selected = dataPacket.children[2].children[2].children[1];
    const box_roles = document.getElementById('forms-prerequisites-available').children[1];
    const box_selected = document.getElementById('forms-prerequisites-selected').children[1];
    const arr = [];
    if (!adminLock) {
        box_roles.classList.add('enable');
        box_selected.classList.add('enable');
    } else {
        box_roles.classList.remove('enable');
        box_selected.classList.remove('enable');
    }
    var str;
    // > add component to Roles
    str = '';
    for (let i = 0; i < ul_roles.childElementCount; i++) str +=
        '<li onclick="prerequisitesAdded(\'' + ul_roles.children[i].children[0].innerHTML + '\')">' +
            '<span style="display: none;">' + ul_roles.children[i].children[0].innerHTML + '</span>'+
            '<span class="add">' + ul_roles.children[i].children[1].innerHTML + '</span>'+
        '</li>';
    box_roles.innerHTML = str;
    // > add component to selected 
    str = '';
    for (let i = 0; i < ul_selected.childElementCount; i++) str +=
        '<li onclick="prerequisitesRemoved(\'' + ul_selected.children[i].children[0].innerHTML + '\')">' +
            '<span style="display: none;">' + ul_selected.children[i].children[0].innerHTML + '</span>'+
            '<span class="remove">' + ul_selected.children[i].children[1].innerHTML + '</span>'+
        '</li>';
    box_selected.innerHTML = str;
    fillInputOfFromPrerequisite();
}

function prerequisitesAdded(id) {
    console.log('added: ', id);
}

function prerequisitesRemoved(id) {
    console.log('removed: ', id);
}

function fillInputOfFromPrerequisite() {
    const input = document.getElementById('forms-prerequisites').children[1].children[3].children[1];
    const selected = document.getElementById('forms-prerequisites').children[1].children[2].children[1];
    const view = document.getElementById('forms-prerequisites').children[1].children[3].children[0];
    console.log(view);
    let str = '', viewStr = '';
    for (let i = 0; i < selected.childElementCount; i++) {
        if (i != 0) str += ',';
        str += selected.children[i].children[0].innerHTML;
        viewStr += '<li><p>' + selected.children[i].children[1].innerHTML + '</p></li>';
    }
    input.value = str;
    view.innerHTML = viewStr;
}