
function randInt(minInt, maxInt) {
    let rand = Math.floor(Math.random() * (maxInt - minInt));
    return rand+minInt;
}

function generateLevel1Problem() {
    const num1 = randInt(0, 50); 
    const num2 = randInt(0, 50);
    // Generate a random operator (+, -, *, /)
    const operators = ['+', '-'];
    const operator = operators[randInt(0, operators.length)];

    let problem = '';
    if (operator == '+') {
        // Create the arithmetic problem
        problem = `${num1} ${operator} ${num2}`;
    } else {
        problem = `${Math.max(num1, num2)} ${operator} ${Math.min(num1, num2)}`;
    }

    return problem;
}

function generateLevel2Problem() {
    const num1 = randInt(0, 200);
    const num2 = randInt(0, 200);

    const operators = ['+', '-'];

    const operator = operators[randInt(0, operators.length)];
    
    let problem = '';
    if (operator == '+') {
        problem = `${num1} ${operator} ${num2}`;
    } else {
        problem = `${Math.max(num1, num2)} ${operator} ${Math.min(num1, num2)}`;
    }

    return problem;
}

function generateLevel3Problem() {
    const operators = ['+', '-'];

    const num1 = randInt(0, 100);
    const num2 = randInt(0, 100);

    const operator1 = operators[randInt(0, operators.length)];
    let problem = `${num1} ${operator1} ${num2}`;

    let res = eval(problem);
    
    if (res <= 0) {
        const num3 = randInt(Math.abs(res), 100);
        problem = `${problem} + ${num3}`;
    } else {
        const operator2 = operators[randInt(0, operators.length)];
        if (operator2 == '-') {
            const num3 = randInt(0, res);
            problem = `${problem} - ${num3}`;
        } else {
            const num3 = randInt(0, 100);
            problem = `${problem} + ${num3}`;
        }
    }
    return problem;
}
