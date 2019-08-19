const state = {
        timestamps: [
            { id: 0, t: "1m", mnth: 1 },
            { id: 1, t: "3m", mnth: 3 },
            { id: 2, t: "6m", mnth: 6 },
            { id: 3, t: "1y", mnth: 12 },
            { id: 4, t: "Now", mnth: 0 },
        ],
        activeStamp: 0
    },
    getters = {
        getStamps: state => state.timestamps,
        getActiveStamp: state => state.activeStamp,

    },
    actions = {},
    mutations = {
        onActive(state, mnth) {
            state.activeStamp = mnth;
        }
    };


export default {
    state,
    getters,
    actions,
    mutations
}