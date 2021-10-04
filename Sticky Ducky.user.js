// Sticky Ducky: Show at top

// ==UserScript==
// @name    Sticky Ducky
// @match   *://*/*
// ==/UserScript==

var stickyTypes = ['div', 'nav', 'header', 'footer'];
var stickyNodes = [];

function hideSticky() {
    if (window.scrollY)
        for (let node of stickyNodes) {
            node.style.setProperty('opacity', '0', 'important');
            node.style.setProperty('visible', 'hidden', 'important');
        }
    else
        for (let node of stickyNodes) {
            node.style.setProperty('opacity', '1', 'important');
            node.style.setProperty('visible', 'visible', 'important');
        }
}

function checkNode(node) {
    if (!stickyTypes.includes(node.nodeName.toLowerCase()))
        return;
    if (!['fixed', 'sticky'].includes(getComputedStyle(node).position))
        return;
    if (stickyNodes.includes(node))
        return;

    stickyNodes.push(node);
    hideSticky();
}

// Static elements
window.addEventListener('load', function() {
    requestIdleCallback(function() {
        for (let node of document.body.querySelectorAll(stickyTypes.toString()))
            checkNode(node);
    }, {timeout: 1000});
});

window.addEventListener('scroll', function() {
    requestIdleCallback(function() {
        hideSticky();
    }, {timeout: 200});
});

// Dynamic elements
var observer = new MutationObserver(function(mutations) {
    requestIdleCallback(function() {
        for (let mutation of mutations) {
            if (mutation.type === 'attributes')
                checkNode(mutation.target);
            for (let node of mutation.addedNodes)
                checkNode(node);
        }
    }, {timeout: 1000});
});

observer.observe(document.body, {
    attributeFilter: ['class', 'style'],
    childList: true,
    subtree: true
});
