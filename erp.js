"use strict";

function BaseException() {
}
BaseException.prototype = new Error();
BaseException.prototype.constructor = BaseException
BaseException.prototype.toString = function(){
	return this.name + ": " + this.message;
};

//Excepción general.
function StoreHouseException() {
	this.name = "StoreHouseException";
	this.message = "Error. StoreHouse Generic Exception.";
}
StoreHouseException.prototype = new BaseException();
StoreHouseException.prototype.constructor = StoreHouseException;

//Excepción que se lanza cuando un parámetro no es un objeto Storehouse.
function ObjectStoreHouseException() {
	this.name = "ObjectStoreHouseException";
	this.message = "Error. The method needs a object Storehouse.";
}
ObjectStoreHouseException.prototype = new BaseException();
ObjectStoreHouseException.prototype.constructor = ObjectStoreHouseException;

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


//Excepción que se lanza cuando un objeto category ya existe.
function ParameterValidationException() {
	this.name = "ParameterValidationException";
	this.message = "Error. Parameter Validation Exception.";
}
ParameterValidationException.prototype = new BaseException();
ParameterValidationException.prototype.constructor = ParameterValidationException;

//Excepción que se lanza cuando un parámetro no es un objeto Product.
function ProductStoreHouseException() {
	this.name = "ProductStoreHouseException";
	this.message = "Error. The method needs a object Product.";
}
ProductStoreHouseException.prototype = new BaseException();
ProductStoreHouseException.prototype.constructor = ProductStoreHouseException;

function ProductCategoryExistsException(product) {
	this.name = "ProductCategoryExistsException";
	this.message = "Error. "+product+" already exist in the category.";
}
ProductCategoryExistsException.prototype = new BaseException();
ProductCategoryExistsException.prototype.constructor = ProductCategoryExistsException;

function ShopStoreHouseException() {
	this.name = "ShopStoreHouseException";
	this.message = "Error. The method needs a object Product.";
}
ShopStoreHouseException.prototype = new BaseException();
ShopStoreHouseException.prototype.constructor = ShopStoreHouseException;

function EmptyValueException(param) {
	this.name = "EmptyValueException";
	this.message = "Error: The parameter " + param + " can't be empty.";
}
EmptyValueException.prototype = new ParameterValidationException(); 
EmptyValueException.prototype.constructor = EmptyValueException;

function InvalidAccessConstructorException() {
	this.name = "InvalidAccessConstructorException";
	this.message = "Constructor can’t be called as a function.";
}
InvalidAccessConstructorException.prototype = new BaseException(); 
InvalidAccessConstructorException.prototype.constructor = InvalidAccessConstructorException;



function StoreHouse(){

	if (!(this instanceof StoreHouse)) 
		throw new InvalidAccessConstructorException();

	//Definición de atributos privados del objeto
	var name = "";
	var products = [];
    var categories = [];
    var shops = [];
    var stock = [];
    
    //Definición de los metodos 'get' y 'set' del atributo name
    Object.defineProperty(this, 'name', {
			get:function(){
				return name;
			},
			set:function(value){
				value = value.trim();
				if (value === 'undefined' || value === 'Anon') throw new EmptyValueException("name");					
				name = value;
			}		
		});
	
    //Definición del metodo 'get' del atributo categories. Devuelve iterador
    Object.defineProperty(this, 'getCategories', {
		get:function(){
            var nextIndex = 0;
            return {
                next: function(){
                    return nextIndex < categories.length ? {value: categories[nextIndex++], done: false} : {done: true};
                }
            }
		}	
	});
    
    //Definición del metodo 'get' del atributo sjops. Devuelve iterador
    Object.defineProperty(this, 'getShops', {
		get:function(){
            var nextIndex = 0;
            return {
                next: function(){
                    return nextIndex < shops.length ? {value: shops[nextIndex++], done: false} : {done: true};
                }
            }
		}	
	});
    
    
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
        
        return categories.length();
	}
    
    this.removeCategory = function(category){
		if (!(category instanceof Category)) { 
			throw new CategoryStoreHouseException();
		}
        
		var indexCategory = getCategoryIndex(category);   
        if (indexCategory !== -1){
            categories.splice(indexCategory, 1);
        }else{
            throw new CategoryNoExistsException();
        }
        
        return categories.length();
	}
    
    function getCategoryIndex(category){
        if (!(category instanceof Category)) { 
            throw new CategoryStoreHouseException();
        }		

        function compareElements(element) {
            return (element.title === category.title)
        }
				
        return category.findIndex(compareElements);		
	}
    
    function getProductIndex(product){
        if (!(product instanceof Product)) { 
            throw new CategoryStoreHouseException();
        }		

        function compareElements(element) {
            return (element.serialNumber === product.serialNumber)
        }
				
        return products.findIndex(compareElements);		
	}
    
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
        
        var productCategoryPos = getCategoryProducts(product, categories[categoryPosition]);
		if (productCategoryPos === -1){
			categories[categoryPosition].products.push(product);
		}else{
            throw new ProductCategoryExistsException(product);
		}	
        return categories[categoryPosition].products.length;
	}
    
    function getCategoryProducts(product, category){
				if (!(category instanceof Category)) { 
					throw new CategoryNoExistsException();
				}		

				var categoryPosition = getCategoryIndex(category); 	
				if (categoryPosition === -1) throw new CategoryNoExistsException();
        
				var nextIndex = 0;
                return {
                    next: function(){
                        return nextIndex < categories[categoryPosition].products.length ?
                        {value:  categories[categoryPosition].products[nextIndex++], done: false} : {done: true};
                    }
                }
	}
    
    /*this.removeProduct = function(product){
				if (!(product instanceof Product)) { 
					throw new ImageImageManagerException();
				}				

				var i = categories.length - 1, position = -1;
				while (i >= 0 && position === -1){					
					position = getCategoryProducts(product, categories[i].products); 
					i--;
				}		

				if (position !== -1){
					categories[i+1].products.splice(position, 1);
				} else {
					throw new ImageNotExistsImageManagerException();
				}
			}*/
    this.addProductInShop = function(product, shop, num){
				if (!(product instanceof Product)) { 
					throw new ProductStoreHouseException();
				}	

				if (!(shop instanceof Shop)) { 
					throw new ShopStoreHouseException();
				}		
				if (shop === null || shop === 'undefined' || shop === ''){
					shop = this.defaultShop;
				}	

				//Obtenemos posición de la categoría. Si no existe se añade.
				var productPosition = getProductIndex(product); 
				if (productPosition === -1){
					products.push(product);
				}	

				//Obtenemos posición del autor. Si no existe se añade.
				var shopPosition = getShopPosition(shop); 
				if (shopPosition === -1){
					shopPosition = this.addShop(shop)-1;
				}

				//Obtenemos posición de la imagen en la categoría. Si no existe se añade. Si existe se lanza excepción.
				var productShopPosition = getShopProductPosition(product, shops[shopPosition].products); 	
				if (productShopPosition === -1){
					shops[shopPosition].products.push(
						{
							stock: num
						}
					);
				}else{
					throw new ImageExistsImageManagerException(category);
				}	

				return shops[shopPosition].products.length;
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
					//throw new 
				}	

				var shopPosition = getShopPosition(shop); 
				if (shopPosition === -1){
					//throw new 
				}

				//Obtenemos posición de la imagen en la categoría. Si no existe se añade. Si existe se lanza excepción.
				var productShopPosition = getShopProductPosition(product, shops[shopPosition].products); 	
				if (productShopPosition !== -1){
					shops[shopPosition].products[productShopPosition].stock += num;
				}else{
					throw new ImageExistsImageManagerException(category);
				}	

				return shops[shopPosition].products.length;
			}
                    
    this.addShop = function(shop){
		if (!(shop instanceof Shop)){ 
			throw new ShopStoreHouseException();
		}
        
        if (shop == null){ 
			throw new EmptyValueException(category);
		}
        
		var indexShop = getShopIndex(shop);
        if (indexShop === -1){
            shops.push(shop);
        }else{
            throw new ShopExistsException();
        }
        
        return shops.length();
	}
    
    this.removeShop = function(shop){
		if (!(shop instanceof Shop)) { 
			throw new ShopStoreHouseException();
		}
        
		var indexShop = getShopIndex(category);   
        if (indexShop !== -1){
            shops.splice(indexShop, 1);
        }else{
            throw new ShopNoExistsException();
        }
        
        return shops.length();
	}                
    
    
}


function Category(){

	if (!(this instanceof Category)) 
		throw new InvalidAccessConstructorException();

	var title = "";
	var description = "";
    var products = [];
}

function Product(){

	if (!(this instanceof Product)) 
		throw new InvalidAccessConstructorException();

	var serialNumber = "";
    var name = "";
	var description = "";
    var price = "";
    var tax = "";
    var images = [];
    var categories = [];
}

function Coords(){

	if (!(this instanceof Coords)) 
		throw new InvalidAccessConstructorException();

	var latitude = "";
	var longitude = "";
}

function Shop(){

	if (!(this instanceof Coords)) 
		throw new InvalidAccessConstructorException();

	var cif = "";
	var name = "";
    var direction = "";
    var phone = "";
    var coords = "";
}