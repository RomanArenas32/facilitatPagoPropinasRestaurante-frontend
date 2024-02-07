interface TipCalculator {
    tipPerEmployee: (tip: number, employe: number) => number;
}

const tipCalculator: TipCalculator = {
    tipPerEmployee: (tip, employe = 1) => {
        if (!Number.isInteger(employe) || employe <= 0) {
            throw new Error('El número de empleados debe ser un entero positivo.');
        }

        return tip / employe;
    }
};

export { tipCalculator };
