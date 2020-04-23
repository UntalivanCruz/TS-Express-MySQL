"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Control1*',
            database: 'heroes_db'
        });
        this.conectar();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.conn.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0)
                callback('El registro solicitado no existe');
            else
                callback(null, results);
        });
    }
    conectar() {
        this.conn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('Base de Datos Online');
        });
    }
}
exports.default = MySQL;
