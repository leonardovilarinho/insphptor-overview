let AliasTranslate = {}

AliasTranslate.install = (Vue, options) =>  {
    Vue.mixin({
        methods: {
            t(text, val = '') {
                return this.translate(this.$language, text, val)
            },
            tooltip(object, list = null, lang = true) {
                let list_html = '';
                if(list != null) {
                    for(let item in list) {
                        let name  = lang ? this.t(item) : this.t(`metrics.${item}`)
                        let value = lang ? this.t(list[item]) : list[item]
                        list_html += `
                            <li>
                                <strong>${name}</strong>:
                                ${value}
                            </li>
                        `
                    }
                    list_html = `<ul>${list_html}</ul>`
                }
                return `
                    <div class="tol-title">
                        <strong>${this.t(`tool.${object}.title`)}</strong>
                    </div>
                    <div class="tol-body">
                        <span>${this.t(`tool.${object}.body`)}<span>
                        <br>
                        ${list_html}
                    </div>
                `
            }
        }
    })
}

export default AliasTranslate
