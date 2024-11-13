import {
  Festival,
  OutputRecord,
  Order,
} from '../types';
import _ from 'lodash';

export const formatFestivalsData = (
  festivals: Festival[],
  order: Order = 'asc',
): OutputRecord[] => {
  // flatten the festival data as array of bands with associated festival name
  const bandsWithFestivals = festivals.flatMap((festival: Festival) =>
    festival.bands.map(band => ({
      ...band,
      festivalName: parseEmpty(festival.name),
    })));

  //group bands by recordLabel
  const  groupedByRecordLabel = _.groupBy(bandsWithFestivals, 'recordLabel');
  const result = _.map(groupedByRecordLabel, (bands, recordLabel) => {
    const bandsData = _(bands)
      .groupBy('name')
      .map((bandInstances, bandName) => ({
        name: parseEmpty(bandName),
        festivals: _.orderBy(_.uniq(bandInstances.map(b => b.festivalName)), undefined, order)
      }))
      .orderBy([band => band.name.toLowerCase()], [order])
      .value();
    return {
      recordLabel: parseEmpty(recordLabel),
      bands: bandsData,
    };
  });
  return _.orderBy(result, [(item) => item.recordLabel.toLowerCase()], [order]);
}

export const parseEmpty = (data: string | undefined | null) => {
  if (!data || !data.trim().length) {
    return 'undefined'
  }
  return data;
}