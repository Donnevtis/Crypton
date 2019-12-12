//animation web-worker

const state = {
        worker: {}
    },
    mutations = {
        startWorker(state) {
            const work = "onmessage=e=>(eval(`(${(e.data)})()`))";
            const blob = new Blob([work], { type: "application/javascript" });
            const url = URL.createObjectURL(blob);
            state.worker = new Worker(url)
                // worker's code:
            const obj = () => {
                let start = 0;
                requestAnimationFrame(function animate(time) {
                    let progress = time - start;
                    start = time;
                    postMessage(progress);
                    requestAnimationFrame(animate);
                });
            };
            //
            state.worker.postMessage(obj.toString());
            URL.revokeObjectURL(url);
        },
        stopWorker(state) {
            state.worker.terminate()
        }
    }




export default { state, mutations }