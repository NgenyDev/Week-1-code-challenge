function calculateIndividualNetSalary(basicSalary, benefits){
    const TaxRates = [
        {min: 0, max: 24000, rate: 10 },
        {min: 24001, max: 32333, rate: 25 },
        {min: 32334, max: 41999, rate: 30 },
        {min: 42000, max: 499999, rate: 35 }

    ];
    const NHIF_RATES = [
        { min: 0, max: 5999, amount: 150 },
        { min: 6000, max: 7999, amount: 300 },
        { min: 8000, max: 11999, amount: 400 },
        { min: 12000, max: 14999, amount: 500 },
        { min: 15000, max: 19999, amount: 600 },
        { min: 20000, max: 24999, amount: 750 },
        { min: 25000, max: 29999, amount: 850 },
        { min: 30000, max: 34999, amount: 900 },
        { min: 35000, max: 39999, amount: 950 },
        { min: 40000, max: 44999, amount: 1000 },
        { min: 45000, max: 49999, amount: 1100 },
        { min: 50000, max: 59999, amount: 1200 },
        { min: 60000, max: 69999, amount: 1300 },
        { min: 70000, max: 79999, amount: 1400 },
        { min: 80000, max: 89999, amount: 1500 },
        { min: 90000, max: 99999, amount: 1600 },
        { min: 100000, max: Infinity, amount: 1700 },
    ];
    const nssfRateEmployee = 0.06;
    let grossSalary = basicSalary + benefits;
    let nhifDeductions = calculateNHIFDeduction(grossSalary);
    let nssfDeduction = basicSalary * nssfRateEmployee;
    let taxableIncome = grossSalary - nhifDeduction - nssfDeduction;
    let payee = calculatePAYE(taxableIncome)
;    let netSalary = grossSalary - payee - nhifDeduction - nssfDeduction;
    return {
        grossSalary: grossSalary,
        nhifDeduction: nhifDeduction,
        nssfDeduction: nssfDeduction,
        payee: payee,
        netSalary: netSalary
    };
}

function calculateNHIFDeduction(grossSalary) {
    for (let i = 0; i < NHIF_RATES.length; i++) {
        if (grossSalary >= NHIF_RATES[i].min && grossSalary <= NHIF_RATES[i].max) {
            return NHIF_RATES[i].amount;
        }
    }
    return 0;
}

function calculatePaye(taxableIncome) {
    let tax = 0;
    for (let i = 0; i < TaxRates.length; i++) {
        if (taxableIncome > TaxRates[i].min) {
            let taxableAmount = Math.min(taxableIncome - TaxRates[i].min, TaxRates[i].max - TaxRates[i].min);
            tax += taxableAmount * (TaxRates[i].rate / 100);
        } else {
            break;
        }
    }
    return tax;
}

        
 

