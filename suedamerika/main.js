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
