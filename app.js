const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Set Handlebars as the view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Path to the "database" file
const messagesPath = path.join(__dirname, 'mensajes.json');

// Route GET /: Display all messages
app.get('/', (req, res) => {
    try {
        const fileContent = fs.readFileSync(messagesPath, 'utf-8');
        const mensajes = JSON.parse(fileContent);
        res.render('index', { mensajes });
    } catch (error) {
        console.error('Error reading messages:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Route POST /nuevo-mensaje: Save a new message
app.post('/nuevo-mensaje', (req, res) => {
    const { usuario, mensaje } = req.body;

    if (!usuario || !mensaje) {
        return res.status(400).send('Usuario y mensaje son obligatorios');
    }

    try {
        // Read current messages
        const fileContent = fs.readFileSync(messagesPath, 'utf-8');
        const mensajes = JSON.parse(fileContent);

        // Add the new message
        mensajes.push({ usuario, mensaje, fecha: new Date().toLocaleString() });

        // Save back to file
        fs.writeFileSync(messagesPath, JSON.stringify(mensajes, null, 2));

        // Redirect to homepage
        res.redirect('/');
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).send('Error al guardar el mensaje');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
