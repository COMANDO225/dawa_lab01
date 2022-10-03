import Express from "express";
import fs from "fs";

const app = Express();

app.use(Express.json());

const PORT = 9000

app.get("/", (req, res) => {
    // enviar index.html
    fs.readFile("./pages/index.html", (err, data) => {
        if (err) {
            res.status(500).send("Error");
        } else {
            res.send(data.toString());
        }
    })
});

app.get("/:enlace", (req, res) => {
    // enviar nosotros.html
    fs.readFile(`./pages/${req.params.enlace}.html`, (err, data) => {
        if (err) {
            res.status(500).send("Error");
        } else {
            res.send(data.toString());
        }
    })
})

const usuarios = [
    { id: 1, nombre: "Joao" },
    { id: 2, nombre: "Maria" },
    { id: 3, nombre: "José" },
]

app.get('/api/usuarios', (req, res) => {
    res.send(usuarios);
})

app.get('/api/usuarios/:id', (req, res) => {
    let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) res.status(404).send("El usuario no fue encontrado");
    res.send(usuario);
})

app.post('/api/usuarios', (req, res) => {
    const usuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre
    }
    usuarios.push(usuario);
    res.send(usuario);
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});