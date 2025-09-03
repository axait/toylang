import { toObjectCompiler } from './index.js'


const code = `
declare name
input("Enter your name: ", name)
p("Welcome, ")
p(name)
p("!")
`

console.log(toObjectCompiler(code))

let out = toObjectCompiler(code)

for (const element of out) {
    switch (element.action) {
        case "DeclareVar":
            console.log("make var")
            break;
            
            case "p":
            console.log("do print")
            break;
    
        case "input":
            console.log("let input")
            break;
            
        default:
            console.log("Error:")
            break;
    }
}