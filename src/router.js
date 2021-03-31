import {
    createWebHistory,
    createRouter
} from 'vue-router'
import Landing from "@/views/Landing.vue"
import Main from "@/components/Main.vue"
const routes = [{
        path: "/",
        name: "landing",
        component: Landing,
        meta: {
            guestOnly: true,
            title: "Siperas - Sistem Informasi Pembayaran SPP ",
        }
    },
    {
        path: '/menu',
        component: Main,
        children: [{
                path: 'dashboard',
                name: "dashboard",
                meta: {
                    authOnly: true,
                    title: "Dashboard - Sistem Informasi Pembayaran SPP ",
                },
                component: () => import('@/views/menu/Dashboard.vue'),
            },
            {
                path: 'petugas',
                name: 'petugas',
                meta: {
                    authOnly: true,
                    title: "Data Petugas - Sistem Informasi Pembayaran SPP ",
                },
                component: () => import('@/views/menu/petugas/Index.vue'),
            },
            {
                path: 'petugas/tambah',
                name: 'tambahPetugas',
                meta: {
                    authOnly: true,
                    title: "Tambah Petugas - Sistem Informasi Pembayaran SPP ",
                },
                component: () => import('@/views/menu/petugas/Index.vue'),
            },
        ]
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

function isLoggedIn() {
    return localStorage.siperas_key;
}
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.authOnly)) {
        if (!isLoggedIn()) {
            next({
                path: "/",
                query: {
                    redirect: to.fullPath
                },
            });
        } else {
            next();
        }
    } else if (to.matched.some((record) => record.meta.guestOnly)) {
        if (isLoggedIn()) {
            next({
                path: "/menu/dashboard",
                query: {
                    redirect: to.fullPath
                },
            });
        } else next();
    } else {
        next();
    }
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
    // `/nested`'s will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    // Skip rendering meta tags if there are none.
    if (!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
            const tag = document.createElement('meta');

            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key]);
            });

            // We use this to track which meta tags we create so we don't interfere with other ones.
            tag.setAttribute('data-vue-router-controlled', '');

            return tag;
        })
        // Add the meta tags to the document head.
        .forEach(tag => document.head.appendChild(tag));
    next();
});

export default router