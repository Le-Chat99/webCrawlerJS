function printReport(pages) {
    
    console.log('===========Reporting===========')
    let tpages = Object.entries(pages)
    tpages=tpages.sort(function(a,b) {
        return b[1] - a[1]
    })

    for (const page of tpages) {
        console.log(`Found ${page[1]} internal links to ${page[0]}`)
    }
    
}

export { printReport }