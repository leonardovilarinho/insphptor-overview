<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="card">
                <div class="card-content" style="max-height: 70vh; min-height: 70vh; overflow-y: hidden">
                    <div class="columns">
                        <p class="column is-9" style="font-weight: bold">
                            {{ current.namespace }}\{{ current.name }}
                        </p>
                        <span class="column is-3 has-text-right">{{ current.weight }}w</span>
                    </div>
                    <div class="details" style="max-height: 55vh; overflow-y: auto">
                        <p><strong v-lang.title.type /> {{current.type}}</p>
                        <div v-if="Object.keys(current.attributes).length > 0">
                            <p><strong v-lang.title.attributes /></p>
                            <ul style="list-style: circle; margin-left: 30px">
                                <li v-for="att in current.attributes">
                                    <span class="blue">{{att.visibility}}</span>
                                    <span class="green">{{att.name}}</span>
                                </li>
                            </ul>
                        </div>
                        <div v-if="Object.keys(current.methods).length > 0">
                            <p><strong v-lang.title.methods /></p>
                            <ul style="list-style: circle; margin-left: 30px">
                                <li v-for="met in current.methods">
                                    <span class="blue">{{met.visibility}}</span>
                                    <span class="green">{{met.name}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <footer class="card-footer">
                    <p class="card-footer-item" style="cursor: pointer" @click="close">
                        <a v-lang.more.close />
                    </p>
                </footer>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<script>
export default{
    name: 'i-modal',
    data: () => ({
        current: {}
    }),
    watch: {
        $language() { this.$forceUpdate() }
    },
    methods: {
        open(item) {
            this.current = item
            this.$el.className = 'modal is-active'
        },
        close() {
            this.$el.className = 'modal'
        },
    }
}
</script>
