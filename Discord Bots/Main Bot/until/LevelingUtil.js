this.getlevel = (level) => {
    return level * level * 100 + 100
}
this.getLevel = (xp) => {
    return Math.floor(0.177 * Math.sqrt(xp)) + 1;
}
this.gainedXp = () => {
    return Math.ceil(Math.random() * 10) + 5;
}
this.getlow = (xp) => {
    return Math.floor(0.177 * Math.sqrt(xp)) + 1;
}

this.getLevelBounds = (level) => {
    // Example: getLevelBounds(1)
    // Results: lowerBound: 1, upperBound: 32
    const lowerBound = Math.ceil(((level - 1) / 0.177) ** 2);
    const upperBound = Math.ceil((level / 0.177) ** 2);
    return { lowerBound, upperBound };
}