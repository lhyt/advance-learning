const express = require('express');

const app = express();
express.static.mime.define({ 'application/wasm': ['wasm'] });

app.use(express.static(`${__dirname}`));
app.listen(1111);
