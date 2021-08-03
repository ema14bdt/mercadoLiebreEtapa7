module.exports = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// Me pasa un número a string para poder aplicarle el metodo replace y cada 3 digitos me pone un punto