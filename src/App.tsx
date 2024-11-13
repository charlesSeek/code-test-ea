import React, { FC, useState, useEffect } from 'react';
import { OutputRecord, Order, Festival } from './types';
import { formatFestivalsData } from './utils/format';
import FestivalRecord from './components/festivalRecord/festivalRecord';
import SortSwitcher from './components/sortSwitcher/sortSwitcher';

const API_BASE_URL = 'https://eacp.energyaustralia.com.au/codingtest/api/v1';
const API_ENDPOINT = 'festivals';


const App: FC = () => {
  const [records, setRecords] = useState<Festival[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [order, setOrder] = useState<Order>('asc');
  const [error, setError] = useState<string|null>(null);
  useEffect(() => {
    const fetchFestivals = async() => {
      try {
        setLoading(true);
        // temp to use heroku proxy to fix the cors issue
        const response = await fetch(`https://cors-anywhere.herokuapp.com/${API_BASE_URL}/${API_ENDPOINT}`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('API issue')
        }
        const result = await response.json();
        setRecords(result);
      } catch (err: unknown) {
        (err instanceof Error) ? setError(err.message) : setError(String(err));
      } finally {
        setLoading(false);
      }
    }
    fetchFestivals();
  }, [])
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>loading...</p>
      </div>
    )
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {`${error} - please try again later.`}
      </div>
    )
  }
  const handleToggle = (order: Order) => {
    setOrder(order);
  };
  const formattedData: OutputRecord[] = formatFestivalsData(records, order);
  return (
    <div className="items-center justify-center min-h-screen bg-grey-100 px-10">
      <h1 className="mt-10 text-xl font-bold text-black-900">Music Festivals</h1>
      <div className="mt-10 text-sm">
        <SortSwitcher onToggle={handleToggle}/>
      </div>
      <ul className="divide-gray-100">
        {
          formattedData.map((record, idx) => (
            <li className="mt-5">
              <FestivalRecord key={`festival-record-${idx}`} recordLabel={record.recordLabel} bands={record.bands} />
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App;
