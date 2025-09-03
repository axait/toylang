// RandomCode.tsx
import { useDispatch } from "react-redux";
import { setEditorCode } from "../store/appSlice";
import type { ReactNode } from "react";

const randomCodeExamples: string[] = [
  `p("Hello")`,
  `p("I love coffee!")`,

  `declare cups
input("How many cups of coffee do you want? ", cups)
p("Total price for cups of coffee is ")
p(cups * 200)
`,

  `declare coffee
input("What is your favorite coffee? ", coffee)
p("Your favorite coffee is:")
p(coffee)
`,

  `declare age
input("Enter your age: ", age)
p("You are is: ")
p(age)
`,

  `declare name
input("Enter your name: ", name)
p("Welcome, ")
p(name)
p("!")`,

  `declare name
input("Enter your name: ", name)
declare age
input("Enter your age: ", age)
p("My name is ")
p(name)
p("and I am ")
p(age)
p("years old.")`,

];


export const RandomCodeButton = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  const dispatch = useDispatch();

  const setRandomCode = () => {
    const randomIndex = Math.floor(Math.random() * randomCodeExamples.length);
    dispatch(setEditorCode(randomCodeExamples[randomIndex]));
  };

  return <button className={className} onClick={setRandomCode}>{children}</button>;
}
