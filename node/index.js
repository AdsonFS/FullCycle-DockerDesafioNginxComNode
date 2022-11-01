const { faker } = require('@faker-js/faker');
const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlInit = `CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT primary key, name varchar(255) NOT NULL);`
connection.query(sqlInit)

app.get('/', async (req, res) => {
    const randomName = faker.name.firstName();
    const sqlInsert = `INSERT INTO people (name) values('${randomName}');`;
    connection.query(sqlInsert);

    let names;
    const sqlQuery = `SELECT name FROM people;`;
    connection.query(sqlQuery, (_, namesResult) => {
        names = namesResult.map(el => `<li>${el.name}</li>\n`);
        res.send(`<h1>${'Full Cycle Rocks!'}</h1>\n<ul>${names.toString().replaceAll(',', '')}</ul>`)
    });

})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})



