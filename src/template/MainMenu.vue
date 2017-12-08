<template>
    <header class='navbar is-transparent has-shadow navbar-fixed' id="navbar">
        <div class='navbar-brand'>
            <router-link class='navbar-item' to="/">
                <img src='../assets/logo.png' alt='Vue'  height='28' /> Insphptor Overview
            </router-link>

            <a class='navbar-item is-hidden-desktop-only' href='https://github.com/leonardovilarinho' target='_blank'>
                <span class='icon' style='color: #333;'>
                    <i class='fa fa-lg fa-github' />
                </span>
            </a>
            <a class='navbar-item' href='https://twitter.com/leonardovdev' target='_blank'>
                <span class='icon' style='color: #55acee;'>
                    <i class='fa fa-lg fa-twitter' />
                </span>
            </a>

            <div class='navbar-burger burger' @click="toggle">
                <span/>
                <span/>
                <span/>
            </div>
        </div>

        <div class='navbar-end'>
            <div class='navbar-menu' id='menuCollapsed'>
                <a class='navbar-item' v-lang.languages.en @click='$language = "en"' />
                <a class='navbar-item' v-lang.languages.pt @click='$language = "pt"'/>
            </div>
        </div>
    </header>
</template>

<script>
export default{
    name: 'in-main-menu',
    watch: {
        $language() {
            this.toggle()
        }
    },
    methods: {
        toggle() {
            var nav = document.getElementById('menuCollapsed')
            nav.classList.toggle('is-active')
        },
        toggleLanguages() {
            var nav = document.getElementById('dropLanguages')

            nav.classList.toggle('is-active')
        },
    }
}
</script>

<style lang='sass' scoped>
    .navbar-fixed
        top: 0
        z-index: 100
        position: fixed
        width: 100%
</style>
