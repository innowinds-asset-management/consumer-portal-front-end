export const getormatCurrency = (amount?: number, currency: string = 'INR', currencyLocale: string = 'en-IN') => {
    if (amount === null || amount === undefined) return 'N/A';
    return new Intl.NumberFormat(currencyLocale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  export const setDefaultCurrency = () => {
    const defaultCurrencyInfo = { symbol: 'INR', locale: 'en-IN' };
    localStorage.setItem('currencyInfo', JSON.stringify(defaultCurrencyInfo));
  }


  export const formatCurrency = (amount?: number) => {
    const currencyInfo = localStorage.getItem('currencyInfo');
    if (!currencyInfo) {
      setDefaultCurrency();
    }
    if(currencyInfo){
      const currencyInfoObj = JSON.parse(currencyInfo);
      return  getormatCurrency(amount, currencyInfoObj.symbol, currencyInfoObj.locale); 
    }
  };