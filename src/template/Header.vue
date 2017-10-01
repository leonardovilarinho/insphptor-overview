<template>
    <section class='hero is-primary'>
        <div class='hero-body'>
            <h1 class='title is-capitalized'>{{ title }}</h1>
        </div>
    </section>
</template>

<script>
export default{
    name: 'in-header',
    props: ['title']
}
</script>
