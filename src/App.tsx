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
    ancwer = sum(nums);
  console.log(ancwer);

  //4.引数がオブジェクトのプロパティを参照する関数を作成

  const UserInfo = (user: { name: string; age: number }) => {
    console.log(user.name, +user.age);
  };

  const user = {
    name: "田中太郎",
    age: 30,
  };

  UserInfo(user);

  //5.配列の中で最大値を返す関数を作成

  const getMax = (array: number[]) => {
    return Math.max(...array);
  };

  console.log(getMax([2, 3, 56, 67, 88, 120]));

  //6.オブジェクトの配列から指定されたプロパティの値を抽出する関数を作成

  const fruit = (
    fruits: { price: number }[] | { name: string; price: number }[]
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

  //  8.配列を指定された数値で分割する関数を作成する

  const splitArray = (array: number[], size: number): number[][] => {
    const result: number[][] = [];
    for (let i = 0; i < array.length; i += size) {
      const slice = array.slice(i, i + size);
      result.push(slice);
    }
    return result;
  };
  const array = [1, 2, 3, 4, 5, 6, 7, 8];
  const size = 3;
  const result = splitArray(array, size);
  console.log(result); // [[1, 2, 3], [4, 5, 6], [7, 8]]

  return <div></div>;
}

export default App;
