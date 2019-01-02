import {mount} from "enzyme"
import toJSON from "enzyme-to-json"
import wait from "waait"
import SingleItem,{SINGLE_ITEM_QUERY} from "../components/SingleItem"
import {MockedProvider} from "react-apollo/test-utils"
import {fakeItem} from "../lib/testUtils"
describe("<SingleItem/>",()=>{
    it("renders with proper data",async()=>{
        // Invariant Violation: Could not find "client" in the context or passed in as a prop. Wrap the root component in an <ApolloProvider>, or pass an ApolloClient instance in via props.
           //const wrapper=mount(<SingleItem id="123"/>);
        //所以需要提供假的provider
        //mocks: array of objects
        const mocks=[{
            //when someone makes a request with this query and variables combo
            request:{query:SINGLE_ITEM_QUERY,variables:{id:'123'}},
            //then return this fake data(mocked data)
            result:{
                data:{
                    item:fakeItem(),
                },
            },
        }];
        const wrapper=mount(
            <MockedProvider mocks={mocks}>
                <SingleItem id="123"/>
            </MockedProvider>
        );
        // console.log(wrapper.debug());//此时会显示Loading...,不利于我们debug,所以使用wait
        await wait();
        wrapper.update();
        console.log(wrapper.debug());
        expect(toJSON(wrapper.find("h2"))).toMatchSnapshot();
        expect(toJSON(wrapper.find("img"))).toMatchSnapshot();
    });
    //why
    it("Errors with a not found item",async()=>{
        const mocks=[{
            request:{query:SINGLE_ITEM_QUERY,variables:{id:"123"}},
            result:{
                errors:[{message:"Items Not Found!"}],
            }
        }];
        const wrapper=mount(<MockedProvider mocks={mocks}>
            <SingleItem id="123"/>
        </MockedProvider>);
        await wait();
        wrapper.update();
        console.debug(wrapper.debug());
        const item=wrapper.find('[data-test="graphql-error"]');
        console.log(item.text());//Shoot!Items Not Found!只打印显示的文本内容！！！
        expect(item.text()).toContain("Items Not Found!");
        expect(toJSON(item)).toMatchSnapshot();
    })
});
