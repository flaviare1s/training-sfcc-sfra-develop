'use strict';

var server = require('server'); // Importa um objeto chamado `server` que controla as rotas.

server.extend(module.superModule); // Faz com que o novo controller use o que o `superModule` (módulo superior) já tem.

server.append('Show', function (req, res, next) {
    // Adiciona algo novo no endpoint 'Show'.
    var viewData = res.getViewData(); // Pega os dados que já existem.
    viewData.example = 'Hello World Again!'; // Cria um novo dado chamado `example` com o valor "Hello World Again!".

    res.setViewData(viewData); // Salva esse novo dado na resposta.
    return next(); // Passa para a próxima função.
});

module.exports = server.exports(); // Exporta esse controller para ser usado.
