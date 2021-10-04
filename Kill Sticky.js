// https://gist.github.com/alisdair/5670341

(function() {
    var elements = document.body.querySelectorAll('*');

    // Remove fixed or sticky
    for (let element of elements)
        if (['fixed', 'sticky'].includes(getComputedStyle(element).position))
            element.parentNode.removeChild(element);

    // Enable scrolling
    document.body.style.overflow = 'auto';
})();
