export function maskMoney(money) {

  const regex = /(?<millions>\d{0,3})(?<thousands>\d{0,3})(?<hundreds>\d{0,3})(?<cents>\d{0,2})/;

  const inputDigits = getDigits(money);
  const fullDigits = padLeft(inputDigits, 11);
  const matches = fullDigits.match(regex);

  let { millions, thousands, hundreds, cents } = matches.groups;

  millions = millions.replace(/^[0]*(?=[1-9])?/, "");

  if (millions <= 0) thousands = thousands.replace(/^[0]*(?=[1-9])?/, "");
  if (millions <= 0 && thousands <= 0) hundreds = hundreds.replace(/^[0]*(?=[1-9])?/, "");

  millions = millions.length > 0 ? `${millions}.` : "";
  thousands = thousands.length > 0 ? `${thousands}.` : "";
  hundreds = hundreds.length > 0 ? `${hundreds},` : "0,";
  cents = padLeft(cents);

  const currency = "R$";
  return `${currency} ${millions}${thousands}${hundreds}${cents}`;
}

function getDigits(string) {
  return `${string}`.replace(/\D/g, "");
}

function padLeft(n, width = 2, z = "0") {
  const number = `${n}`;
  const diff = width - number.length;
  const pad = diff > 0 ? z.repeat(diff) : "";
  return `${pad}${number}`;
};

export function currencyToFloat(value) {
  const result = parseFloat(
    value
      .replace("R$", "")
      .replace(" ", "")
      .replace(/\./g, "")
      .replace(",", ".")
  ).toFixed(2);
  return parseFloat(result);
};