
export default {
    head: {
        titleTemplate: 'Cryptonix',

        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: "msapplication-TileColor", content: "#da532c" },
            { name: "theme-color", content: "#ffffff" },
            // hid is used as unique identifier. Do not use `vmid` for it as it will not work
            { hid: 'description', name: 'description', content: 'Meta description' }
        ],

        link: [
            {
                rel: "icon",
                href: "/favicon/favicon.ico"
            },
            {
                rel: "apple-touch-icon",
                sizes: "180x180",
                href: "/favicon/apple-touch-icon.png"
            },
            {
                rel: "icon",
                type: "image/png",
                sizes: "32x32",
                href: "/favicon/favicon-32x32.png"
            },
            {
                rel: "icon",
                type: "image/png",
                sizes: "16x16",
                href: "/favicon/favicon-16x16.png"
            },
            {
                rel: "manifest",
                href: "/favicon/site.webmanifest"
            },
            {
                rel: "mask-icon",
                href: "/favicon/safari-pinned-tab.svg",
                color: "#5bbad5"
            }
        ]
    },
    router: {
        linkActiveClass: 'active-link',
        linkExactActiveClass: 'exact-active-link',
    },


    modules: ['@nuxtjs/style-resources'],
    styleResources: {
        scss: [
            './assets/scss/_common.scss'
        ]
    }
}