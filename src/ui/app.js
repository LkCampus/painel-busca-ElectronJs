const { remote } = require("electron");
const { format } = require("promise-mysql");
const main = remote.require("./main");
const { getConnection } = require("../database");

const modelo = document.getElementById("modelo");
const tamanho = document.getElementById("tamanho");
const quantidade = document.getElementById("quantidade");
const cor = document.getElementById("cor");

const productsList = document.querySelector("#products");
let products = [];

function renderProducts(tasks) {//imprime na página os valores do banco
  productsList.innerHTML = "";
  tasks.forEach((t) => {
    productsList.innerHTML += `
      <table class="table table-striped">
      <tbody>
        <tr id="bloco">
          <td>${t.modelo}</td>
          <td>${t.tamanho}</td>
          <td>${t.quantidade}</td>
          <td>${t.cor}</td>
        </tr>
      </tbody>
    </table>
    `;
  });
}

const getProducts = async () => {
  products = await main.getProducts();
  renderProducts(products);
};

async function init() {
  getProducts();
}

init();//Imprime na tela todos os dados do banco

//filtro de modelo
const filterProducts = async () => {
  const conn = await getConnection();
  if(modelo.value != "" & quantidade.value != "" & tamanho.value != "" & cor.value != ""){
    const result = await conn.query('SELECT * FROM dados WHERE modelo = '+'"'+modelo.value+'"'+'AND quantidade = '+ '"'+quantidade.value + '" AND tamanho ='+ '"'+tamanho.value + '"AND cor ='+'"'+cor.value+'"'+'');
    return result;
  }
  else if(modelo.value != "" & quantidade.value != "" & tamanho.value != ""){
    const result = await conn.query('SELECT * FROM dados WHERE modelo = '+'"'+modelo.value+'"'+'AND quantidade = '+ '"'+quantidade.value + '" AND tamanho ='+ '"'+tamanho.value +'"'+'');
    return result;
  }
  else if(modelo.value != "" & quantidade.value != ""){
    const result = await conn.query('SELECT * FROM dados WHERE modelo = '+'"'+modelo.value+'"'+'AND quantidade = '+ '"'+quantidade.value + '"'+'');
    return result;
  }
  else if(modelo.value != ""){
    const result = await conn.query('SELECT * FROM dados WHERE modelo = '+'"'+modelo.value+'"'+'');
    return result;
  }else if(quantidade.value != ""){
    const result = await conn.query('SELECT * FROM dados WHERE quantidade = '+'"'+quantidade.value+'"'+'');
    return result;
  }else if(tamanho.value != ""){
    const result = await conn.query('SELECT * FROM dados WHERE tamanho = '+'"'+tamanho.value+'"'+'');
    return result;
  }else if(cor.value != ""){
    const result = await conn.query('SELECT * FROM dados WHERE cor = '+'"'+cor.value+'"'+'');
    return result;
  }
  };

const filterProduct = async () => {
  products = await filterProducts();
  renderProducts(products);
};

  async function filtrar() {
    filterProduct();
  }