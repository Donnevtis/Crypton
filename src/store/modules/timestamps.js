const state = {
        timestamps: [
            { id: 0, active: false, t: "1m", mnth: 1 },
            { id: 1, active: false, t: "3m", mnth: 3 },
            { id: 2, active: false, t: "6m", mnth: 6 },
            { id: 3, active: false, t: "1y", mnth: 12 },
            { id: 4, active: true, t: "Now", mnth: 0 },
        ]

    },
    getters = {
        getStamps: state => state.timestamps,
        getActiveStamp: state => state.timestamps.find(stamp => stamp.active),
        getStartTime(state, getters) {
            return new Date().setMonth(new Date().getUTCMonth() - getters.getActiveStamp.mnth)
        },
        getDateRange(state, getters) {
            return getters.getActiveStamp.dateRange = Date.now() - getters.getStartTime;
        }

    },
    actions = {},
    mutations = {
        setActiveStamp(state, id) {
            state.timestamps.forEach(stamp => stamp.active = stamp.id === id ? true : false);
        },

    };


export default {
    state,
    getters,
    actions,
    mutations
}