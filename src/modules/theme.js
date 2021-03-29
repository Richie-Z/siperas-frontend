const theme = {
    state: {
        theme: ""
    },
    getters: {
        getTheme(state) {
            return state.theme;
        }
    },
    mutations: {
        setTheme(state, c) {
            state.theme = c
            localStorage.theme = c
        },
    },
    actions: {
        initTheme(context) {
            const cachedTheme = localStorage.theme ? localStorage.theme : false;
            const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (cachedTheme)
                context.commit('setTheme', cachedTheme)
            else if (userPrefersDark)
                context.commit('setTheme', 'dark')
            else
                context.commit('setTheme', 'light')
        },
        toggleTheme(context, c) {
            context.commit('setTheme',
                c == 1 ? 'light' :
                c == 2 ? 'dark' :
                localStorage.theme == 'dark' ? 'light' : 'dark')
        }
    }
}
export default theme