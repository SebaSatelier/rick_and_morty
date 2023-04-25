

let myFavorites = [];

const postFav = (request,response) =>{
    const favorite = request.body
    myFavorites.push(favorite)
    return response.status(200).json(myFavorites)
}

const deleteFav = (request,response)=>{
    const id = request.params.id

    myFavorites = myFavorites.filter(favorite => favorite.id !== +id)
    
    return response.status(200).json(myFavorites)

}

module.exports = {
    postFav,
    deleteFav
}