export default function Format({value, currency}) {
  const formatToCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });

  const formatted = formatToCurrency.format(value);

  return formatted;
}
