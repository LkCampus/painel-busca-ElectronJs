const { BrowserWindow } = require("electron");
const { getConnection } = require("./database");//conexão com banco de dados

let window;

const getProducts = async () => {//ordena os dados, mais atuais encima
  const conn = await getConnection();
  const results = await conn.query("SELECT * FROM dados ORDER BY id DESC");
  return results;
};

const getProductById = async (id) => {//seleciona todos os dados do banco
  const conn = await getConnection();
  const result = await conn.query("SELECT * FROM dados WHERE id = ?", id);
  return result[0];
};

function createWindow() {//Cria janela do programa
  window = new BrowserWindow({
    width: 800,
    height: 600,
    icon:__dirname+'/icone.jpg',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  window.loadFile("src/ui/index.html");
}

module.exports = {//exporta funções criadas
  createWindow,
  getProducts,
  getProductById
};