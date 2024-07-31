import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";


test("normalize URL", () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
    expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
    expect(normalizeURL('https://blog.boot.dev/')).toBe('blog.boot.dev');
    expect(normalizeURL('https://blog.boot.dev')).toBe('blog.boot.dev');
});

test("get URL from HTML", () => {
    const inputBody =`
        <html>
            <body>
                <a href="https://blog.boot.dev/"><span>Go to Boot.dev</span></a>
                <a href="/bleh/blob">Learn Backend Development</a>
                <a href="leh/blob">Invalid</a>
            </body>
        </html>
        `
    const inputBase ='https://blog.boot.dev'
    const actual = getURLsFromHTML(inputBody,inputBase)
    const expected = ["https://blog.boot.dev/", "https://blog.boot.dev/bleh/blob"]
    expect(actual).toEqual(expected)

})