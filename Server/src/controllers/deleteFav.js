const {Favorite} = require('../DB_connection');

const deleteFav = async (req, res) => {
    const { id } = req.params;

    try{
        if(!id){
            return res.status(401).json({error : 'Faltan datos'})
        }
        const character = await Favorite.destroy({
            where : {id : id}
        });

        const characterList = await Favorite.findAll();
        return res.status(200).json(characterList);
        
    }catch(error){
        return res.status(500).json({error: error.message})
    }

}

module.exports = {
    deleteFav
}