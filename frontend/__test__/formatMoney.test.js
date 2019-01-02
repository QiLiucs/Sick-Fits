import formatMoney from "../lib/formatMoney"
describe("test formatMoney func",()=>{
    xit("works with fractional follars",()=>{
        expect(formatMoney(40)).toEqual("$0.40");
    });
    xit("cents formatted to usc dollars",()=>{
        expect(formatMoney(1000)).toEqual("$10");
    });
    xit("works with whole and fractional dollars",()=>{
        expect(formatMoney(12234567)).toEqual("$122,345.67");
    })
});