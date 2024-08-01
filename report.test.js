import { test, expect } from "@jest/globals";
import { printReport } from "./report";

test("reprot test", () => {
    const input= {
        '/home': 1000000,
        '/about': 999999,
        '/contact': 888888,
    }
    const expected=[
    'Found 6 internal links to f',
    'Found 4 internal links to d',
    'Found 3 internal links to c',
    'Found 0 internal links to a'
    ]
    const actual=printReport(input)
    expect(actual).toEqual(expected)
})