const express = require('express');
const db = require('../db');
const routes = express.Router();

routes.get('/', async (req, res, next) => {
  try {
    var result = await db.query('select name , type from fishes');
    return res.json(result.rows);
  } catch (e) {
    return next(e);
  }
});

routes.post('/', async (req, res, next) => {
  try {
    var result = await db.query(
      'insert into fishes (name ,type) values($1 ,$2) returning*',
      [req.body.name, req.body.type]
    );
    return res.json(result.rows[0]);
  } catch (e) {
    return next(e);
  }
});

routes.patch('/:id', async (req, res, next) => {
  try {
    var result = await db.query(
      'update fishes set name=$1 , type =$2 where id = $3 returning*',
      [req.body.name, req.body.type, req.params.id]
    );
    return res.json(result.rows[0]);
  } catch (e) {}
});

routes.delete('/:id', async (req, res, next) => {
  try {
    var result = await db.query('delete from fishes where id = $1 returning*', [
      req.params.id
    ]);
    return res.jason({ message: 'deleted' });
  } catch (e) {
    return next(e);
  }
});
module.exports = routes;
