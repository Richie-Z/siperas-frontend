import {
    createStore
} from "vuex";
import themeModules from "./modules/theme"
const defaultState = () => {
    return {
        user: null,
        rekap: null,
        per_week: null,
        per_petugas: null
    }
}

const store = createStore({
    state: defaultState(),
    getters: {
        user(state) {
            return state.user;
        },
        rekap(state) {
            return state.rekap;
        },
        perWeek(state) {
            return state.per_week;
        },
        perPetugas(state) {
            return state.per_petugas;
        }
    },
    mutations: {
        user(state, c) {
            state.user = c
        },
        rekap(state, c) {
            state.rekap = c
        },
        perWeek(state, c) {
            state.per_week = c
        },
        perPetugas(state, c) {
            state.per_petugas = c
        },
        resetState(state) {
            Object.assign(state, defaultState())
        }
    },
    actions: {
        user(context, c) {
            context.commit("user", c);
        },
        rekap(context, c) {
            context.commit("rekap", c);
        },
        perWeek(context, c) {
            context.commit("perWeek", c);
        },
        perPetugas(context, c) {
            context.commit("perPetugas", c);
        },
        resetState(context) {
            context.commit("resetState")
        },
    },
    modules: {
        theme: themeModules,
    }
})

export default store;