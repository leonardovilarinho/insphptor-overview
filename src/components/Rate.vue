<template>
    <section :style="{color : color}">
        <icon name="star"
            v-for="(i, key) in stars"
            :key="'i' + key"
            :style="hasMargin(key, false)"
        />

        <icon name="star-half-o" v-if="medium" />

        <icon name="star-o"
            v-for="(i, key) in empty"
            :key="'o' + key"
            :style="hasMargin(key, true)"
        />
        <small>{{ value.toFixed(1) }}</small>
    </section>
</template>

<script>
export default{
    name: 'i-rate',
    data: () => ({
        medium: false,
        stars: 0,
        color: '#eee'
    }),
    watch: {
        value() { this.update() }
    },
    props: {
        value: {
            type: Number,
            default: 0
        }
    },
    computed: {
        empty() {
            return (this.medium ? 4 : 5) - this.stars
        }
    },
    mounted() {
        this.update()
    },
    methods: {
        update() {
            this.stars = this.value
            this.color = this.stars > 2.5 ? '#41B883' : '#35495E'
            if(this.value.toString().includes('.')) {
                this.stars = +this.value.toString().split('.')[0]
                this.medium = this.value.toString().split('.')[1] >= 5 ? true : false
            }
            else
                this.medium = false
        },
        hasMargin(key, after) {
            if(!after && (key + 1) == this.stars)
                return { margin: '0px 0px 0px 2px' }

            if(after && key == 0)
                return { margin: '0px 2px 0px 0px' }

            return {margin: '0px 2px'}
        }
    }
}
</script>
