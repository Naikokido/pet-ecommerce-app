interface FormatCurrency {
  (amount: number): string;
}

export const formatCurrency: FormatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "CLP",
  }).format(amount);
};

export const isValidPage = (value: number) => {
  if (value == null) {
    return false;
  }

  if (typeof value !== "number" && isNaN(value)) {
    return false;
  }
  if (value <= 0) {
    return false;
  }

  if (!Number.isInteger(value)) {
    return false;
  }

  return true;
};
