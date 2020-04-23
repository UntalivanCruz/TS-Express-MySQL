"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heroes', (req, res) => {
    const query = `
   SELECT *
   FROM heroes
   `;
    mysql_1.default.ejecutarQuery(query, (err, resp) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                respuesta: resp
            });
        }
    });
});
router.get('/heroes/:id', (req, res) => {
    const id = req.params.id;
    const escapeId = mysql_1.default.instance.conn.escape(id);
    const query = `
   SELECT *
   FROM heroes
   WHERE idheroes=${escapeId}
   `;
    mysql_1.default.ejecutarQuery(query, (err, resp) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                respuesta: resp[0]
            });
        }
    });
});
exports.default = router;
