function Person(name,foods){
    this.name=name;
    this.foods=foods;
}

describe("mocking learning",()=>{
    xit("mocks a regular runc",()=>{
        //jest.fn():mock a function
        const fetchDogs=jest.fn();
        fetchDogs("hhh");
        expect(fetchDogs).toHaveBeenCalled();
        expect(fetchDogs).toHaveBeenCalledWith("hhh");
        expect(fetchDogs).toHaveBeenCalledTimes(1);
    });
    xit("can fetch foods",async ()=>{
        const me=new Person('wes',["sushi","beef"]);
        //fetchFav返回this.foods
        me.fetchFav=jest.fn().mockResolvedValue(["sushi","beef"]);
        //必须是promise function,must await.否则会返回{}
        const favs=await me.fetchFav();
        expect(favs).toContain("sushi");
    });
});