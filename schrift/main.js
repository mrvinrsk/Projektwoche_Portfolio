document.querySelectorAll('input').forEach((el) => {
    console.log(el);
    el.addEventListener('change', () => {
        changeCSS(el.dataset.cssChange, el.value);
    });
});

function changeCSS(attribute, value) {
    $('body').css(attribute, value);
}