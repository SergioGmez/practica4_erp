//Comprobacion de objetos

function testObject(){
    console.log("---Comprobación de objetos---");
    console.log("Creamos objeto Category");
    var cat1 = new Category("Ropa");
    cat1.description = "Todo tipo de ropa";
    console.log(cat1.toString()); 
    console.log("Creamos otro objeto Category"); 
    var cat2 = new Category("Tecnología");
    cat2.description = "Todo tipo de aparato electrónico";
    console.log(cat2.toString());
    console.log("Creamos objeto Product"); 
    var pro1 = new Product(1111, "Camiseta", 19.99);
    console.log(pro1.toString()); 
    var book1 = new Book(2222, "Libro", 14.99, 32);
    console.log(book1.toString()); 
}

function testStoreHouseCategory(){
    
    console.log("----Test de métodos relacionados con el objeto category----");
    console.log("Añadimos dos categoria. Hay que tener en cuenta la categoria por defecto.");
    console.log("Añadiendo: "+cat1.toString()+" Número de categorias: "+sh.addCategory(cat1));
    console.log("Añadiendo: "+cat2.toString()+" Número de categorias: "+sh.addCategory(cat2));
    console.log("Intentamos volver a añadir la categoria 1.");
    try{
      sh.addCategory(cat1);  
    }
    catch(error){
        console.log("Error. La categoria ya existe."); 
    }
    console.log("Mostramos las categorias del StoreHouse: ");
    
    var categories = sh.categories;
    var category = categories.next();
    while (category.done !== true){
		console.log ("Categoria: " + category.value.title);
		category = categories.next();
    }
    console.log("Borramos la categoria 1. Número de categorias: "+sh.removeCategory(cat1));
    console.log("Intentamos volver a borrar la categoria 1.");
    try{
      sh.removeCategory(cat1);  
    }
    catch(error){
        console.log("Error. La categoria no existe."); 
    }
    console.log("Añadimos un producto Camiseta a la categoria Ropa. Numero de productos en esa categoria: "+sh.addProduct(pro1, cat1));
    console.log("Añadimos un producto book a la categoria Ropa. Numero de productos en esa categoria: "+sh.addProduct(book, cat1));

    console.log("Intentamos añadir el mismo producto a la misma categoria");
    try{
      sh.addProduct(pro1, cat1); 
    }
    catch(error){
      console.log(error.message);
    }
    console.log("Añadimos otro producto a la categoria Ropa. Numero de productos en esa categoria: "+sh.addProduct(pro3, cat1));
    console.log("Eliminamos el producto anterior. Numero de productos: "+sh.removeProduct(pro3));
    console.log("Intentamos eliminar el mismo producto");
    try{
      sh.removeProduct(pro3);
    }
    catch(error){
      console.log(error.message);
    }
    console.log("Todos los productos de la categoria ropa: ")
    var aux1 = sh.getCategoryProducts(cat1);
    var aux2 = aux1.next();
    
    while (aux2.done !== true){
		console.log ("Product: "+aux2.value+" Stock: " + aux2.value.stock);
		aux2 = aux1.next();
    }

    console.log("Todos los productos de la categoria ropa que sean Book: ")
    aux1 = sh.getCategoryProducts(cat1, Book);
    aux2 = aux1.next();
    
    while (aux2.done !== true){
		console.log ("Product: "+aux2.value+" Stock: " + aux2.value.stock);
		aux2 = aux1.next();
    }
    console.log("");
    console.log("");
    
}

function testStoreHouseShops(){
    console.log("----Test de métodos relacionados con el objeto shop----");
    console.log("Añadimos dos tiendas. Hay que tener en cuenta la tienda por defecto.");
    console.log("Añadiendo: "+shop2.toString()+" Número de tiendas: "+sh.addShop(shop2));
    console.log("Intentamos volver a añadir la tienda 1.");
    try{
      sh.addShop(shop1);  
    }
    catch(error){
        console.log(error.message);
    }
    console.log("Mostramos las tiendas del StoreHouse: ");
    var shops = sh.shops;
    var shop = shops.next();
    while (shop.done !== true){
		console.log ("Shop: " + shop.value.name);
		shop = shops.next();
    }
    console.log("Borramos la tienda 1. Número de tiendas: "+sh.removeShop(shop1));
    console.log("Intentamos volver a borrar la tienda 1.");
    try{
      sh.removeShop(shop1);  
    }
    catch(error){
        console.log(error.message); 
    }
    console.log("Añadimos un producto a la tienda 2(stock 9). Número de productos en la tienda: "+sh.addProductInShop(pro1, shop2, 9));
    console.log("Añadimos un producto a la tienda 2(stock 4). Número de productos en la tienda:: "+sh.addProductInShop(book, shop2, 4));
    console.log("Añadimos un producto a la tienda 2(stock 3). Número de productos en la tienda:: "+sh.addProductInShop(tv, shop2, 3));
    //console.log("Añadimos 10 de stock al producto 3 de la tienda 2. Stock total: "+sh.addQuantityProductInShop(pro3, shop2, 10));
    
    console.log("Todos los productos de la tienda 2: ")
    var shoppp = sh.getShopProducts(shop2);
    var sho = shoppp.next();
    
    while (sho.done !== true){
		console.log ("Product: "+sho.value.product+" Stock: " + sho.value.stock);
		sho = shoppp.next();
    }
    
}

var cat1 = new Category("Ropa");
cat1.description = "Todo tipo de ropa";
var cat2 = new Category("Tecnología");
cat2.description = "Todo tipo de aparato electrónico";
var cat2 = new Category("Musica");
cat2.description = "Todo lo relacionado con musica";
var pro1 = new Product(1111, "Camiseta", 19.99);; 
var pro2 = new Product(2222, "Portatil", 321.99);
var pro3 = new Product(3333, "Zapatos", 27.99);; 
var coor1 = new Coords(14, 68);
var shop1 = new Shop(1234, "shirtShop", coor1);
var shop2 = new Shop(4321, "tecnoShop", coor1);
var sh = new StoreHouse();
var book = new Book(4444, "ESDLA", 20, 576);
var tv = new TV(5555, "TV1", 1450, 48);

console.log("Comprobacion objeto StoreHouse");
console.log("Cambiamos su atributo name por Test");
sh.name = "Test";
console.log("StoreHouse Name: "+sh.name);
console.log("");
console.log("");
testStoreHouseCategory();
testStoreHouseShops();
