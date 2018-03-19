const wait = (delay) => {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay)
    });
}

export default wait;
