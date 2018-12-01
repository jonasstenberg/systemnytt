import axios from 'axios';

import { getStartDate, getEndDate } from '../../utils/date';

export default async (productGroup) => {
  const getBeverages = async (params, beverages = []) => {
    const { data } = await axios.get('https://bolaget.io/v1/products', params);

    beverages.push(...data);

    if (data.length >= 100) {
      console.log(params.params.offset);
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
      product_group: productGroup,
      limit: 100,
      sales_start_from: getStartDate(),
      sales_start_to: getEndDate(),
    },
  };

  return getBeverages(params);
};
