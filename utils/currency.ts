export const convertToCFA = (amount: number, originalPrice: string | number) => {
  const USD_TO_CFA = 575;
  const isCFA = (price: string | number) => typeof price === 'string' && price.includes('FCFA');
  
  if (isCFA(originalPrice)) {
    return amount;
  }
  return Math.round(amount * USD_TO_CFA);
};