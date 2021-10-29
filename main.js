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

function hideAllContextmenus(not) {
    document.querySelectorAll('.context').forEach((el) => {
        if (not) {
            console.log('element given:' + not.id);
            if (not.id !== el.id) {
                console.log(el.id, "removed");
                el.classList.remove('visible');
                el.style.top = "-300%";
            }
        } else {
            el.classList.remove('visible');
            el.style.top = "-300%";
        }
    });
}

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

function setContextmenu(el, e, not) {
    e.preventDefault();

    hideAllContextmenus();
    setTimeout(() => {
        hideAllContextmenus(not);

        setTimeout(() => {
            el.classList.add('visible');

            console.log(el.offsetWidth, el.offsetHeight);



            if (vh - (e.clientY - 800) >= (e.clientY - (el.offsetHeight + 50))) {
                el.style.top = (e.clientY - 4) + "px";
            } else {
                el.style.top = ((e.clientY - el.offsetHeight) + 4) + "px";
            }

            if (vw - e.clientX >= (el.offsetWidth + 50)) {
                el.style.left = (e.clientX - 4) + "px";
            } else {
                el.style.left = ((e.clientX - el.offsetWidth) + 4) + "px";
            }

            let vs = 0;
            document.querySelectorAll('.context').forEach((ctx) => {
                if (ctx.classList.contains('visible')) vs++;
            });

            if (vs >= 2) {
                global_context.classList.remove('visible');
            }
        }, 2);
    }, 1);
}

/* Global Contextmenu */
let global_context = document.getElementById('global_context');
document.body.addEventListener('contextmenu', (e) => {
    if (!getSelectedText()) {
        setContextmenu(global_context, e);
    } else {
        setContextmenu(document.getElementById('text_context'), e);
        document.getElementById('copy_text').dataset.copyText = getSelectedText();
    }
});

document.getElementById('copy_text').addEventListener('click', () => {
    copyTextToClipboard(document.getElementById('copy_text').dataset.copyText);
    setTimeout(() => {
        document.getElementById('copy_text').parentNode.parentNode.classList.remove('visible');
    }, 2);
});

console.log(vw, vh);

/* Link Contextmenu */
let link_context = document.getElementById('link_context');
document.querySelectorAll('a').forEach((a) => {
    a.addEventListener('contextmenu', (e) => {
        setContextmenu(link_context, e, link_context);
        link_context.querySelector('#newtab').href = a.href;
    });
});

/* Image Contextmenu */
let image_context = document.getElementById('image_context');
document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('contextmenu', (e) => {
        setContextmenu(image_context, e, image_context);
        image_context.querySelector('#open_img').href = img.src;
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
        console.log('Async: Copying to clipboard was successful! (' + text + ')');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}


function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange().text;
    }
    return text;
}