// RandomCode.tsx
import { useDispatch } from "react-redux";
import { setEditorCode } from "../store/appSlice";
import type { ReactNode } from "react";

const randomCodeExamples: string[] = [
  `p("Hello")`,
  `p("I love coffee!")`,

  `declare cups
declare price
change cups to 2
change price to cups * 150
p("Total price for " + cups + " cups of coffee is " + price + " PKR")
`,

  `declare coffee
input("What is your favorite coffee? ", coffee)
p("Your favorite coffee is " + coffee)
`,

  `declare amount
declare discount
declare final
change amount to 1000
change discount to 200
change final to amount - discount
p("After discount: " + final + " PKR")
`,

  `declare num
declare result
change num to 5
change result to num * 2
p(num + " x 2 = " + result)
change result to num * 3
p(num + " x 3 = " + result)
`,

  // new examples
  `declare name
input("Enter your name: ", name)
p("Welcome, " + name + "!")
`,

  `declare length
declare width
declare area
change length to 7
change width to 4
change area to length * width
p("Rectangle area is " + area)
`,

  `declare base
declare height
declare area
change base to 10
change height to 5
change area to base * height / 2
p("Triangle area = " + area)
`,

  `declare price
declare quantity
declare total
change price to 250
change quantity to 3
change total to price * quantity
p("Buying " + quantity + " items costs " + total + " PKR")
`,

  `declare num
declare squared
declare cubed
change num to 4
change squared to num * num
change cubed to num * num * num
p("Number: " + num)
p("Square: " + squared)
p("Cube: " + cubed)
`,

  `declare a
declare b
declare temp
change a to 5
change b to 10
p("Before swap: a=" + a + ", b=" + b)
change temp to a
change a to b
change b to temp
p("After swap: a=" + a + ", b=" + b)
`,

  `declare age
input("Enter your age: ", age)
p("You are " + age + " years old")
`,
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
