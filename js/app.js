//agarramos los elementos que tienen funcion para utilizar ej Js
const cart = document.querySelector('#carrito');
const template = document.querySelector('#template');
const btn = document.querySelectorAll('.btn');
const fragment = document.createDocumentFragment(); //creamos fragment para evitar reflog

const cartObject = {}; //creamos un object donde agregamos cada fruta cuando se le da click a los botones

const addProduct = (e) => { //agregamos una funcion de agregar al carrito para que se ejecute cuando le demos click a los botones
    const product = { //creamos el objecto donde esta toda la informacion de las frutas que vamos a colocar en el cartObject
        title: e.target.dataset.fruta, //e.target = elemento que esta emitiendo un evento
        id: e.target.dataset.fruta, //obtenemos el dataset que agregamos a los botones con la info respectiva de c/boton para detectar a que fruta le pertenece cada elemento
        amount: 1,
    };

    if (cartObject.hasOwnProperty(product.id)) { //si el elemento existe dentro del cartObject
        product.amount = cartObject[product.title].amount + 1; //accedo al priducto del carrito, accedo a su cantidad, y le sumo 1
    }   

    cartObject[product.title] = product; //hacemos honor al nombre de la funcion. agregamos product
    showCart(product); //creamos uan funcion para mostrarlo en la web (ejecucion). product = argumento
};

btn.forEach ((item) => {
    item.addEventListener('click', addProduct); //agregamos un evento para que reaccione cuando le damos click
});


const showCart = () => { //creamos uan funcion para mostrarlo en la web (funcion)
    cart.textContent = ''; //para evitar que se repitan los elementos por el forEach(), decimos que antes que se muestre, el carrito del DOM parta vacio

    Object.values(cartObject).forEach((item) => { //recorremos el carrito con object.values y hacemos honor a la funcion showCart()
        const clone = template.content.firstElementChild.cloneNode(true); //para mostrarlo, usamos el template pero antes lo clonamos

        clone.querySelector('.lead').textContent = item.title;   //cambiamos el contenido del template
        clone.querySelector('.badge').textContent = item.amount;//cambiamos el contenido del template

        fragment.appendChild(clone); //subimos lo que clonamos al fragment

    });
    
    cart.appendChild(fragment); //subimos el fragment al DOM
};
