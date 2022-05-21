Vue.component("aleph-upgrade", {
    props: ["upgrade"],
    template: `<resource-upgrade :upgrade="upgrade" :resourcename="'<span class=` + 'aleph' + `>⋙</span>'"></resource-upgrade>`
});