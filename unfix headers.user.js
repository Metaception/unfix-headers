// ==UserScript==
// @name    Mutation Observer
// @match   *://*/*
// ==/UserScript==

function checkNode(node) {
    if (node.nodeName === 'VIDEO')
        fasterVideo(node);
    else if (node.nodeName === 'IFRAME')
        replaceIframe(node);

    // Check descendants
    for (let video of node.getElementsByTagName('video'))
        fasterVideo(video);
    for (let iframe of node.getElementsByTagName('iframe'))
        replaceIframe(iframe);
}

// Static elements
window.addEventListener('load', function() {
    requestIdleCallback(function() {
        checkNode(document.body);
    }, {timeout: 1000});
});

// Dynamic elements
var observer = new MutationObserver(function(mutations) {
    requestIdleCallback(function() {
        for (let mutation of mutations) {
            for (let node of mutation.addedNodes)
                checkNode(node);
        }
    }, {timeout: 1000});
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
