// Constants for tax rates (Kenya 2023/2024)
const TAX_BANDS = [
    { min: 0, max: 24000, rate: 10 },
    { min: 24001, max: 40000, rate: 25 },
    { min: 40001, max: Infinity, rate: 30 }
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
    { min: 100000, max: Infinity, amount: 1700 }
];

const NSSF_RATE_EMPLOYEE = 6; // % of basic salary
const NSSF_RATE_EMPLOYER = 6; // % of basic salary

// Function to calculate PAYE (tax)
function calculatePAYE(grossSalary) {
    let taxableIncome = grossSalary - 24000; // Deduct personal relief
    let tax = 0;

    for (let band of TAX_BANDS) {
        if (taxableIncome <= 0) break;
        let bandTaxableAmount = Math.min(taxableIncome, band.max - band.min);
        tax += (bandTaxableAmount * band.rate) / 100;
        taxableIncome -= bandTaxableAmount;
    }

    return tax;
}

// Function to calculate NHIF deductions
function calculateNHIF(grossSalary) {
    let nhif = 0;
    for (let rate of NHIF_RATES) {
        if (grossSalary >= rate.min && grossSalary <= rate.max) {
            nhif = rate.amount;
            break;
        }
    }
    return nhif;
}

// Function to calculate NSSF deductions
function calculateNSSF(basicSalary) {
    const nssfEmployee = (NSSF_RATE_EMPLOYEE / 100) * basicSalary;
    const nssfEmployer = (NSSF_RATE_EMPLOYER / 100) * basicSalary;
    return nssfEmployee + nssfEmployer;
}

// Function to calculate net salary
function calculateNetSalary(basicSalary, benefits) {
    const grossSalary = basicSalary + benefits;
    const tax = calculatePAYE(grossSalary);
    const nhif = calculateNHIF(grossSalary);
    const nssf = calculateNSSF(basicSalary);
    const netSalary = grossSalary - tax - nhif - nssf;
    return netSalary;
}

// Example usage:
const basicSalary = 50000; // Example basic salary
const benefits = 10000; // Example benefits
const netSalary = calculateNetSalary(basicSalary, benefits);

console.log(`Basic Salary: KES ${basicSalary}`);
console.log(`Benefits: KES ${benefits}`);
console.log(`Net Salary: KES ${netSalary.toFixed(2)}`);
