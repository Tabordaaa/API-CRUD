import express from 'express';
const router = express.Router();
import pool from '../database/db.js'; 
import Usuario from '../database/query.js'; 

const personaModel = new Usuario(pool);


router.get('/Personas', async (req, res) => {
    try {
        const personas = await personaModel.getPersonas();
        res.json(personas);
    } catch (error) {
        console.error('Error al obtener Personas:', error);
        res.status(500).send('Error en el servidor');
    }
});


router.get('/Personas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const persona = await personaModel.getPersonasById(id);
        if (persona.length === 0) {
            res.status(404).send('persona no encontrada');
        } else {
            res.json(persona[0]);
        }
    } catch (error) {
        console.error('Error al obtener persona por ID:', error);
        res.status(500).send('Error en el servidor');
    }
});

router.post('/Personas', async (req, res) => {
    const { Nombre, Apellido, Contraseña } = req.body;
    try {
        const result = await personaModel.addPersonas(Nombre, Apellido, Contraseña);
        res.status(201).send(`Persona agregada con ID: ${result.insertId}`);
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        res.status(500).send('Error en el servidor');
    }
});


router.put('/PersonasUpdate/:id', async (req, res) => {
    const { id } = req.params;
    const { Nombre, Apellido, Contraseña } = req.body;
    try {
        const result = await personaModel.updatePersonas(id, Nombre, Apellido, Contraseña);
        if (result.affectedRows === 0) {
            res.status(404).send('Persona no encontrada');
        } else {
            res.send(`Persona con ID ${id} actualizada`);
        }
    } catch (error) {
        console.error('Error al actualizar Persona:', error);
        res.status(500).send('Error en el servidor');
    }
});

router.delete('/PersonasDelete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await personaModel.deletePersonas(id);
        if (result.affectedRows === 0) {
            res.status(404).send('Persona no encontrada');
        } else {
            res.send(`Persona con ID ${id} eliminada`);
        }
    } catch (error) {
        console.error('Error al eliminar Persona:', error);
        res.status(500).send('Error en el servidor');
    }
});

export default router;
