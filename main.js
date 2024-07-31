import { normalizeURL, getURLsFromHTML, crawlPage } from "./crawl.js";


async function main() {
    const argv= process.argv
    if (argv.length<3) {
        console.log('err: no URL')
        process.exit(1)
    } else if (argv.length>3) {
        console.log('err: to much')
        process.exit(1)
    } else if (argv.length===3) {
        console.log('Just right')
    }
    const baseURL = process.argv[2]
    console.log(`starting crawl of: ${baseURL}...`)
    const pages= await crawlPage(baseURL,baseURL,{})
    for (const page of Object.entries(pages)) {
        console.log(page)
    }
}   



main()