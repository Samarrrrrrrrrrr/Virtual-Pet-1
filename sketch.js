//Create variables here
var dog, database, happyDog, foodS, foodStock
function preload()
{
  //load images here
  Image1 = loadImage("images/dogImg.png")
  Image2 = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  
  dog = createSprite(250, 250)
  dog.addImage(Image1)
  dog.scale = 0.5

  feed=createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
  
  database = firebase.database()

  read()

}

function feedDog(){
  dog.addImage(happyDog)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}

function draw() {  

  background(rgb(49, 139, 87))
  drawSprites();
  //add styles here
  fill("black")
  text(foodS,50,50)
  if(keyWentDown(UP_ARROW)) {
write(foodS)
dog.addImage(Image2)
  }

  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30)
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM", 350,30)
  }
  else{
    text("Last Feed : "+ lastFed + " AM", 250,30)
  }
}

function read() {

//foodstock stores the location of "food" in database. Ref means refrence or location or adress
foodStock=database.ref('Food')
//.on() turns on the listener when there is any change in the value at foodStock. The newly updated value is stored inside data
foodStock.on("value",function(data) {
  //data.val only shows the value of data. Writing only data will show a lot of infomation that is not needed
  foodS = data.val()
console.log(foodS)

} )

}

function write(x) {

  if(x<=0) {
    x=0
  }
  else {
    x = x-1
  }
console.log(x)
database.ref('/').update( {

Food:x

}

)

}