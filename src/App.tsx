function App() {
  //1.単純な足し算関数を作成する
  const add = (number1: number, number2: number) => {
    return number1 + number2;
  };

  console.log(add(1, 2));

  //2.文字列を連結する関数を作成
  const concat = (num1: string, num2: string) => {
    return num1 + num2;
  };

  console.log(concat("はじく", "ポップコーン"));

  //3.引数が配列の合計値を返す関数を作成
  const sum = (nums: number[]) => {
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
      total += nums[i];
    }
    return total;
  };
  var nums = [0, 1, 2, 3, 4],
    result = sum(nums);
  console.log(result);

  //4.引数がオブジェクトのプロパティを参照する関数を作成

  // const info = {
  //   name: "田中 太郎",
  //   age: 30,
  //   japan: true,
  //   hobby: ["読書", "ウォーキング", "音楽"],
  // };
  // const user = {
  //   name: "田中太郎",
  //   age: 30,
  // };
  // console.log(user.name + "," + user.age);

  const UserInfo = (user: { name: string; age: number }) => {
    console.log(user.name, +user.age);
  };

  const user = {
    name: "田中太郎",
    age: 30,
  };

  UserInfo(user);

  //5.配列の中で最大値を返す関数を作成
  // const array = [2, 3, 56, 67, 88, 120];
  // const max = Math.max(...array);
  // console.log(max);

  const getMax = (array: number[]) => {
    return Math.max(...array);
  };

  console.log(getMax([2, 3, 56, 67, 88, 120]));

  //6.オブジェクトの配列から指定されたプロパティの値を抽出する関数を作成
  // const fruits = [
  //   { name: "apple", price: 200 },
  //   { name: "banana", price: 100 },
  // ];
  // console.log(fruits[1].price);

  const fruit = (
    fruits: { price: any }[] | { name: string; price: number }[]
  ) => {
    return fruits[1].price;
  };

  console.log(
    fruit([
      { name: "apple", price: 200 },
      { name: "banana", price: 100 },
    ])
  );

  //7.オブジェクトの配列を指定されたプロパティでソートする関数を作成
  // const popcorn = [
  //   { name: "caramel", price: 200 },
  //   { name: "solt", price: 150 },
  //   { name: "butter", price: 180 },
  //   { name: "hajiku", price: 3000 },
  // ];
  // popcorn.sort(function (a, b) {
  //   return a.price - b.price;
  // });
  // console.log(JSON.stringify(popcorn));

  const popcorn = () => [
    { name: "caramel", price: 200 },
    { name: "solt", price: 150 },
    { name: "butter", price: 180 },
    { name: "hajiku", price: 3000 },
  ];

  popcorn().sort(function (a: { price: number }, b: { price: number }) {
    return a.price - b.price;
  });
  console.log(JSON.stringify(popcorn()));

  //8.配列を指定された数値で分割する関数を作成する
  const number = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const newNumber = [];

  while (number().length > 0) {
    newNumber.push(number().splice(0, 3));
  }

  console.log(newNumber);

  return <div></div>;
}

export default App;
