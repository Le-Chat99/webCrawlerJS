import { JSDOM } from 'jsdom'

function normalizeURL(urlString) {
    const pURL= new URL(urlString)
    let fullPath= `${pURL.hostname}${pURL.pathname}`
    if (fullPath.length>0 && fullPath.slice(-1)==='/') {
        return fullPath.slice(0,-1)
    }
    return fullPath
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const tags = dom.window.document.querySelectorAll('a')
    const rlt=[]
    for (const tag of tags) {
        if (tag.href.slice(0,1)==='/'){
            try {
                const urlO = new URL(`${baseURL}${tag.href}`)
                rlt.push(urlO.href)
            } catch (err) {
                console.log(`Relative url error: ${err.message}`)
            }
            

        } else {
            try {
                const urlO = new URL(tag.href)
                rlt.push(urlO.href)
            } catch (err) {
                console.log(`Absolute url error: ${err.message}`)
            }
        }
        }
    return rlt
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    const currentURLObj = new URL(currentURL)
    const baseURLObj = new URL(baseURL)
    if (currentURLObj.hostname !== baseURLObj.hostname) {
        return pages
    }
    const curtnURL =normalizeURL(currentURL)
    if (pages[curtnURL] > 0) {
        pages[curtnURL]++
        return pages
    }

    pages[curtnURL]=1
    
    try {
        const res = await fetch(currentURL);

        if (res.status>399) {
            console.log(`Got HTTP error: ${res.status} ${res.statusText},page: ${currentURL}`)
            return pages
        }
        const contentType = res.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`Got non-HTML response: ${contentType},page: ${currentURL}`)
            return pages
        }
        const htmlBody= await res.text()
        
        const nextURLs = getURLsFromHTML(htmlBody,baseURL)
        
        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }

    } catch (err) {
        console.log(`Got Network error: ${err.message},page: ${currentURL}`)
    }
    return pages
}
    


export { normalizeURL, getURLsFromHTML, crawlPage }
