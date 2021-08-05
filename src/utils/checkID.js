/* Valido que el ID este en nuestra base de datos de productos */

module.exports = (id,dataBase) => (id && !!dataBase.find(product => product.id === id));