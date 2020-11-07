function getCreateDate () {
    const now = new Date;
    const createData = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} - ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    return createData    
}

function pagination({prepareMoveTo}) {

    let move = prepareMoveTo.move
    let page = prepareMoveTo.page
    let multiple = prepareMoveTo.numberOfPages
    
    let offset = 0
    
    if (typeof move === 'undefined') {  
        page = 0 
        
    } 

    if (move === 'back') {
        -- page
        -- offset 

        if (page < 0) {
            page = 0
        }
    }

    if (move === 'next') {
       ++ page 
        
    }
    
    offset = page * multiple

    return moveTo = {
        page,
        offset
    }
}

module.exports = {
    getCreateDate,
    pagination
}