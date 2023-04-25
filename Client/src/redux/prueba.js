const arrayFunc = (array,order)=>{
    return array.sort((a,b) => (order === 'A')? a-b : b-a)
}


const array = [1,10,15,3,4,8,25];



console.log(arrayFunc(array,"A"));

