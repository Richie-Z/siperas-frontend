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
        toggleTheme(context) {
            context.commit('setTheme', localStorage.theme == 'light' ? 'dark' : 'light')
            // switch (localStorage.theme) {
            //     case 'light':
            //         context.commit('setTheme', 'dark')
            //         break;

            //     default:
            //         context.commit('setTheme', 'light')
            //         break;
            // }
        }
    }
}
export default theme