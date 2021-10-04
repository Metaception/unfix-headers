// ==UserScript==
// @name    Invidious Redirect
// @match   *://*.youtube.com/*
// @match   *://*.youtu.be/*
// @run-at  document-start
// ==/UserScript==

function invidious(instance) {
    var newloc = window.location.href;

    // Host
    if (location.hostname.includes('youtu.be'))
        newloc = newloc.replace('www.youtu.be', instance+'/embed');
    else if (location.hostname.includes('youtube-nocookie.com'))
        newloc = newloc.replace('www.youtube-nocookie.com', instance);
    else if (location.hostname.includes('m.youtube.com'))
        newloc = newloc.replace('m.youtube.com', instance);
    else if (location.hostname.includes('youtube.com'))
        newloc = newloc.replace('www.youtube.com', instance);
    else // Not YouTube
        return;

    // Path
    newloc = newloc.replace('watch?v=', 'embed/');
    if (!location.pathname.includes('?'))
        newloc = newloc.replace('&t=', '?t=');

    // Replace
    window.location.href = newloc;
}

invidious('yewtu.be');
