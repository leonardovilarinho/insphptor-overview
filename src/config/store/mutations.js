export default {
    'ADD_FILE': (state, file) => {
        state.jsons.push(file)
    },
    'SET_METRIC': (state, metric) => {
        state.metric = metric
    },
    'SET_INTERVAL': (state, interval) => {
        state.interval = interval
    },
}
