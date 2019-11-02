console.log(231);
onmessage = e => {
    let start = 0;

    requestAnimationFrame(function animate(time) {
        let progress = time - start;
        start = time;
        postMessage(progress)

        requestAnimationFrame(animate);
    })

};