# 基于 wepy-redux 更改连接风格 更接近react-redux的写法
# wepy 和 redux 结合的连接器

## 安装

```
npm install wpy-redux --save
```

## 示例

```vue
<template>
  <view class="container">
    <text class="info">{{num}}</text>
    <text class="info">{{inc}}</text>
    <button @tap="addNumAct" size="mini">  + num  </button>
    <button @tap="asyncIncAct" size="mini">  async inc </button>
  </view>
</template>

<script>
  import wepy from 'wepy'
  import { connect } from 'wpy-redux'
  import List from '../components/list'
  import Panel from '../components/panel'
  import Counter from '../components/counter'
  import Group from '../components/group'
  import { INCREMENT } from '../store/types/counter'
  import { asyncInc } from '../store/actions'
  import testMixin from '../mixins/test'
  import {bindActionCreators} from 'redux';


  const mapStateToProps=(state,props)=>({
    num:state.counter.num,
    inc:'inc'
  })

  const mapDispatchToProps=(dispatch)=>bindActionCreators({
    addNumAct:()=>async (dispatch,getState)=>{
      dispatch({type:INCREMENT})
    },
    asyncIncAct:asyncInc
  },dispatch)

  @connect(mapStateToProps,mapDispatchToProps)
  export default class Index extends wepy.page {
  	// ...
    methods = {
      // ...
    }
    // ...
    onLoad() {
    }
  }
</script>
```

## 使用

1. 初始化 store

```js
// app.wpy
import { createStore,applyMiddleware } from 'redux'
import { setStore } from 'wepy-redux'
import rootReducer from './reducers'
//支持action内dispatch
import thunk from 'redux-thunk'

const store = createStore(rootReducer,applyMiddleware(thunk))
// set!!
setStore(store)
```

2. 得到 store

```js
import { getStore } from 'wepy-redux'

const store = getStore()
// 可以直接使用 store 实例了
// dispatch
store.dispatch({type: 'xx'})
// state
const state = store.getState()
```

3. 连接组件，就以上边的示例来说明

```js
// ...
  import { connect } from 'wepy-redux'
   const mapStateToProps=(state,props)=>({
    num:state.counter.num,
    inc:'inc'
  })

  const mapDispatchToProps=(dispatch)=>bindActionCreators({
    addNum:()=>async (dispatch,getState)=>{
      dispatch({type:INCREMENT})
    },
    asyncIncAct:asyncInc
  },dispatch)

  @connect(mapStateToProps,mapDispatchToProps)
  export default class Index extends wepy.page {
  	// ...
    methods = {
      // ...
    }
    // ...
    onLoad() {
    }
  }
```


