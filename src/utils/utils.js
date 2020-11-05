function getCreateDate () {
    const now = new Date;
    const createData = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} - ${now.getHours()}:${now.getMinutes()}`
    return createData    
}

module.exports = {
    getCreateDate
}