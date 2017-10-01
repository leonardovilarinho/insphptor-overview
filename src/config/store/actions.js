export default {
    addFile: (context, file) => {
        context.commit('ADD_FILE', file)
    },
    setMetric: (context, metric) => {
        context.commit('SET_METRIC', metric)
    },
    setInterval: (context, interval) => {
        context.commit('SET_INTERVAL', interval)
    },
}
