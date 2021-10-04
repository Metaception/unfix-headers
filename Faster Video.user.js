// ==UserScript==
// @name    Greasemonkey
// @match   *://*/*
// @run-at  document-start
// ==/UserScript==

function checkNode(node) {
    if (node.nodeName === 'VIDEO') {
        video.defaultPlaybackRate = 1.5;
        video.playbackRate =        1.5;
    }
    else if (node.nodeName === 'IFRAME') {
        let frame = iframe.contentDocument;
        for (let video of frame.getElementsByTagName('video')) {
            video.defaultPlaybackRate = 1.5;
            video.playbackRate =        1.5;
        }
    }

    // Check descendants
    for (let video of node.getElementsByTagName('video')) {
        video.defaultPlaybackRate = 1.5;
        video.playbackRate =        1.5;
    }
    for (let iframe of node.getElementsByTagName('iframe')) {
        let frame = iframe.contentDocument;
        for (let video of frame.getElementsByTagName('video')) {
            video.defaultPlaybackRate = 1.5;
            video.playbackRate =        1.5;
        }
    }
}

window.addEventListener('DOMContentLoaded', function() {
    requestIdleCallback(function() {
        if (document.readyState === 'interactive')
            checkNode(document.body);
    }, {timeout: 1000});
});

window.addEventListener('load', function() {
    // Static elements
    requestIdleCallback(function() {
        checkNode(document.body);
    }, {timeout: 1000});

    // Dynamic elements
    var observer = new MutationObserver(function(mutations) {
        for (let mutation of mutations)
            for (let node of mutation.addedNodes)
                checkNode(node);
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
