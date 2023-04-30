import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        codeRunResult:[],//代码返回结果
    },

    mutations: {

        updateCodeRunResult(state,data){
            state.codeRunResult=data
        }


    }

})
