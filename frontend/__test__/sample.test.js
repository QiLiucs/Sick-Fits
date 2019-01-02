describe('sample test 101',()=>{
    //it()=test()
    xit('work as expected',()=>{
       const age=100;
       expect(1).toEqual(1);
       expect(age).toEqual(100);
    });
    xit("handles ranges just fine",()=>{
        const age=200;
        expect(age).toBeGreaterThan(100);
    });
    xit("makes a list of dogs",()=>{
        const dogs=["lal","fat","bowie"];
        expect(dogs).toContain("lal");
    })
});