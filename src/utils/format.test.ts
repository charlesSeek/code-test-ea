import { formatFestivalsData } from './format';
import { Festival } from '../types';

describe('refactorFestivals function', () => {
  let festivalData: Festival[] = [];
  beforeEach(() => {
    festivalData = [
      {
        name: 'Alpha Festival',
        bands: [
          {
            name: 'Band B',
            recordLabel: 'Record Label Y',
          },
          {
            name: 'Band A',
            recordLabel: 'Record Label X',
          }
        ]
      },
      {
        name: 'Beta Festival',
        bands: [
          {
            name: 'Band C',
            recordLabel: 'Record Label Y',
          },
          {
            name: 'Band A',
            recordLabel: 'Record Label X'
          }
        ]
      }
    ]
  });
  it('should get properly data when order is asc', () => {
    expect(formatFestivalsData(festivalData, 'asc')).toHaveLength(2);
    expect(formatFestivalsData(festivalData, 'asc')[0]).toMatchObject({
      recordLabel: 'Record Label X',
      bands: [
        {
          name: 'Band A',
          festivals: ['Alpha Festival', 'Beta Festival']
        }
      ]
    });
    expect(formatFestivalsData(festivalData, 'asc')[1]).toMatchObject({
      recordLabel: 'Record Label Y',
      bands: [
        {
          name: 'Band B',
          festivals: ['Alpha Festival']
        },
        {
          name: 'Band C',
          festivals: ['Beta Festival']
        }
      ]
    });
  })
  it('should get properly data when order is desc', () => {
    expect(formatFestivalsData(festivalData, 'desc')).toHaveLength(2);
    expect(formatFestivalsData(festivalData, 'desc')[0]).toMatchObject({
      recordLabel: 'Record Label Y',
      bands: [
        {
          name: 'Band C',
          festivals: ['Beta Festival']
        },
        {
          name: 'Band B',
          festivals: ['Alpha Festival']
        },
      ]
    });
    expect(formatFestivalsData(festivalData, 'desc')[1]).toMatchObject({
      recordLabel: 'Record Label X',
      bands: [
        {
          name: 'Band A',
          festivals: ['Beta Festival', 'Alpha Festival']
        }
      ]
    });
  })
})