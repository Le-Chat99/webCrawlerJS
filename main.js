function main() {
    const argv= process.argv
    if (argv.length<3) {
        console.log('err: no URL')
    } else if (argv.length>3) {
        console.log('err: to much')
    } else if (argv.length===3) {
        console.log('Just right')
    }
}

main()