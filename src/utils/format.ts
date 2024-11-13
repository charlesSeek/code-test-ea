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
      festivalName: festival.name,
    })));

  //group bands by recordLabel
  const  groupedByRecordLabel = _.groupBy(bandsWithFestivals, 'recordLabel');
  const result = _.map(groupedByRecordLabel, (bands, recordLabel) => {
    const bandsData = _(bands)
      .groupBy('name')
      .map((bandInstances, bandName) => ({
        name: bandName,
        festivals: _.orderBy(_.uniq(bandInstances.map(b => b.festivalName)), undefined, order)
      }))
      .orderBy([band => band.name.toLowerCase()], [order])
      .value();
    return {
      recordLabel,
      bands: bandsData,
    };
  });
  return _.orderBy(result, [(item) => item.recordLabel.toLowerCase()], [order]);
}