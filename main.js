/* Greeting */
function updateGreeting() {
    const greet = document.querySelector('#greeting');
    let greetText = "";

    const date = new Date();
    const hours = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
    const minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();

    if (hours < 12) {
        greetText = "Guten Morgen";
    } else if (hours < 17) {
        greetText = "Guten Tag";
    } else {
        greetText = "Guten Abend";
    }

    greet.innerText = greetText + ", es ist aktuell " + hours + ":" + minutes + " Uhr";
}

setInterval(updateGreeting, 250);



/* Diary */
let new_old = true;
function updateDiary() {
    const diaries = [
        ["27.10.2021", "Südamerika Seite erstellt & gestaltet. Außerdem Portfolio begonnen."],
        ["28.10.2021", "Kleine Behebungen am Portfolio bzgl. der Tooltips; Umbau der Navigation (Aufgaben jetzt auf der Onepage anstatt im Navigator); Schrift- & Bilder-Aufgabe gemacht."],
        ["29.10.2021", "---"]
    ];

    if (new_old) {
        diaries.reverse();
    }

    const diary = document.getElementById('diary_wrapper');
    const sort_text = document.getElementById('diary_sorting');

    if (new_old) {
        sort_text.innerHTML = "Neu » Alt";
    } else {
        sort_text.innerHTML = "Alt » Neu";
    }

    diary.innerHTML = "";
    diaries.forEach(el => {
        diary.innerHTML += "<article class='diary_entry'><h3 class='diary_date'>Tätigkeiten am " + el[0] + "</h3><p class='diary_text'>" + el[1] + "</p></article>";
    });
}

updateDiary();


let delay = 0;
document.querySelector('main').querySelectorAll('*').forEach((el) => {
    el.style.opacity = "0";

    el.style.animation = "fadeIn .65s";
    if (delay > 0) {
        el.style.animationDelay = delay + "ms";
    }
    el.style.animationIterationCount = "1";
    el.style.animationFillMode = "forwards";

    delay += 25;
});


/* Popup */
function togglePopup(wrapperID) {
    document.getElementById(wrapperID).classList.toggle('visible');
    document.getElementById(wrapperID).querySelector('.popup').classList.toggle('visible');
}

function hideAllPopups() {
    document.querySelectorAll('.popup_wrapper').forEach((el) => {
        el.classList.remove('visible');
        el.querySelector('.popup').classList.remove('visible');
    });
}

document.querySelectorAll('.popup_wrapper').forEach((el) => {
    el.addEventListener('click', function () {
        hideAllPopups();
    });
});


/* Navigator Scroll */
document.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY >= 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

/* Open Navigator mobile */
function toggleNav() {
    document.querySelector('#navigator').classList.toggle('open');
    document.querySelector('#navigator_bg').classList.toggle('visible');
}

document.querySelector('#navigator_bg').addEventListener('click', () => {
    toggleNav();
});

/* Close Navigator on click mobile */
document.querySelector('#navigator').querySelectorAll('li:not(#logo)').forEach(li => {
    li.addEventListener('click', () => {
        if (document.querySelector('#navigator').classList.contains("open") || li.id === 'hamburger') {
            toggleNav();
        }
    });
});


$(document).ready(function () {
    $('#navigator a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        let offset = 0;
        var target = this.hash;
        var $target = $(target);

        if (this.hash !== '') {
            if ("scrollOffset" in document.querySelector(this.hash).dataset) {
                offset = document.querySelector(this.hash).dataset.scrollOffset;
            }
        }

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - offset
        }, 900, 'swing');
    });
});

function hideAllContextmenus() {
    document.querySelectorAll('.context').forEach((el) => {
        el.classList.remove('visible');
        el.style.top = "-300%";
    });
}

/* Global Contextmenu */
let global_context = document.getElementById('global_context');
document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    global_context.classList.add('visible');

    global_context.style.top = (e.clientY - 2) + "px";
    global_context.style.left = (e.clientX - 2) + "px";
});

/* Link Contextmenu */
let link_context = document.getElementById('link_context');
document.querySelectorAll('a').forEach((a) => {
    a.addEventListener('contextmenu', (e) => {
        console.log(a.href);
        e.preventDefault();

        hideAllContextmenus();
        setTimeout(() => {
            hideAllContextmenus();

            if (a.href !== '') {
                setTimeout(() => {
                    link_context.querySelector('#newtab').href = a.href;
                    link_context.classList.add('visible');

                    link_context.style.top = (e.clientY - 2) + "px";
                    link_context.style.left = (e.clientX - 2) + "px";
                }, 1);
            }
        }, 1);
    });
});


/* Hide all contextmenus on mouseleave */
document.querySelectorAll('.context').forEach((el) => {
    el.addEventListener('mouseleave', (e) => {
        hideAllContextmenus();
    });
});



/* Copy */
function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}