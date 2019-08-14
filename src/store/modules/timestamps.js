const state = {
        timestamps: [
            { id: 0, t: "1m", mth: 1, active: false },
            { id: 1, t: "3m", mth: 3, active: false },
            { id: 2, t: "6m", mth: 6, active: false },
            { id: 3, t: "1y", mth: 12, active: false },
            { id: 4, t: "Now", mth: 0, active: true }
        ],
    },
    getters = {
        getStamps: state => state.timestamps

    },
    actions = {},
    mutations = {
        onActive(state, id) {
            state.timestamps.find(item => item.active === true).active = false;
            state.timestamps.find(item => item.id === id).active = true;
        }
    };


export default {
    state,
    getters,
    actions,
    mutations
}