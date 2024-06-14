const transformToMoney = (value?: number) => {
  if (!value || value === 0) {
    return 'R$ 0,00';
  } else {
    value = parseFloat(value.toString());
    let formattedNumber: string = `R$ ${value
      .toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+\\,)/g, '$1.')}`;
    return formattedNumber;
  }
};

export { transformToMoney };
