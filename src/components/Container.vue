<template>
    <article class="column">
        <div class="field">
            <p v-text="t(title)"/>
            <p class="control has-icons-left">
                <slot/>
                <span class="icon is-small is-left">
                    <icon name="calendar" />
                </span>
            </p>
        </div>
        <slot name="histogram" />
        <slot name="boxplot" />
    </article>
</template>

<script>
export default{
    name: 'i-container',
    props: [ 'title', 'build' ],
}
</script>
