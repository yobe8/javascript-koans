var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]); // Pizza Primavera
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      productsICanEat = _(products).filter( function(a) { //아 왜 자꾸 push를 쓰려고 해서 ㅋㅋㅋㅋ 아놔.
        if(_(a.ingredients).all( function (b) { return b !== "mushrooms"})) {
          return a.containsNuts === false;
        }
      });

      /* solve using filter() & all() / any() */

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.reduce(_.range(3,1000,3),function(a,b){return a+b;})+_.reduce(_.range(5,1000,5),function(a,b){return a+b;})-_.reduce(_.range(15,1000,15),function(a,b){return a+b;})
		// 3과 5의 배수의 중복을 제거하면 됐군.
    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 }; // Q. 그런데 왜 여기에 key 값을 {}로 감싼걸까?

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        } 
    }
    /*
    ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
    왼쪽 항은 객체의 key를 생성시키고 오른쪽 항은 value를 생성시킨다. 
    오른쪽 항에 ||이 들어간 이유는 최초의 카운팅을 할 때는 반환할 숫자 값이 없기 때문이고, 이후에는 주어진 숫자에 +1을 할 수 있다.
    그냥 +1이라고 하면 양수를 표시하는 것이기 때문에 카운팅이 되지 않는다.
    ingredientCount를 객체로 생성해두면 객체 형태를 유지하면서 카운팅이 되고, 만약 배열로 생성했다면 배열로 카운팅이 된다.
    */

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    
    ingredientCount[_(products).chain()
    .map(function(obj) { return obj.ingredients; })
    .flatten()
    .reduce(function(name1,name2) { return name1 === name2 ? name1 : name2 }, 0)
    .value()]
    =
    ingredientCount[_(products).chain()
    .map(function(obj) { return obj.ingredients; })
    .flatten()
    .reduce(function(name1,name2) { return name1 === name2 ? name1 : name2 }, 0)
    .value()]

    console.log(ingredientCount);


    expect(ingredientCount['mushrooms']).toBe(FILL_ME_IN);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  /*
  it("should find the largest prime factor of a composite number", function () {

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {


  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

  });

  it("should find the 10001st prime", function () {

  });
  */
});
