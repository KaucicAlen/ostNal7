setInterval(() => {
    console.clear();
    const datum = new Date();
    let izpisDatuma = "Danes je " + datum.getDate() + ". " + (datum.getMonth() + 1) + ". " + datum.getFullYear();
    let izpisUre = `Ura je ${('0' + datum.getHours()).slice(-2)}:${('0' + datum.getMinutes()).slice(-2)}:${('0' + datum.getSeconds()).slice(-2)}`;
    console.log(izpisDatuma);
    console.log(izpisUre);
})