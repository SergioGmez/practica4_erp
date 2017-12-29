
function BaseException() {
}
BaseException.prototype = new Error();
BaseException.prototype.constructor = BaseException
BaseException.prototype.toString = function(){
	return this.name + ": " + this.message;
};

function StoreHouseException() {
	this.name = "StoreHouseException";
	this.message = "Error. StoreHouse Exception.";
}
StoreHouseException.prototype = new BaseException();
StoreHouseException.prototype.constructor = StoreHouseException;

function ObjectStoreHouseException() {
	this.name = "ObjectStoreHouseException";
	this.message = "Error. The method needs a object Storehouse.";
}
ObjectStoreHouseException.prototype = new BaseException();
ObjectStoreHouseException.prototype.constructor = ObjectStoreHouseException;

function CategoryStoreHouseException() {
	this.name = "CategoryStoreHouseException";
	this.message = "Error. The method needs a object Category.";
}
CategoryStoreHouseException.prototype = new BaseException();
CategoryStoreHouseException.prototype.constructor = CategoryStoreHouseException;


function CategoryExistsException() {
	this.name = "CategoryExistsException";
	this.message = "Error. The category already exist.";
}
CategoryExistsException.prototype = new BaseException();
CategoryExistsException.prototype.constructor = CategoryExistsException;

function CategoryNoExistsException() {
	this.name = "CategoryNoExistsException";
	this.message = "Error. The category not exist.";
}
CategoryNoExistsException.prototype = new BaseException();
CategoryNoExistsException.prototype.constructor = CategoryNoExistsException;



function ParameterValidationException() {
	this.name = "ParameterValidationException";
	this.message = "Error. Parameter Validation Exception.";
}
ParameterValidationException.prototype = new BaseException();
ParameterValidationException.prototype.constructor = ParameterValidationException;

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
	//La función se invoca con el operador new
	if (!(this instanceof StoreHouse)) 
		throw new InvalidAccessConstructorException();

	//Definición de atributos privados del objeto
	var name = "";
	var products = [];
    var categories = [];
    var shops = [];
    var stock = [];
    
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
		if (!(category instanceof Category)) { 
			throw new CategoryStoreHouseException ();
		}
        
        if (category == null){ 
			throw new EmptyValueException(category);
		}
        
		var index = getCategoryIndex(category);
        
        if (index === -1){
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
        
		var index = getCategoryIndex(category);
        
        if (index !== -1){
            categories.splice(index, 1);
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
            return (element.name === category.name)
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
			throw new ImageImageManagerException();
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
            throw new ImageExistsImageManagerException(category);
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