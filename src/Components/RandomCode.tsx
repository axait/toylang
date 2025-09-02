// RandomCode.tsx
import { useDispatch } from "react-redux";
import { setEditorCode } from "../store/appSlice";

const randomCodeExamples: string[] = [
  `p("Hello")`,
  `p("I love coffee!")`,
  `declare cups\ndeclare price\nchange cups to 2\nchange price to cups * 150\np("Total price for " + cups + " cups of coffee is " + price + " PKR")\n`,
  `declare coffee\ninput("What is your favorite coffee? ", coffee)\np("Your favorite coffee is " + coffee)\n`,
  `declare amount\ndeclare discount\ndeclare final\nchange amount to 1000\nchange discount to 200\nchange final to amount - discount\np("After discount: " + final + " PKR")\n`,
  `declare num\ndeclare result\nchange num to 5\nchange result to num * 2\np(num + " x 2 = " + result)\nchange result to num * 3\np(num + " x 3 = " + result)\n`,
];

export function RandomCodeButton({className}: {className?:string}) {
  const dispatch = useDispatch();

  const setRandomCode = () => {
    const randomIndex = Math.floor(Math.random() * randomCodeExamples.length);
    dispatch(setEditorCode(randomCodeExamples[randomIndex]));
  };

  return <button className={className} onClick={setRandomCode}>Random </button>;
}
