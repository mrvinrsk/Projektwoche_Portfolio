// <p id="dark_toggle" onclick="updateMode()"></p>

function updateMode(toggle = true) {
    const body = document.documentElement;
    const toggler = document.getElementById('dark_toggle');

    if (toggle) {
        body.classList.toggle("dark");
    }

    if (!body.classList.contains("dark")) {
        toggler.innerText = "Licht aus";

        deleteCookie("dm");
        setCookie("dm", true);
    } else {
        toggler.innerText = "Licht an";
        
        deleteCookie("dm");
        setCookie("dm", false);
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(cname) {
    setCookie(cname, 0, -1);
}

$(function () {
    const toggler = document.createElement('p');
    toggler.id = "dark_toggle";
    toggler.onclick = function () {
        updateMode();
    }

    document.body.appendChild(toggler);

    if(getCookie("dm")) {
        document.documentElement.classList.add("dark");
    }

    updateMode(false);
});