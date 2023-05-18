import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        codeRunResult:[],//代码返回结果
        runTime:0,
        isRun:false,
    },

    mutations: {

        updateCodeRunResult(state,data){
            state.codeRunResult=data
        },

        updateRunTime(state,data){
          state.runTime=data
        },

        updateIsRun(state,data){
            state.isRun=data
        }


    }

})
