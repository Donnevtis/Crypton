const state = {
        timestamps: [
            { id: 0, t: "1m", mnth: 1, dateRange: null, startTime: null },
            { id: 1, t: "3m", mnth: 3, dateRange: null, startTime: null },
            { id: 2, t: "6m", mnth: 6, dateRange: null, startTime: null },
            { id: 3, t: "1y", mnth: 12, dateRange: null, startTime: null },
            { id: 4, t: "Now", mnth: 0, dateRange: 0, startTime: 0 },
        ],
        activeStamp: 0
    },
    getters = {
        getStamps: state => state.timestamps,
        getActiveStamp: state => state.activeStamp,
        getActiveTimeStamp: state => state.timestamps.find((stamp) => stamp.mnth == state.activeStamp),
        getDateRange(state, getters) {
            const startTime = new Date().setMonth(new Date().getUTCMonth() - state.activeStamp)
            getters.getActiveTimeStamp.startTime = startTime
            return getters.getActiveTimeStamp.dateRange = Date.now() - startTime
        }

    },
    actions = {},
    mutations = {
        onActive(state, mnth) {
            state.activeStamp = mnth;
        },

    };


export default {
    state,
    getters,
    actions,
    mutations
}