const state = {
        timestamps: [
            { id: 0, active: false, t: "1m", mnth: 1 },
            { id: 1, active: false, t: "3m", mnth: 3 },
            { id: 2, active: false, t: "6m", mnth: 6 },
            { id: 3, active: false, t: "1y", mnth: 12 },
            { id: 4, active: true, t: "Now", mnth: 0, },
        ],
        time: () => setInterval(() => Date.now(), 1000)

    },
    getters = {
        getStamps: state => state.timestamps,
        getActiveStamp: state => state.timestamps.find(stamp => stamp.active),
        getStartTime(state, getters) {
            if (getters.getActiveStamp.mnth) {
                return new Date().setMonth(new Date().getMonth() - getters.getActiveStamp.mnth)
            }
            return Date.now() - 36e4;
        },
        getDateRange(state, getters) {
            return Date.now() - getters.getStartTime;
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