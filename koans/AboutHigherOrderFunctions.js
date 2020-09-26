var _; //globals

/* This section uses a functional extension known as Underscore.js - http://documentcloud.github.com/underscore/
     "Underscore is a utility-belt library for JavaScript that provides a lot of the functional programming support
      that you would expect in Prototype.js (or Ruby), but without extending any of the built-in JavaScript objects.
      It's the tie to go along with jQuery's tux."
 */
describe("About Higher Order Functions", function () {

  it("should use filter to return array items that meet a criteria", function () {
    var numbers = [1,2,3];
    var odd = _(numbers).filter(function (x) { return x % 2 !== 0 });

    expect(odd).toEqual([1,3]); //_.filter()는 filter() 안의 함수를 이용해 true인 값을 반환해 배열로 만든다.
    expect(odd.length).toBe(2); // https://medium.com/@cheonmyung0217/underscore-js-filter-%ED%95%A8%EC%88%98-51feea16b3b8 참조.
    expect(numbers.length).toBe(3); //원본은 손상시키지 않는다.
  });

  it("should use 'map' to transform each element", function () {
    var numbers = [1, 2, 3];
    var numbersPlus1 = _(numbers).map(function(x) { return x + 1 });

    expect(numbersPlus1).toEqual([2,3,4]); // _.map()은 ()안에 입력한 함수식을 그대로 반환해 배열로 만든다. 
    expect(numbers).toEqual([1,2,3]); //_.map()은 원본을 손상시키지 않는다.
  });

  it("should use 'reduce' to update the same result on each iteration", function () {
    var numbers = [1, 2, 3];
    var reduction = _(numbers).reduce(
            function(/* result from last call */ memo, /* current */ x) { return memo + x }, /* initial */ 0); 

    expect(reduction).toBe(6); //https://medium.com/@cheonmyung0217/underscore-js-reduce-%ED%95%A8%EC%88%98-79fd6e5a4e31 참조.
    expect(numbers).toEqual([1,2,3]); // _.reduce()는 원본을 손상시키지 않는다.
  });

  it("should use 'forEach' for simple iteration", function () {
    var numbers = [1,2,3];
    var msg = "";
    var isEven = function (item) {
      msg += (item % 2) === 0;
    };

    _(numbers).forEach(isEven);

    expect(msg).toEqual('falsetruefalse'); //_.forEach()는 for문을 실행한 것과 같넹.
    expect(numbers).toEqual([1,2,3]);
  });

  it("should use 'all' to test whether all items pass condition", function () {
    var onlyEven = [2,4,6];
    var mixedBag = [2,4,5,6];

    var isEven = function(x) { return x % 2 === 0 };

    expect(_(onlyEven).all(isEven)).toBe(true); // _.all()은 주어진 값이 테스트 함수에 부합하는지를 확인 후 결과로 boolean값을 반환한다.
    expect(_(mixedBag).all(isEven)).toBe(false); // _.any()랑 비교되는 느낌을 말하자면, _.all()은 && 을 이용한거면 _.any()는 ||을 이용한 것 같다고 할까.
  });

  it("should use 'any' to test if any items passes condition" , function () {
    var onlyEven = [2,4,6];
    var mixedBag = [2,4,5,6];

    var isEven = function(x) { return x % 2 === 0 };

    expect(_(onlyEven).any(isEven)).toBe(true);
    expect(_(mixedBag).any(isEven)).toBe(true); // 각각의 아이템마다의 결과를 반환한다. ||(or)의 개념.
    
  });

  it("should use range to generate an array", function() {
      expect(_.range(3)).toEqual([0,1,2]);
      expect(_.range(1, 4)).toEqual([1,2,3]);
      expect(_.range(0, -4, -1)).toEqual([0,-1,-2,-3]);
      //_.range(a[,b,c])는 배열을 만드는 함수다. a만 지정하면 length가 돼 0부터 배열을 만든다. 
      // a와 b를 지정하면 a를 시작점으로해서 b에 지정한 끝점의 앞까지의 배열을 만든다.
      // c에 수를 넣으면 지정한 길이의 배열 안에서 그 수만큼 index를 뛰어넘어가면서 배열을 생성한다(설명이 어렵네 이건 훔).
  });

  it("should use flatten to make nested arrays easy to work with", function() {
      expect(_([ [1, 2], [3, 4] ]).flatten()).toEqual([1,2,3,4]); //다른 배열 두 개를 합쳐서 하나의 배열로 만든다. 포인트는 각각의 배열을 감싸는 대괄호를 입력해줘야 한다.
  });

  it("should use chain() ... .value() to use multiple higher order functions", function() {
      var result = _([ [0, 1], 2 ]).chain() //_.chain()... .value()를 이용해 멀티 언더스코어 함수를 사용할 수 있다.
                       .flatten() // [0 ,1, 2]
                       .map(function(x) { return x+1 } ) // [1, 2, 3]
                       .reduce(function (sum, x) { return sum + x }) // 1 + 2 -> 3 + 3 = 6
                       .value();

      expect(result).toEqual(6);
  });

});

