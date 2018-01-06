
function Category(title = "Anon"){
    
    if (!(this instanceof Category)) 
		throw new InvalidAccessConstructorException();

	title = title.trim();
	if (title === 'undefined' || title === 'Anon') throw new EmptyValueException("title");					

	var title = title;	
	var description = "";
    var products = [];

	Object.defineProperty(this, 'title', {
		get:function(){
			return title;
		},
		set:function(title = "Anonimous"){
			title = title.trim();
			if (title === 'undefined' || title === 'Anon') throw new EmptyValueException("title");					
			title = title;
		}		
	});		
	
	Object.defineProperty(this, 'description', {
		get:function(){
			return description;
		},
		set:function(value){
			if (value === 'undefined') throw new EmptyValueException("description");	
			description = value;
		}		
	});
    
    Object.defineProperty(this, 'products', {
		get:function(){
			return products;
		}	
	});

}
Category.prototype = {};
Category.prototype.constructor = Category;
Category.prototype.toString = function (){	
	return "Category: " + this.title + " (" + this.description + ")"; 
}

function Product(name, price){
	//La función se invoca con el operador new
	if (!(this instanceof Product)) 
		throw new InvalidAccessConstructorException();

	name = name.trim();
	price = price.trim();

	if (name === 'undefined' || name === '') throw new EmptyValueException("name");	

	if (price === 'undefined' || price === '') throw new EmptyValueException("price");	

    var serialNumber = 1
	var name = name;
    var description = null;
	var price = price;
    var tax = null;
    var images = [];

	Object.defineProperty(this, 'serialNumber', {
		get:function(){
			return serialNumber;
		},
        set:function(value){
			serialNumber = value;
		}
	});		

	Object.defineProperty(this, 'name', {
		get:function(){
			return name;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("name");	
			name = value;
		}		
	});			

	Object.defineProperty(this, 'description', {
		get:function(){
			return description;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("description");	
			description = value;
		}		
	});
    
    Object.defineProperty(this, 'price', {
		get:function(){
			return price;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("price");	
			price = value;
		}		
	});
    
    Object.defineProperty(this, 'tax', {
		get:function(){
			return tax;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("tax");	
			tax = value;
		}		
	});
    
    Object.defineProperty(this, 'images', {
		get:function(){
			return images;
		},		
	});
}
Product.prototype = {};
Product.prototype.constructor = Product;
Product.prototype.toString = function (){	
	return "(SerialNumber: " + this.serialNumber + ") Name: "+this.name+" Price: "+this.price; 
}

function Coords(){

	if (!(this instanceof Coords)) 
		throw new InvalidAccessConstructorException();

	var latitude = "";
	var longitude = "";
}

function Shop(name, coords){

	if (!(this instanceof Shop)) 
		throw new InvalidAccessConstructorException();

	var cif = "";
	var name = name;
    var direction = "";
    var phone = "";
    var coords = coords;
    var products = [];
    
    Object.defineProperty(this, 'cif', {
		get:function(){
			return cif;
		},
	});		

	Object.defineProperty(this, 'name', {
		get:function(){
			return name;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("name");	
			name = value;
		}		
	});			

	Object.defineProperty(this, 'direction', {
		get:function(){
			return direction;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("direction");	
			direction = value;
		}		
	});
    
    Object.defineProperty(this, 'phone', {
		get:function(){
			return phone;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("phone");	
			phone = value;
		}		
	});
    
    Object.defineProperty(this, 'coords', {
		get:function(){
			return tax;
		},
		set:function(value){
			if (!(value instanceof Coords)){ 
			    throw new ShopStoreHouseException();
		    }
            coords = value;
		}		
	});
    
    Object.defineProperty(this, 'products', {
		get:function(){
			return products;
		},		
	});
}