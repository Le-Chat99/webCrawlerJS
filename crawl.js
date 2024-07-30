import { JSDOM } from 'jsdom'
function normalizeURL(urlString) {
    const pURL= new URL(urlString)
    let fullPath= `${pURL.hostname}${pURL.pathname}`
    if (fullPath.endsWith('/')) {
        fullPath=fullPath.slice(0,-1);
    }
    return fullPath
}

function getURLsFromHTML(htmlBody, baseURL) {
    let dom = new JSDOM(htmlBody);
    let tags = dom.window.document.querySelectorAll('a');
    let rlt=[];
    for (const tag of tags) {
        if (tag.hasAttribute('href')) {
            let href= tag.getAttribute('href')
            try {
                href = new URL(tag.href, baseURL).href;
                rlt.push(href);
            } catch (err) {
                console.log(`${err.message}: ${href}`)
            }
        }
    }
    return rlt
}



export { normalizeURL, getURLsFromHTML }
