import { getStore } from '../store';
const connect=(states, actions)=> {
    return (Component)=>{
      const onStateChange=function (){
        const store = getStore();
        const state=states(store.getState());
        let isUpdate=Object.keys(state).findIndex((k)=>{
          return this[k]!==state[k]
        })!=-1
        if(isUpdate){
          setData.call(this);
          this.$apply();
        }
      }

      const setData=function(){
        //设置data
        const store = getStore();
        let state= states(store.getState(),this)
        let newData={}
        Object.keys(state).map((k)=>{
          newData[k]=()=>state[k];
        })
        this.computed = Object.assign(this.computed || {}, newData);
      }
      const setActions=function(){
        //设置data
        const store = getStore();
        let actionsFun= actions(store.dispatch)
        let newData={}
        Object.keys(actionsFun).map((k)=>{
          newData[k]=actionsFun[k];
        })
        this.methods = Object.assign(this.methods || {}, newData);
      }
      return class extends Component{
          constructor () {
              super();
              setData.call(this);
              setActions.call(this);
          }
          onLoad(){
            const store = getStore();
            const state = store.getState();
            store.subscribe(onStateChange.bind(this))
            super.onLoad(arguments);
          }
      };
    };
};

export default connect