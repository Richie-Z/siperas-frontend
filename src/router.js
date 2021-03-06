import {
    createWebHistory,
    createRouter
} from 'vue-router'
import Landing from "@/views/Landing.vue"
import Dashboard from "@/views/menu/Dashboard.vue"
import Petugas from "@/views/menu/petugas/Index.vue"
import Kelas from "@/views/menu/kelas/Index.vue"
import Siswa from "@/views/menu/siswa/Index.vue"
import Main from "@/components/Main.vue"
const routes = [{
        path: "/",
        name: "landing",
        component: Landing,
        meta: {
            guestOnly: true,
            title: "Siperas - Sistem Informasi Pembayaran SPP",
        }
    },
    {
        path: '/menu',
        component: Main,
        meta: {
            authOnly: true,
        },
        children: [{
                path: 'dashboard',
                name: "dashboard",
                meta: {
                    title: "Dashboard - Sistem Informasi Pembayaran SPP ",
                },
                component: Dashboard,
            },
            {
                path: 'petugas',
                name: 'petugas',
                meta: {
                    title: "Data Petugas - Sistem Informasi Pembayaran SPP ",
                },
                component: Petugas,
                props: route => ({
                    query: route.query.status
                })
            },
            {
                path: 'petugas/tambah',
                name: 'tambahPetugas',
                meta: {
                    title: "Tambah Petugas - Sistem Informasi Pembayaran SPP ",
                },
                component: () => import('@/views/menu/petugas/Create.vue'),
            },
            {
                path: 'petugas/:id',
                name: 'detailPetugas',
                meta: {
                    title: "Detail Petugas - Sistem Informasi Pembayaran SPP ",
                },
                props: true,
                component: () => import('@/views/menu/petugas/Show.vue')
            },
            {
                path: 'kelas',
                name: 'kelas',
                meta: {
                    title: "Data Kelas - Sistem Informasi Pembayaran SPP ",
                },
                component: Kelas,
                props: route => ({
                    query: route.query.status
                })
            },
            {
                path: 'kelas/tambah',
                name: 'tambahKelas',
                meta: {
                    title: "Tambah Kelas - Sistem Informasi Pembayaran SPP ",
                },
                component: () => import('@/views/menu/kelas/Create.vue'),
            },
            {
                path: 'kelas/:id',
                name: 'detailKelas',
                meta: {
                    title: "Detail Kelas - Sistem Informasi Pembayaran SPP ",
                },
                props: true,
                component: () => import('@/views/menu/kelas/Show.vue')
            },
            {
                path: 'siswa',
                name: 'siswa',
                meta: {
                    title: "Data Siswa - Sistem Informasi Pembayaran SPP ",
                },
                component: Siswa,
                props: route => ({
                    query: route.query.status
                })
            },
            {
                path: 'siswa/tambah',
                name: 'tambahSiswa',
                meta: {
                    title: "Tambah Siswa - Sistem Informasi Pembayaran SPP ",
                },
                component: () => import('@/views/menu/siswa/Create.vue'),
            },
            {
                path: 'siswa/:id',
                name: 'detailSiswa',
                meta: {
                    title: "Detail Siswa - Sistem Informasi Pembayaran SPP ",
                },
                props: route => ({
                    id: route.params.id,
                    status: route.query.status
                }),

                component: () => import('@/views/menu/siswa/Show.vue')
            },
            {
                path: 'siswa/spp',
                name: 'detailSpp',
                meta: {
                    title: "Detail Spp - Sistem Informasi Pembayaran SPP ",
                },
                props: route => ({
                    siswa_id: route.query.siswa_id,
                    spp_id: route.query.spp_id,
                }),
                component: () => import('@/views/menu/siswa/spp/Show.vue'),
            },
            {
                path: 'siswa/spp/tambah',
                name: 'tambahSpp',
                meta: {
                    title: "Tambah Spp- Sistem Informasi Pembayaran SPP ",
                },
                props: route => ({
                    siswa_id: route.query.siswa_id,
                }),
                component: () => import('@/views/menu/siswa/spp/Create.vue')
            },
            {
                path: 'pembayaran',
                name: 'pembayaran',
                component: () => import('@/views/menu/pembayaran/Index.vue'),
            },
            {
                path: 'pembayaran/baru',
                name: 'tambahPembayaran',
                component: () => import('@/views/menu/pembayaran/Create.vue'),
            },
            {
                path: 'buku_spp',
                name: 'spp',
                component: () => import('@/views/menu/siswa/BukuSpp.vue'),
            },
        ]
    },
    {
        path: '/menu/pembayaran/:id/cetak',
        name: 'detailPembayaran',
        component: () => import('@/views/menu/pembayaran/Show.vue'),
        props: true
    }
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