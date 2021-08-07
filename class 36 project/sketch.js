var dog,sadDog,happyDog;
var foods;
var database


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  database= firebase.database()

  foodObj = new Food()

  foodStock = database.ref('food')
  foodStock.on("value",readStock)
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed the Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  
  addFood = createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

}

function draw() {
  background(46,139,87);

  foodObj.display()


  drawSprites();
}

//function to read the stock

function readStock(data){
  foods = data.val()
  foodObj.updateFoodStock(foods)
}

//function to feed the dog

function feedDog(){
    dog.addImage(happyDog)

    var food_stock_val = foodObj.getFoodStock()

    if(food_stock_val <=0){
      foodObj.updateFoodStock(0)
    }
    else{
      foodObj.updateFoodStock(food_stock_val-1)
    }

    database.ref('/').update({
      food: foodObj.getFoodStock()
    })
}

//function to add food in stock

function addFoods(){
  console.log(foods)
  foods+=1

  database.ref('/').update({
    food: foods
  })
}
