// ==UserScript==
// @name    Replace iFrame
// @match   *://*/*
// @run-at  document-idle
// ==/UserScript==

function replaceIframe(iframe) {
    // Create anchor
    var anchor =                document.createElement('a');
    anchor.rel =                'noopener noreferrer';
    anchor.target =             '_blank';
    anchor.style.display =      'block';
    anchor.style.overflow =     'hidden';
    anchor.style.background =   'silver';

    // Get source
    anchor.href = iframe.src;
    anchor.textContent = anchor.href;

    // Check iframe
    if (!anchor.href)
        return;
    if (anchor.href.includes('www.google.com/recaptcha/'))
        return;
    if (iframe.height === '0' || iframe.width === '0')
        return;
    if (iframe.height === '1' || iframe.width === '1')
        return;
    if (iframe.style.visibility === 'hidden')
        return;

    // Replace iframe
    iframe.parentNode.insertBefore(anchor, iframe);
}

function checkNode(node) {
    if (node.nodeName === 'IFRAME')
        replaceIframe(node);

    // Check descendants
    for (let iframe of node.getElementsByTagName('iframe'))
        replaceIframe(iframe);
}

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
