/*
*    JS Para la logica de la aplicacion
*   @autor: Juanja
*   @version: 1.0
*/


//Inicializacion de var, objetos, DOM
var error;
var shopItems;
var itemImg;
var Pcitems;
var dropCompra;
var dropProds;
var listaProductos;
var cpuItems;
var gpuItems;
var ramItems;
var hddItems;
var motherItems;
var totalPrice;
var auxPrice = 0;

var listaCompra = [];

//Hacemos que el parte del HTML nazca desde JS
const listaCPU = [{nombre: 'Ryzen 5 5600X', precio: 300, img: 'Images/ryzen5.jpg'},{nombre: 'Intel Core i5 10400F', precio: 200, img: 'Images/i5.png'},];
const listaGPU = [{nombre: 'Nvidia RTX 4070', precio: 400, img: 'Images/rtx4070.png'},{nombre: 'Nvidia GT 710', precio: 500, img: 'Images/gt710.png'},];
const listaRAM = [{nombre: '8GB DDR4', precio: 50, img: 'Images/ram8gb.jpg'},{nombre: '16GB DDR4', precio: 100, img: 'Images/ram16gb.jpg'},];
const listaHDD = [{nombre: 'SSD 500GB', precio: 30, img: 'Images/ssd500gb.jpg'},{nombre: 'HDD 1TB', precio: 20, img: 'Images/hdd1tb.png'},];
const listaMother = [{nombre: 'Asus Prime B450M-A', precio: 100, img: 'Images/b450.png'},{nombre: 'Biostar s1150', precio: 150, img: 'Images/s1150.jpg'},];



function cargandoProductos(){
    //Cargamos los productos en el DOM

    //CPUs
    for(let item of listaCPU){
        let newli = document.createElement('li');
        let newimg = document.createElement('img');
        let newp = document.createElement('p');
        let newspan = document.createElement('span');
        newimg.src = item.img;
        newimg.alt = item.nombre;
        newimg.className = 'item';
        newimg.height = 100;
        newp.textContent = item.nombre;
        newspan.textContent = '$'+item.precio;
        newli.appendChild(newimg);
        newli.appendChild(newp);
        newli.appendChild(newspan);
        cpuItems.appendChild(newli);
    }

    //GPUs
    for(let item of listaGPU){
        let newli = document.createElement('li');
        let newimg = document.createElement('img');
        let newp = document.createElement('p');
        let newspan = document.createElement('span');
        newimg.src = item.img;
        newimg.alt = item.nombre;
        newimg.className = 'item';
        newimg.height = 100;
        newp.textContent = item.nombre;
        newspan.textContent = '$'+item.precio;
        newli.appendChild(newimg);
        newli.appendChild(newp);
        newli.appendChild(newspan);
        gpuItems.appendChild(newli);
    }

    //RAM
    for(let item of listaRAM){
        let newli = document.createElement('li');
        let newimg = document.createElement('img');
        let newp = document.createElement('p');
        let newspan = document.createElement('span');
        newimg.src = item.img;
        newimg.alt = item.nombre;
        newimg.className = 'item';
        newimg.height = 100;
        newp.textContent = item.nombre;
        newspan.textContent = '$'+item.precio;
        newli.appendChild(newimg);
        newli.appendChild(newp);
        newli.appendChild(newspan);
        ramItems.appendChild(newli);
    }

    //Storage
    for(let item of listaHDD){
        let newli = document.createElement('li');
        let newimg = document.createElement('img');
        let newp = document.createElement('p');
        let newspan = document.createElement('span');
        newimg.src = item.img;
        newimg.alt = item.nombre;
        newimg.className = 'item';
        newimg.height = 100;
        newp.textContent = item.nombre;
        newspan.textContent = '$'+item.precio;
        newli.appendChild(newimg);
        newli.appendChild(newp);
        newli.appendChild(newspan);
        hddItems.appendChild(newli);
    }

    //Motherboards
    for(let item of listaMother){
        let newli = document.createElement('li');
        let newimg = document.createElement('img');
        let newp = document.createElement('p');
        let newspan = document.createElement('span');
        newimg.src = item.img;
        newimg.className = 'item';
        newimg.height = 100;
        newimg.alt = item.nombre;
        newp.textContent = item.nombre;
        newspan.textContent = '$'+item.precio;
        newli.appendChild(newimg);
        newli.appendChild(newp);
        newli.appendChild(newspan);
        motherItems.appendChild(newli);
    }
}


//Cargamos la lista de la compra desde el localStorage
function cargandoCarrito(){
    let lista = localStorage.getItem('listaCompra');
    if(lista != null){
        listaCompra = JSON.parse(lista);
        for(let item of listaCompra){
            let newitem = document.createElement('li');
            let newImg = document.createElement('img');
            let newp = document.createElement('p');
            let cantidadP = document.createElement('p');
            let price = document.createElement('span');
            newImg.src = item.img;
            newImg.alt = item.item;
            newp.textContent = item.item;
            price.textContent = item.precio;
            cantidadP.textContent = 'Cantidad: '+item.cantidad;
            newImg.height = 100;
            newImg.id = 'item'+item.item;
            newImg.className = 'item';
            newitem.appendChild(newImg);
            newitem.appendChild(newp);
            newitem.appendChild(cantidadP);
            newitem.appendChild(price);
            listaProductos.appendChild(newitem);
            auxPrice+=parseInt(item.precio.substring(1))*item.cantidad;
        }
        totalPrice.textContent = 'Total: $'+auxPrice;
    }
    
}



function moviendoImg(e){
    var id = e.target.alt;
    console.log('Moviendo img',id);
    itemImg = e.target;
    e.dataTransfer.setData('text',id);
    
}

function addCompra(e){
    e.preventDefault();
    
    console.log('Agregando compra');
    
    //Creamos un nuevo elemento de la lista
    let newitem = document.createElement('li');
    let newImg = document.createElement('img');
    let newp = document.createElement('p');
    let cantidadP = document.createElement('p');
    let price = document.createElement('span');

    //Comprobamos si el elemento no esta en la lista
    if(listaCompra.findIndex(x => x.item == itemImg.alt) == -1){
        let cantidad = 1;
        newImg.src = itemImg.src;
        newImg.alt = itemImg.alt;
        newp.textContent = itemImg.alt;
        price.textContent = itemImg.nextSibling.nextSibling.textContent;
        cantidadP.textContent = 'Cantidad: '+cantidad;
        
        newImg.height = 100;
        //Creamos un id para el elemento para identificarlo en el Html
        newImg.id = 'item'+itemImg.alt;
        //Asignamos la clase item para poder moverlo
        newImg.className = 'item';
        newitem.appendChild(newImg);
        newitem.appendChild(newp);
        newitem.appendChild(cantidadP);
        newitem.appendChild(price);
        listaProductos.appendChild(newitem);
        listaCompra.push({item: itemImg.alt, cantidad: cantidad , precio: price.textContent, img: itemImg.src});
    }else{
        //Si ya está en la lista, aumentamos la cantidad
        let index = listaCompra.findIndex(x => x.item == itemImg.alt);
        listaCompra[index].cantidad++;
        let cantidad = listaCompra[index].cantidad;
        //Buscamos el elemento en la html
        let item = document.getElementById('item'+itemImg.alt);
        //Actualizamos la cantidad
        item.nextSibling.nextSibling.textContent = 'Cantidad: '+cantidad;
    }
        
    
    //Añadimos el precio al total
    let precio = itemImg.nextSibling.nextSibling.textContent;
    //Cast a numero
    precio = parseInt(precio.substring(1)); //Quitamos el signo de dolar
    
    console.log(precio);

    auxPrice+=precio;
    totalPrice.textContent = 'Total: $'+auxPrice;

    //Añadimos el evento para eliminar el item
    newImg.addEventListener('dragstart', moviendoImg);

    //Guardamos la lista en el localStorage
    localStorage.setItem('listaCompra',JSON.stringify(listaCompra));


}

function deleteItem(e){
    //Evitamos que se ejecute el evento por defecto
    e.preventDefault();

    //Imprimir datos del target
    console.log('Eliminando compra');
    console.log(e.target.alt);

    
    var id = e.dataTransfer.getData('text');
    console.log('Identi ' ,id);

    //Buscamos el elemento en la lista
    let itemIndex = listaCompra.findIndex(x => x.item == id);

    if( itemIndex != -1){
        //Buscamos la cantidad
        let cantidad = parseInt(listaCompra[itemIndex].cantidad);
        //Buscamos el precio del producto
        let precio = document.getElementById('item'+id).nextSibling.nextSibling.nextSibling.textContent;

        //Si la cantidad es 1, eliminamos el elemento
        if(cantidad == 1){
            //Eliminamos el elemento de la lista
            listaCompra.splice(itemIndex,1);
            //Eliminamos el padre del elemento
            document.getElementById('item'+id).parentNode.remove();

        }else{
            //Si no, disminuimos la cantidad
            listaCompra[itemIndex].cantidad--;
            //Actualizamos la cantidad en el DOM
            document.getElementById('item'+id).nextSibling.nextSibling.textContent = 'Cantidad: '+listaCompra[itemIndex].cantidad;
        }
        //Actualizamos el precio total
        precio = parseInt(precio.substring(1));
        auxPrice-=precio;
        totalPrice.textContent = 'Total: $'+auxPrice;
    }
    
}


/**
 * Carga de objetos del DOM, comprobaciones y eventos del formulario
 */
function domReady(){
    //Captura de todos los elements necesarios
    cpuItems = document.getElementById('cpus');
    gpuItems = document.getElementById('gpus');
    ramItems = document.getElementById('ram');
    hddItems = document.getElementById('storage');
    motherItems = document.getElementById('motherboards');
    totalPrice = document.getElementById('total');


    error = document.getElementById('error');
    shopItems = document.getElementById('shopItems');
    //Guarda los elementos de la tienda en una lista
    Pcitems = document.getElementsByClassName('item');

    listaProductos = document.getElementById('listaProductos');

    //Cargamos los productos en el DOM
    cargandoProductos();
    //Elementos del drag and drop
    for(let item of Pcitems){
        item.addEventListener('dragstart',moviendoImg);

    }

    //Elemento donde se suelta la imagen
    dropCompra = document.getElementById('dropArea');
    //Evento para evitar que se ejecute el evento por defecto
    dropCompra.addEventListener('dragover', e=> {e.preventDefault()});
    //Evento para soltar la imagen
    dropCompra.addEventListener('drop', addCompra);

    //Drop area para los productos
    dropProds = document.getElementById('remDrop');

    dropProds.addEventListener('dragover', e=> {e.preventDefault()});
    dropProds.addEventListener('drop', deleteItem);

}

document.addEventListener('DOMContentLoaded',domReady)



