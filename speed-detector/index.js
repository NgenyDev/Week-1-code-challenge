function velocity(speed){
    const requiredSpeed = 70;
    const demeritPoints = 5;
    if(speed <= 70){
        return 'Ok'
    } else if (speed > 70 && speed<=130) {
        let exceedPoints = (speed - requiredSpeed) / demeritPoints;
        return `Points: ${exceedPoints}`
    } else {
        return 'Licence suspended'
    }

}
console.log(velocity(0))
