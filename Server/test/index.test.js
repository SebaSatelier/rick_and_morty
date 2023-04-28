const {server} = require('../src/app');
const session = require('supertest');
const request = session(server);

const character = {
    id : 5,
    name : 'Sebastian',
    species : 'human',
    gender : 'male',
    status : 'alive',
    origin : {
        name: 'earth'
    },
    image : 'image.jpg'
}

describe("Test de RUTAS",()=>{
    describe('GET /rickandmorty/character/:id', ()=>{
        it('Responde con status: 200', async ()=> {
            await request.get('/rickandmorty/character/1').expect(200);
        })
        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = await request.get('/rickandmorty/character/1');
            for (const props in character) {
                expect(response.body).toHaveProperty(props)  
                }
        })
        it('Si hay un error responde con status: 500', async () => {
            await request.get('/rickandmorty/character/90a').expect(500);
        })
    })    
    describe('GET /rickandmorty/login', () => {
        const obj = {access:true}
        it("Debe devolver un objeto con la propiedad acces en true si la informacion es correcta", async  ()=>{
            const response = await request.get(`/rickandmorty/login?email=a@a.com&password=asdasd1`)
            expect(response.body).toEqual(obj)
        })
        it("Debe devolver un objeto con la propiedad acces en false si la informacion es incorrecta", async  ()=>{
            const response = await request.get(`/rickandmorty/login?email=asd@a.com&password=asdasdasd1`)
            obj.access = false;
            expect(response.body).toEqual(obj)
        })
    })
    describe("POST /rickandmorty/fav", ()=>{
        it('Debe devolver un arreglo con el objeto enviado', async ()=>{
            const response = await request.post(`/rickandmorty/fav`).send(character)
            expect(response.body).toContainEqual(character)
        })
        it('Si se envia uno nuevo, debe devolver el array con lo que tenia previamente y lo nuevo',async () => {
            character.id = 900000
            character.name = 'Goku'
            character.origin = "Planeta Vegita"
            const response = await request.post(`/rickandmorty/fav`).send(character)

            expect(response.body.length).toEqual(2)
        })
    })
    describe("DELETE /rickandmorty/fav/:id", ()=> {
        it('Si no encuentra el ID, debe devolver el mismo array', async () =>{
            const response = await request.delete('/rickandmorty/fav/asd');
            console.log(response.body)
            expect(response.body.length).toEqual(2)
        })
        it('Si se envia un ID valido, debe eliminarlo de la base de datos', async () => {
            const response = await request.delete('/rickandmorty/fav/900000');
            console.log(response.body)
            expect(response.body.length).toEqual(1)
        })
    })
})
