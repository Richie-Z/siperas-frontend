import {
    createStore
} from "vuex";
import themeModules from "./modules/theme"
const defaultState = () => {
    return {
        user: null,
    }
}

const store = createStore({
    state: defaultState(),
    getters: {
        user(state) {
            return state.user;
        },
    },
    mutations: {
        user(state, c) {
            state.user = c
        },
        resetState(state) {
            Object.assign(state, defaultState())
        }
    },
    actions: {
        user(context, c) {
            context.commit("user", c);
        },
        resetState(context) {
            context.commit("resetState")
        },
    },
    modules: {
        theme: themeModules
    }
})

export default store;