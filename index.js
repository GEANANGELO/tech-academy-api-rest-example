import express, { request, response } from 'express';
import { StatusCodes} from 'http-status-codes';

const app = express();
const PORT = 3000;
//variavel com lista de usuarios
let users = [
    { id: 1, name: 'rafael ribeiro', age: 31 },
    { id: 2, name: 'gabril custodio', age: 27 },
];
//criando um midle para definir que todos requests no formato json 
app.use(express.json());

//abaixo criamos apenas o servidor pra rodar a porta 3000
app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});

//criramos a rota de get pra acessar a raiz e acessar o h1
app.get('/', (request, response) => {
    return response.send('<h1>trabalhando com servidor express.</h1>');
});

//acessar rota com lista de usuarios 
app.get('/users', (request, response) => {
    return response.send(users);
    //retona nossa lista de usuarios
});

//rota pra pegar usuario especifico
app.get('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const user = users.find(user => {
        return (user.id === Number(userId))
    })
    return response.send(user);
});

//adicionar novo usuario na lista e retornar
app.post('/users', (request, response) => {
    const newUser = request.body;

    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);
});

app.put('/users/:userId', (request, response) =>{
    const userId = request.params.userId;
    const updatedUser = request.body;

    users = users.map(user => {
        if (Number(userId) === user.id) {
            return updatedUser;
        }    

        return user;
    });

    return response.send(updatedUser);
});

app.delete('/users/:userId', (request, response) => {
    const userId = request.params.userId;

    users = users.filter((user) => user.id !== Number(userId))

    return response.status(StatusCodes.NO_CONTENT).send();
});