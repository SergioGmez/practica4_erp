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

function testStoreHouse(){
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
    
    console.log("Comprobacion objeto StoreHouse");
    console.log("Cambiamos su atributo name por Test");
    sh.name = "Test";
    console.log("StoreHouse Name: "+sh.name);
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
    
    console.log("Intentamos añadir el mismo producto a la misma categoria");
    try{
      sh.addProduct(pro1, cat1); 
    }
    catch(error){
      console.log(error.message);
    }
    console.log("Añadimos otro producto a la categoria Ropa. Numero de productos en esa categoria: "+sh.addProduct(pro3, cat1));
    console.log("Añadimos otro producto a una categoria nueva. Numero de productos en esa categoria: "+sh.addProduct(pro2, cat2));
    console.log("Eliminamos un producto. Numero de productos: "+sh.removeProduct(pro3));
    console.log("Intentamos eliminar el mismo producto");
    try{
      sh.removeProduct(pro3);
    }
    catch(error){
      console.log(error.message);
    }
    console.log("Añadimos un producto a una tienda. "+sh.addProductInShop(pro1, shop1));

    
    
    
}

testStoreHouse();

//testObject();

/*var storehouse = new StoreHouse();
var cat1 = new Category("categoria 1");
var cat2 = new Category("categoria 2");
var pro1 = new Product(111, "aa", "3");
var pro2 = new Product(222, "bb", "5");
var coor1 = new Coords();
var shop1 = new Shop("tienda1", coor1);

console.log(pro1.serialNumber);
console.log(pro2.serialNumber);

pro2.serialNumber = 2;
storehouse.name = "  hola";
console.log(storehouse.name);

console.log(storehouse.addCategory(cat1));
console.log(storehouse.addCategory(cat2));
console.log(storehouse.removeCategory(cat2));

*/