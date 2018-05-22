export function createIframe(url) {
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);
    return iframe;
}

export function destroyeIframe(iframe) {
    iframe.parentNode.removeChild(iframe);
}

export function uuid(template) {
  return (template || 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

export function getDomain(url) {
    var el = document.createElement('a');
    el.href = url;
    return el.protocol + '//' +  el.host;
}
