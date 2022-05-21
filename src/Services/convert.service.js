import {instance} from './api';

export async function convertCurrency({from, to, amount}) {
  const {data, status} = await instance.get(
    `/convert?from=${from}&to=${to}&amount=${amount}`,
  );

  console.log(data);

  const {info, success, date} = data;

  return {info, success, date};
}
