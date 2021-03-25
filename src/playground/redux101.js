import { createStore } from "redux";


const incrementCount = ({incrementBy = 1}={})=>({
    type:'INCREMENT',
    incrementBy
})
const store = createStore((state = { count: 0 }, action) => {
    switch(action.type){
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'RESET':
            return{
                count:0
            }
        case 'SET':
            return{
                count: action.count
            }
        default:
            return state;
    }
});

console.log(store.getState());
store.dispatch({type:'INCREMENT', incrementBy:5});
store.dispatch({type:'INCREMENT'});
store.dispatch({type:'SET',count:80})
console.log(store.getState()); 