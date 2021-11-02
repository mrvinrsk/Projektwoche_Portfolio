/* Animation */
let delay = 0;
document.querySelector('main').querySelectorAll('*').forEach((el) => {
    el.style.opacity = "0";

    el.style.animation = "fadeIn .6s";
    if (delay > 0) {
        el.style.animationDelay = delay + "ms";
    }
    el.style.animationIterationCount = "1";
    el.style.animationFillMode = "forwards";

    delay += 25;
});