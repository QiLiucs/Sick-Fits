import ItemComponent from "../components/Item"
import CartCount from "../components/CartCount"
import {shallow} from "enzyme"
import toJSON from "enzyme-to-json"
const fake={
    id:"123",
    title:"A cool Item",
    price:2000,
    description:"yeah",
    image:"ddd.jpg",
    largeImage:"largedog.jpg"
};
describe("<Item/>",()=>{
    it("renders and matches the snapshot",()=>{
        // const price='$40.90';
        // expect(price).toMatchSnapshot();
        const wrapper=shallow(<ItemComponent item={fake}/>);
        // expect(wrapper).toMatchSnapshot();//snap包含了太多我们不想要的内容，如果只想要被渲染的component?
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
    it("updated via props",()=>{
        const wrapper=shallow(<CartCount count={20}/>);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.setProps({count:30});
        expect(toJSON(wrapper)).toMatchSnapshot();
    })
    // it("render properly",()=>{
    //    const wrapper=shallow(<ItemComponent item={fake}/>);
    //    console.log(wrapper.debug());
    //    const priceTag=wrapper.find("PriceTag");
    //    console.log(priceTag.debug());
    //     {/*<PriceTag>*/}
    //         {/*$20*/}
    //     {/*</PriceTag>*/}
    //     console.log(priceTag.text());//<PriceTag />
    //     //dive: go one level deeper
    //     console.log(priceTag.dive().text())//$20
    //     console.log(priceTag.children().text());//$20
    //     expect(priceTag.children().text()).toBe("$20");
    //     expect(wrapper.find("Title a").children().text()).toBe(fake.title);
    //     const image=wrapper.find("img");
    //     console.log(image.debug());//<img src="ddd.jpg" alt="A cool Item" />
    //     console.log(image.props());//{ src: 'ddd.jpg', alt: 'A cool Item' }
    //     expect(image.props().src).toBe(fake.image);
    // });
    // it("renders buttonlist properly",()=>{
    //     const wrapper=shallow(<ItemComponent item={fake}/>);
    //     const buttonList=wrapper.find(".buttonList");
    //     //Method “text” is only meant to be run on a single node
    //     //so buttonList.children().text() is wrong
    //     console.log(buttonList.children().debug());
    //     expect(buttonList.children()).toHaveLength(3);
    //     expect(buttonList.children().find("Link").exists()).toBe(true);
    // })
});