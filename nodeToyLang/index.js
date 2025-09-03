/*
? Syntax:
p number OP number

*/

// Pre-define-Functions
function preDefinedFunctions() {
    // return `
    //         function input(question, callback) {
    //             const readline = require('readline').createInterface({
    //                 input: process.stdin,
    //                 output: process.stdout,
    //             });
    //             readline.question(question, (answer) => {
    //                 callback(answer);
    //                 readline.close();
    //             });
    //         }
    // `
    // * Commented above because ToyLang is Only going to run in Browser.
    return ""
}

// Pre-processor
function preProcessor(code) {
    code = code.split("\n")
    let processedCode = ""

    for (const line of code) {
        if (line.trim() === '' || line.includes('/>')) {
            continue
        } else {
            processedCode += `${line}\n`
        }
    }

    return processedCode;

}

// Tokenizer
function Tokenizer(input) {
    let tokens = [];
    let cursor = 0;

    const isAlpha = char => /[a-z]/.test(char);
    const isAlphaUpperLower = char => /[a-zA-Z]/.test(char);
    const isNotInString = char => !/["]/.test(char)
    const isDigit = char => /[0-9]/.test(char);

    while (cursor < input.length) {
        let char = input[cursor];

        if (char === " ") {
            cursor++;
            continue;
        }

        if (char == "\n") {
            tokens.push({
                type: "TERMINATOR",
                value: ";",
            })
            cursor++;
            continue;
        }

        if (isAlpha(char)) {
            let word = "";
            while (/[a-z]/.test(char)) {
                word += char;
                cursor++;
                if (cursor >= input.length) break;
                char = input[cursor];
            }
            if (["declare"].includes(word)) {
                tokens.push({
                    type: "keyword",
                    value: word
                });
            } else if (["p", "input",].includes(word)) {
                tokens.push({
                    type: "FUNCTION",
                    value: word
                });
            } else {
                tokens.push({
                    type: "variable",
                    value: word
                });
            }
        }

        if (isDigit(char)) {
            let num = "";
            while (isDigit(char) || char === '.') {
                num += char;
                cursor++;
                if (cursor >= input.length) break;
                char = input[cursor];
            }
            tokens.push({
                type: "number",
                value: num
            });
            continue;
        }

        if (char === "+" || char === "-" || char === "*" || char === "/" || char === "%") {
            tokens.push({
                type: "operator",
                value: char
            });
            cursor++;
            continue;
        }

        if (char === "(") {
            tokens.push({
                type: "LPARAN",
                value: char
            });
            cursor++;
            continue;
        }

        if (char === ")") {
            tokens.push({
                type: "RPARAN",
                value: char
            });
            cursor++;
            continue;
        }

        if (char === '"') {
            cursor++; // skip the opening "
            let str = "";
            char = input[cursor];

            while (char !== '"' && cursor < input.length) {
                str += char;
                cursor++;
                char = input[cursor];
            }

            cursor++; // skip the closing "
            tokens.push({
                type: "STRING",
                value: str
            });
            // break
            continue;
        }

        cursor++;
        // continue
    }

    return tokens;


}

// Parser
function Parser(tokens) {
    let cursor = 0

    const peek = () => tokens[cursor]
    const consume = () => tokens[cursor++]

    /**
     * Statement parser. 
     * Returns a Statement object or null if statement is invalid.
     * 
     * @returns {Statement | null} Statement object or null
     */
    function statementParser() {
        let token = peek()
        switch (token.type) {
            case "TERMINATOR":
                consume()
                return null;

            case "keyword":
                if (token.value === 'declare') {
                    consume()
                    let varNameToken = consume()
                    return { type: "VariableDeclaration", value: varNameToken.value };
                }
                return null;

            case "FUNCTION":
                if (token.value === 'p') {
                    consume() // consime 'p'
                    let lParan = consume()
                    if (lParan.type !== "LPARAN") throw new Error("Expected '(' after p");

                    const argToken = consume(); // could be STRING or variable
                    let argument;

                    switch (argToken.type) {
                        case "STRING":
                            argument = { type: "StringLiteral", value: `${argToken.value}` };
                            break;
                        case "variable":
                            argument = { type: "Identifier", value: argToken.value };

                            if (peek().type === 'operator') {

                                let opcode = consume().value;
                                let rightOperand = consume()
                                argument = {
                                    type: "BinaryExpression",
                                    value: `${argToken.value}${opcode}${rightOperand.value}`,
                                };
                                break;

                            }
                            break;
                        case "number":
                            argument = { type: "NumberLiteral", value: Number(argToken.value) };

                            if (peek().type === 'operator') {

                                let opcode = consume().value;
                                let rightOperand = consume()
                                argument = {
                                    type: "BinaryExpression",
                                    value: `${argToken.value}${opcode}${rightOperand.value}`,
                                };
                                break;

                            }
                            break;
                        default:
                            throw new Error(`Unexpected Function: ${argToken.type}`);
                    }
                    // checking for expression

                    const rparen = consume();
                    if (rparen.type !== "RPARAN") throw new Error("Expected ')' after p(...)");

                    return {
                        type: "CallExpression",
                        name: 'p',
                        arguments: argument
                    };
                }
                if (token.value === 'input') {
                    consume() // consime 'p'
                    let lParan = consume()
                    if (lParan.type !== "LPARAN") throw new Error("Expected '(' after input");

                    let argument = [];

                    const StringLiteral = consume(); // could be STRING or variable
                    if (StringLiteral.type !== "STRING") throw new Error("Expected string after input");

                    argument.push({ type: "StringLiteral", value: StringLiteral.value })

                    const Identifier = consume(); // could be STRING or variable
                    if (Identifier.type !== "variable") throw new Error("Expected variable after input");

                    argument.push({ type: "Identifier", value: Identifier.value })

                    const rparen = consume();
                    if (rparen.type !== "RPARAN") throw new Error("Expected ')' after input(...)");

                    return {
                        type: "CallExpression",
                        name: 'input',
                        arguments: argument,
                    };
                }
                return null;

            default:
                return null;
        }
    }

    let ast = []
    while (cursor < tokens.length) {
        let stmt = statementParser()
        if (stmt) ast.push(stmt)

    }



    return ast;
}

// Intermediate Code Generator
function IntermediateCodeGenerator(ast) {

    function statementConverter(statement) {

        switch (statement.type) {
            case 'VariableDeclaration':
                // return `\nlet ${statement.value};`;
                return {action:"DeclareVar", value: statement.value};
                
                case 'CallExpression':
                    // console.log("------CallExpression is active-------")
                    if (statement.name === 'p') {
                        // return `\nconsole.log(${statement.arguments.value});`;
                        return {action:"p", value: statement.arguments.value};
                        
                    } else if (statement.name === 'input') {
                        // commented this line bcz toylang is only going to run browser.
                        // return `\ninput("${statement.arguments[0].value}",${statement.arguments[1].value});`;
                        // return `\n${statement.arguments[1].value}=prompt("${statement.arguments[0].value}");`;
                        return {action:"input", display: statement.arguments[0].value , varname:statement.arguments[1].value};

                }

            default:
                // console.log('\n----------Unable---------------')
                // console.log(statement)
                break;

        }

    }


    // console.log('\n\n\n----------CodeGenerator---------------')
    let objInInterCodeHandler = []

    for (const statement of ast) {
        // console.log(statement)
        objInInterCodeHandler.push(statementConverter(statement))
    }

    // console.log(typeof objInInterCodeHandler)
    // console.log(objInInterCodeHandler.length)
    // console.log(objInInterCodeHandler[0].action)
    
    return objInInterCodeHandler

}

// Code Generator
function CodeGenerator(ast) {

    function statementConverter(statement) {

        switch (statement.type) {
            case 'VariableDeclaration':
                return `\nlet ${statement.value};`;

            case 'CallExpression':
                // console.log("------CallExpression is active-------")
                if (statement.name === 'p') {
                    return `\nconsole.log(${statement.arguments.value});`;

                } else if (statement.name === 'input') {
                    // commented this line bcz toylang is only going to run browser.
                    // return `\ninput("${statement.arguments[0].value}",${statement.arguments[1].value});`;
                    return `\n${statement.arguments[1].value}=prompt("${statement.arguments[0].value}");`;

                }

            default:
                // console.log('\n----------Unable---------------')
                // console.log(statement)
                break;

        }

    }


    // console.log('\n\n\n----------CodeGenerator---------------')
    let objInJs = ""

    for (const statement of ast) {
        // console.log(statement)
        objInJs += statementConverter(statement)
    }


    return objInJs

}

// Linker
function Linker(unLinkedCode) {
    let linkedCode = preDefinedFunctions();
    linkedCode += unLinkedCode
    return linkedCode
}

// Runner
function runner(input) {
    eval(input)
}

// Compiler
function toObjectCompiler(input) {
    const processedCode = preProcessor(input)
    const tokens = Tokenizer(processedCode)
    const ast = Parser(tokens)
    const objCode = IntermediateCodeGenerator(ast)
    return objCode
}

// Compiler
function codeCompiler(input) {
    const processedCode = preProcessor(input)
    const tokens = Tokenizer(processedCode)
    const ast = Parser(tokens)
    const objCode = CodeGenerator(ast)
    const linkedCode = Linker(objCode)
    return linkedCode
}



// Test Code here

function testing() {
    

const code = `
declare name
input("Enter your name: ", name)
p("Welcome, ")
p(name)
p("!")
`

// ----REmoveMe--------
// console.log(Tokenizer(code))
// console.log(Parser(Tokenizer(code))[0]['arguments'])
// --------------------
const objCode = toObjectCompiler(code)
console.log("--------------------Output:-------------------------")
// console.log(objCode)
for (const element of objCode) {
    // console.log(element)
    console.log(`${element.action}: ${element.value ? element.value : element.display ? element.display : element.varname ? element.varname : ''}`)
}
console.log("----------------------------------------------------")
// runner(objCode)


}

testing()

export { toObjectCompiler }


