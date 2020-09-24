describe("About Arrays", function() {

  //We shall contemplate truth by testing reality, via spec expectations.
  it("should create arrays", function() {
    var emptyArray = [];
    expect(typeof(emptyArray)).toBe('object'); //A mistake? - http://javascript.crockford.com/remedial.html
    expect(emptyArray.length).toBe(0);

    var multiTypeArray = [0, 1, "two", function () { return 3; }, {value1: 4, value2: 5}, [6, 7]];
    expect(multiTypeArray[0]).toBe(0);
    expect(multiTypeArray[2]).toBe('two');
    expect(multiTypeArray[3]()).toBe(3);
    expect(multiTypeArray[4].value1).toBe(4);
    expect(multiTypeArray[4]["value2"]).toBe(5); // 배운 부분. object.key 처럼 배열 내부 객체의 key를 index처럼 활용할 수 있다.
    expect(multiTypeArray[5][0]).toBe(6); // 배운 부분. object.key 처럼 배열 내부의 배열 인덱스로 요소를 반환시킬 수 있다.
  });

  it("should understand array literals", function () {
    var array = [];
    expect(array).toEqual([]);

    array[0] = 1;
    expect(array).toEqual([1]);

    array[1] = 2;
    expect(array).toEqual([1, 2]);

    array.push(3);
    expect(array).toEqual([1,2,3]); //Array.push(property) 는 원본을 변환시킨다. 그리고 length를 반환한다.
  });

  it("should understand array length", function () {
    var fourNumberArray = [1, 2, 3, 4];

    expect(fourNumberArray.length).toBe(4);
    fourNumberArray.push(5, 6);
    expect(fourNumberArray.length).toBe(6);

    var tenEmptyElementArray = new Array(10);
    expect(tenEmptyElementArray.length).toBe(10);

    tenEmptyElementArray.length = 5;
    expect(tenEmptyElementArray.length).toBe(5);
  });

  it("should slice arrays", function () {
    var array = ["peanut", "butter", "and", "jelly"];

    expect(array.slice(0, 1)).toEqual(['peanut']); // 배운 부분. slice(begin [, end])는 시작 index와 end 인덱스(end를 제외한) 까지의 배열을 반환. 원본 불변.
    expect(array.slice(0, 2)).toEqual(['peanut', 'butter']);
    expect(array.slice(2, 2)).toEqual([]);
    expect(array.slice(2, 20)).toEqual(['and', 'jelly']);
    expect(array.slice(3, 0)).toEqual([]);
    expect(array.slice(3, 100)).toEqual(['jelly']);
    expect(array.slice(5, 1)).toEqual([]); // 배운 부분. undefined 가 반환될 줄 알았는데, 배열이 지정돼 있지 않으면 빈 배열을 반환.
  });

  it("should know array references", function () {
    var array = [ "zero", "one", "two", "three", "four", "five" ];

    function passedByReference(refArray) {
        refArray[1] = "changed in function";
    }
    passedByReference(array);
    expect(array[1]).toBe("changed in function"); //배열은 함수를 통한 전달로 변경할 수 있다.

    var assignedArray = array;
    assignedArray[5] = "changed in assignedArray";
    expect(array[5]).toBe("changed in assignedArray"); // 배열 변수와 연동된 다른 변수를 통해 원본 배열에 할당할 수 있다.

    var copyOfArray = array.slice();
    copyOfArray[3] = "changed in copyOfArray";
    expect(array[3]).toBe('three');
  });

  it("should push and pop", function () {
    var array = [1, 2];
    array.push(3);

    expect(array).toEqual([1,2,3]);

    var poppedValue = array.pop();
    expect(poppedValue).toBe(3); // Array.pop()은 요소를 반환한다(배열로X). string이 아닌 number면 number 그대로 반환.
    expect(array).toEqual([1,2]);
  });

  it("should know about shifting arrays", function () {
    var array = [1, 2];

    array.unshift(3); //Array.unshift(arguments)는  배열 앞에 인수를 추가한다. 원본 변환.
    expect(array).toEqual([3,1,2]);

    var shiftedValue = array.shift(); // Array.shift()는 배열 제일 앞의 요소를 제거하며 반환한다.
    expect(shiftedValue).toEqual(3);
    expect(array).toEqual([1,2]);
  });
});

//test