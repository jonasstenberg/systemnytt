import axios from 'axios';

const groupBy = key => array => array.reduce((objectsByKeyValue, obj) => {
  const value = obj[key];
  // eslint-disable-next-line no-param-reassign
  objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
  return objectsByKeyValue;
}, {});

export default async (startDate, endDate) => {
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
      sales_start_from: startDate,
      sales_start_to: endDate,
    },
  };

  const beverages = await getBeverages(params);

  const groupByProductGroup = groupBy('sales_start');
  const groupedBeverages = groupByProductGroup(beverages);

  const sortedGroupedBeverages = Object.keys(groupedBeverages)
    .sort()
    .reduce((accumulator, currentValue) => {
      // eslint-disable-next-line no-param-reassign
      accumulator[currentValue] = groupedBeverages[currentValue];
      return accumulator;
    }, {});

  return sortedGroupedBeverages;
};
