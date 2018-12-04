import axios from 'axios';

import { getStartDate, getEndDate } from '../../utils/date';

export default async () => {
  const getBeverages = async (params, beverages = []) => {
    const { data } = await axios.get('https://bolaget.io/v1/products', params);

    beverages.push(...data);

    if (data.length >= 100) {
      const p = Object.assign({}, params, {
        params: Object.assign({}, params.params, {
          offset: params.params.offset ? params.params.offset + data.length : data.length,
        }),
      });
      return getBeverages(p, beverages);
    }

    return beverages;
  };

  const params = {
    params: {
      assortment: 'TSE',
      limit: 100,
      sales_start_from: getStartDate(),
      sales_start_to: getEndDate(),
    },
  };

  const beverages = await getBeverages(params);

  const groupByArray = (xs, key) => xs.reduce((rv, x) => {
    const v = key instanceof Function ? key(x) : x[key];
    const el = rv.find(r => r && r.key === v);

    if (el) {
      el.values.push(x);
    } else {
      rv.push({
        key: v,
        values: [x],
      });
    }
    return rv;
  }, []);

  const groupedResponse = groupByArray(beverages, 'product_group')
    .map(beverage => Object.assign({}, beverage, ({ slugName: beverage.key })))
    .sort((a, b) => b.values.length - a.values.length);

  return groupedResponse;
};
