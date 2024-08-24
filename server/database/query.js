import crypto from 'crypto';
class Persona {
    constructor(database) {
        this.database = database;
    }

    async getPersonas() {
        const query = 'SELECT * FROM Pesonas';
        try {
            const [rows] = await this.database.query(query);
            return rows;
        } catch (err) {
            console.error('Error en getPersonas:', err);
            throw err;
        }
    }

    async getPersonasById(id) {
        const query = 'SELECT * FROM Personas WHERE id = ?';
        try {
            const [rows] = await this.database.query(query, [id]);
            return rows;
        } catch (err) {
            console.error('Error en getPersonasById:', err);
            throw err;
        }
    }

    async deletePersonas(id) {
        const query = 'DELETE FROM Personas WHERE id = ?';
        try {
            const [result] = await this.database.query(query, [id]);
            return result;
        } catch (err) {
            console.error('Error en deletePersonas:', err);
            throw err;
        }
    }

    async updatePersonas(id, Nombre, Apellido, Contraseña) {
        const salt = crypto.randomBytes(16).toString('hex'); 
        const hash = crypto.pbkdf2Sync(Contraseña, salt, 1000, 64, 'sha512').toString('hex'); 
        try {
            const query = 'UPDATE Persona SET Nombre = ?, Apellido = ?, Contraseña = ? WHERE id = ?';
            const [result] = await this.database.query(query, [Nombre, Apellido, `${salt}:${hash}`, id]);
            return result;
        } catch (err) {
            console.error('Error en updatePersona:', err);
            throw err;
        }
    }

    async addPersonas(Nombre, Apellido, Contraseña) { {      
        const salt = crypto.randomBytes(16).toString('hex'); 
        const hash = crypto.pbkdf2Sync(Contraseña, salt, 1000, 64, 'sha512').toString('hex'); 

        try {
            const query = 'INSERT INTO Usuario (Nombre, Apellido, Contraseña) VALUES (?, ?, ?)';
            const [result] = await this.database.query(query, [Nombre, Apellido, `${salt}:${hash}`]);
            return result;
        } catch (err) {
            console.error('Error en addPersona:', err);
            throw err;
        }
    }
    }
}

export default Persona;
