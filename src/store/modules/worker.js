//animation web-worker
const state = {
        worker: {},
        progress: 0,
        frame: {}
    },
    mutations = {
        startWorker(state) {
            let start = performance.now();

            function animate(time) {
                state.progress = time - start;
                start = time;
                requestAnimationFrame(animate.bind(this));
            }
            state.frame = requestAnimationFrame(animate.bind(this));




        },
        stopWorker(state) {
            cancelAnimationFrame(state.frame)
        }
    }




export default { state, mutations }