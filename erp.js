"use strict";

//Excepción general.
function StoreHouseException() {
	this.name = "StoreHouseException";
	this.message = "Error. StoreHouse Generic Exception.";
}
StoreHouseException.prototype = new BaseException();
StoreHouseException.prototype.constructor = StoreHouseException;

//----> Excepciones del objeto Category

//Excepción que se lanza cuando un parámetro no es un objeto Category.
function CategoryStoreHouseException() {
	this.name = "CategoryStoreHouseException";
	this.message = "Error. The method needs a object Category.";
}
CategoryStoreHouseException.prototype = new BaseException();
CategoryStoreHouseException.prototype.constructor = CategoryStoreHouseException;

//Excepción que se lanza cuando un objeto category ya existe.
function CategoryExistsException() {
	this.name = "CategoryExistsException";
	this.message = "Error. The category already exist.";
}
CategoryExistsException.prototype = new BaseException();
CategoryExistsException.prototype.constructor = CategoryExistsException;

//Excepción que se lanza cuando un objeto category no existe.
function CategoryNoExistsException() {
	this.name = "CategoryNoExistsException";
	this.message = "Error. The category not exist.";
}
CategoryNoExistsException.prototype = new BaseException();
CategoryNoExistsException.prototype.constructor = CategoryNoExistsException;


//-----> Excepciones del objeto Producto

//Excepción que se lanza cuando un parámetro no es un objeto Product.
function ProductStoreHouseException() {
	this.name = "ProductStoreHouseException";
	this.message = "Error. The method needs a object Product.";
}
ProductStoreHouseException.prototype = new BaseException();
ProductStoreHouseException.prototype.constructor = ProductStoreHouseException;

//Excepción que se lanza cuando un objeto product ya existe.
function ProductExistsException(product) {
	this.name = "ProductExistsException";
	this.message = "Error. "+product+" already exist.";
}
ProductExistsException.prototype = new BaseException();
ProductExistsException.prototype.constructor = ProductExistsException;

//Excepción que se lanza cuando un objeto product no existe.
function ProductNotExistsException(product) {
	this.name = "ProductNotExistsException";
	this.message = "Error. "+product+" not exist.";
}
ProductNotExistsException.prototype = new BaseException();
ProductNotExistsException.prototype.constructor = ProductNotExistsException;

//-----> Excepciones del objeto Coords

function CoordsStoreHouseException() {
	this.name = "CoordsStoreHouseException";
	this.message = "Error. The method needs a object Coords.";
}
CoordsStoreHouseException.prototype = new BaseException();
CoordsStoreHouseException.prototype.constructor = CoordsStoreHouseException;


//-----> Excepciones del objeto Shop

function ShopStoreHouseException() {
	this.name = "ShopStoreHouseException";
	this.message = "Error. The method needs a object Shop.";
}
ShopStoreHouseException.prototype = new BaseException();
ShopStoreHouseException.prototype.constructor = ShopStoreHouseException;

//Excepción que se lanza cuando un objeto product no existe.
function ShopNotExistsException(product) {
	this.name = "ShopNotExistsException";
	this.message = "Error. "+product+" not exist.";
}
ProductNotExistsException.prototype = new BaseException();
ProductNotExistsException.prototype.constructor = ProductNotExistsException;


function StoreHouse(){

	if (!(this instanceof StoreHouse)) 
		throw new InvalidAccessConstructorException();

	//Definición de atributos privados del objeto.
	var name = null;
	var products = [];
    var categories = [];
    var shops = [];
    
    //Definición de los metodos 'get' y 'set' del atributo name.
    Object.defineProperty(this, 'name', {
			get:function(){
				return name;
			},
			set:function(value){
				value = value.trim();
				if (value === "" && value === undefined ) throw new EmptyValueException("name");		
				name = value;
			}		
		});
	
    //Definición del metodo 'get' del atributo categories. Devuelve iterador.
    Object.defineProperty(this, 'categories', {
		get:function(){
            var nextIndex = 0;
            return {
                next: function(){
                    return nextIndex < categories.length ? {value: categories[nextIndex++], done: false} : {done: true};
                }
            }
		}	
	});
    
    
    //Definición del metodo 'get' del atributo shops. Devuelve iterador.
    Object.defineProperty(this, 'shops', {
		get:function(){
            var nextIndex = 0;
            return {
                next: function(){
                    return nextIndex < shops.length ? {value: shops[nextIndex++], done: false} : {done: true};
                }
            }
		}	
	});
    
    //Método que permite añadir una categoria. Devuelve el número de categorias.
    this.addCategory = function(category){
		if (!(category instanceof Category)){ 
			throw new CategoryStoreHouseException();
		}
        
        if (category == null){ 
			throw new EmptyValueException(category);
		}
        
		var indexCategory = getCategoryIndex(category);
        if (indexCategory === -1){
            categories.push(category);
        }else{
            throw new CategoryExistsException();
        }
        
        return categories.length;
	}
    
    //Método que permite eliminar una categoria. Devuelve el número de categorias.
    this.removeCategory = function(category){
		if (!(category instanceof Category)) { 
			throw new CategoryStoreHouseException();
		}
        
		var indexCategory = getCategoryIndex(category);   
        if (indexCategory !== -1){
            var i = 0;
            
            while ( i < categories[indexCategory].length){
                this.addProduct(categories[indexCategory].products[i], this.defaultCategory);
            }
            categories.splice(indexCategory, 1);
        }else{
            throw new CategoryNoExistsException();
        }
        
        return categories.length;
	}
    
    //Devuelve la posición de una categoria dada.
    function getCategoryIndex(category){
        if (!(category instanceof Category)) { 
            throw new CategoryStoreHouseException();
        }		

        function compareElements(element){
            return (element.title === category.title)
        }
				
        return categories.findIndex(compareElements);		
	}
    
    //Categoría por defecto.
	var defaultCategory = new Category ("Anonymous");
	this.addCategory(defaultCategory);
    
    //Metodo que permite añadir un producto con una categoria. Devuelve el numero de productos de dicha categoria.
    this.addProduct = function(product, category){
		if (!(product instanceof Product)) { 
			throw new ProductStoreHouseException();
		}	
		if (product === null){
			throw new EmptyValueException(product);
		}	
		if (!(category instanceof Category)) { 
			throw new CategoryStoreHouseException();
		}		


		var productPosition = getProductIndex(product);
        if (productPosition === -1){
			products.push(product);
		}
        
        var categoryPosition = getCategoryIndex(category);
		if (categoryPosition === -1){
            categoryPosition = this.addCategory(category)-1;
		}	
        
        var productCategoryPos = getCategoryProducts(product, categories[categoryPosition].products);
        
		if (productCategoryPos === -1){
			categories[categoryPosition].products.push(product);
            shops[0].products.push(product);
		}else{
            throw new ProductExistsException(product);
		}	
        return categories[categoryPosition].products.length;
	}
    
    //Método que borra un producto. Devuelve el numero de productos de dicha categoria.
    this.removeProduct = function(product){
		if (!(product instanceof Product)) { 
			throw new ProductStoreHouseException();
		}
        
        var productPosition = getProductIndex(product);

		var i = categories.length - 1, categoryPosition = -1;
		while (i >= 0 && categoryPosition === -1){					
			categoryPosition = getCategoryProducts(product, categories[i].products); 
			i--;
		}
        
        var y = shops.length - 1, shopPosition = -1;
		while (y >= 0 && shopPosition === -1){					
			shopPosition = getShopProducts(product, shops[y].products); 
			y--;
		}

		if (productPosition !== -1){
            products.splice(productPosition, 1);
            
            if (categoryPosition !== -1 ){
                categories[i+1].products.splice(categoryPosition, 1);
            }
			
            if (shopPosition !== -1 ){
                shops[y+1].products.splice(shopPosition, 1);
            }
            
		}else{
			throw new ProductNotExistsException(product);
		}
        return products.length;
	}
    
    //Metodo que devuelve la posición de un producto dado.
    function getProductIndex(product){
        if (!(product instanceof Product)) { 
            throw new ProductStoreHouseException();
        }		

        function compareElements(element) {
            return (element.serialNumber === product.serialNumber)
        }
				
        return products.findIndex(compareElements);		
	}
    
    //Método que devuelve la posición de un producto en una categoria.
    function getCategoryProducts(product, categoryProducts){
		if (!(product instanceof Product)){ 
			throw new ProductStoreHouseException();
		}
        
		function compareElements(element){
			return (element.serialNumber === product.serialNumber)
		}
		
		return categoryProducts.findIndex(compareElements);	
	}
     
    
    this.addProductInShop = function(product, shop, num){
        if (!(product instanceof Product)) { 
			throw new ProductStoreHouseException();
		}	

		if (!(shop instanceof Shop)) { 
			throw new ShopStoreHouseException();
		}		
		
		var productPosition = getProductIndex(product); 
		if (productPosition === -1){
			products.push(product);
		}	

		var shopPosition = getShopIndex(shop);
		if (shopPosition === -1){
			shopPosition = this.addShop(shop)-1;
		}

		var productShopPosition = getShopProducts(product, shops[shopPosition].products); 	
		if (productShopPosition === -1){
            product.stock = num;
			shops[shopPosition].products.push(
                {
                 product: product,
                 serialNumber: product.serialNumber,
                 stock: num    
                }
            );
            categories[0].products.push(product);
		}else{
			throw new ProductExistsException(product);
		}	

		return shops[shopPosition].products.length;
    }                              
    
   function getShopProducts(product, shopProducts){
		if (!(product instanceof Product)){ 
			throw new ShopStoreHouseException();
		}

		function compareElements(element){
			return (element.serialNumber === product.serialNumber)
		}
       
		return shopProducts.findIndex(compareElements);	
	}
    
   this.addQuantityProductInShop = function(product, shop, num){
		if (!(product instanceof Product)) { 
			throw new ProductStoreHouseException();
		}	

		if (!(shop instanceof Shop)) { 
			throw new ShopStoreHouseException();
		}		

		var productPosition = getProductIndex(product); 
		if (productPosition === -1){
			throw new ProductNotExistsException(product);
		}	
        
		var shopPosition = getShopIndex(shop); 
		if (shopPosition === -1){
			throw new ShopNotExistsException(product);
		}
       
        if (num < 0 ) throw new InvalidValueException("num", num);

		
		var productShopPosition = getShopProducts(product, shops[shopPosition].products);

		if (productShopPosition !== -1){
			shops[shopPosition].products[productShopPosition].stock += num;
		}else{
			throw new ProductNotExistsException(product);
		}	

        return shops[shopPosition].products[productShopPosition].stock;
	}
   
   this.getCategoryProducts = function(category, product ){
		if (!(category instanceof Category)) { 
			throw new CategoryStoreHouseException ();
		}
       
        if (!(product instanceof Product)) {
            throw new ProductStoreHouseException ();
		}	
       
		var categoryPosition = getCategoryIndex(category);  	
		if (categoryPosition === -1) throw new CategoryNoExistsException();
        var nextIndex = 0;

		return {
            next: function(){
                var product = null;
         
                while (nextIndex < categories[categoryPosition].products.length && product === null){ 
                    
                    if (product.serialNumber === categories[categoryPosition].products[nextIndex].serialNumber ){
                        product = categories[categoryPosition].products[nextIndex];
                    }
                    nextIndex++;
                }
                if (product !== null){
                    return {value: product, done: false}
                }
                if (categoryPosition >= categories.length) return {done: true};
            }
		}
	}
                    
    this.addShop = function(shop){
		if (!(shop instanceof Shop)){ 
			throw new ShopStoreHouseException();
		}
        
        if (shop == null){ 
			throw new EmptyValueException(shop);
		}
        
		var indexShop = getShopIndex(shop);
        if (indexShop === -1){
            shops.push(shop);
        }else{
            throw new ShopExistsException();
        }
        
        return shops.length;
	}
    
    this.removeShop = function(shop){
		if (!(shop instanceof Shop)) { 
			throw new ShopStoreHouseException();
		}
        
		var indexShop = getShopIndex(shop); 
          
        if (indexShop !== -1){
            var i = 0;
            
            while ( i < shops[indexShop].length){
                this.addProductInShop(shops[indexShop].products[i], this.defaultShop, shops[indexShop].products[i].stock );
            }
            shops.splice(indexShop, 1);
        }else{
            throw new CategoryNoExistsException();
        }
        return shops.length();
	}
    
    this.getShopProducts = function(shop, product ){
		if (!(shop instanceof Shop)) { 
			throw new ShopStoreHouseException ();
		}
       
        if (!(product instanceof Product)) {
            throw new ProductStoreHouseException ();
		}	
       
		var shopPosition = getShopIndex(shop);  	
		if (shopPosition === -1) throw new ShopNotExistsException();
        
        var nextIndex = 0;

		return {
            next: function(){
                var product = null;
         
                while (nextIndex < shops[shopPosition].products.length && product === null){ 
                    
                    if (product.serialNumber === shops[shopPosition].products[nextIndex].serialNumber ){
                        product = shops[shopPosition].products[nextIndex];
                    }
                    nextIndex++;
                }
                if (product !== null){
                    return {value: product, done: false}
                }
                if (shopPosition >= shops.length) return {done: true};
            }
		}
	}
    
    function getShopIndex(shop){
        if (!(shop instanceof Shop)) { 
            throw new ShopStoreHouseException();
        }		

        function compareElements(element) {
            return (element.cif === shop.cif)
        }
				
        return shops.findIndex(compareElements);		
	}
    
    //Tienda por defecto.
    var coord = new Coords(14, 68);
	var defaultShop = new Shop("0123", "General", coord);
	this.addShop(defaultShop);
 
}