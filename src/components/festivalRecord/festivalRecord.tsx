import React, { FC } from 'react';
import { OutputRecord } from '../../types';

const FestivalRecord: FC<OutputRecord> = ({ recordLabel, bands }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-blue-600">{recordLabel ?? 'undefined'}</h2>
      {
        bands.map(({ name, festivals }) => (
          <div key={name} className="ml-6 mt-2">
            <h3 className="text-lg font-medium text-gray-800">{name}</h3>
            <ul className="ml-4 list-disc list-inside">
              {
                festivals.map(festival => (
                  <li key={festival} className="text-gray-600">
                    {festival}
                  </li>
                ))
              }
            </ul>
          </div>
        ))
      }
    </div>
  )
}

export default FestivalRecord;