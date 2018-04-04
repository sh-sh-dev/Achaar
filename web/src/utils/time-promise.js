const wait = (delay) => {
    // eslint-disable-next-line
    return new Promise(function(resolve) {
        setTimeout(resolve, delay)
    });
}

export default wait;
