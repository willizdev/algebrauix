const submit = document.getElementById("submit");

const input_1 = document.getElementById("in-1");
const input_2 = document.getElementById("in-2");

const sol_wrap = document.getElementById("sol-wrap");
const solution = document.getElementById("sol");

sol_wrap.addEventListener('click', function(event) {
    if (event.target != solution) {
        sol_wrap.classList.remove("active");
    }
});

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

submit.onclick = async () => {
    if (!validate()) return;

    solution.innerHTML = "";
    sol_wrap.classList.add("active");

    evaluate();
}

const message = (text) => {
    return new Promise(async (resolve) => {
        for (let i = 0; i < text.length; i++) {
            if (text[i] === '\n') {
                solution.append(document.createElement("br"));
            } else {
                solution.innerHTML += text[i];
            }
            solution.scrollTop = solution.scrollHeight;
            await wait(10);
        }
        resolve();
    });
};

const validate = () => {
    if (input_1.value.length === 0 || input_2.value.length === 0) {
        alert("Ingrese dos números enteros");
        return false;
    }

    return true;
}

const evaluate = async () => {
    let NUMERO_A = parseInt(input_1.value);
    let NUMERO_B = parseInt(input_2.value);

    await message(`Con el algoritmo de euclides logro conseguir que\n`);

    while (true) {
        let RESTO = NUMERO_A % NUMERO_B;
        let K = (NUMERO_A - RESTO) / NUMERO_B;

        await message(`${NUMERO_A} = ${NUMERO_B} · ${K} + ${RESTO}\n`);

        NUMERO_A = NUMERO_B;
        NUMERO_B = RESTO;

        if (RESTO === 0) {
            break;
        }
    }

    await message(`el maximo comun divisor entre ${input_1.value} y ${input_2.value} es igual a ${NUMERO_A}\n`);
}
