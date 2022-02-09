import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useToasts } from '../contexts/ToastProvider';
import { IAnalysis } from '../types';

export const useAnalyses = () => {
  const [analyses, setAnalyses] = useState<IAnalysis[] | null>(null);
  const { createToast } = useToasts();

  useEffect(() => {
    const fromDate = DateTime.now().minus({ days: 31 });
    const toDate = DateTime.now();

    // console.log(
    //   'I am fetching analysis between' +
    //     fromDate.toString() +
    //     ' and ' +
    //     toDate.toString()
    // );

    const apiURL = import.meta.env.VITE_API_URL;
    const fetchData = async () => {
      try {
        const response = await fetch(
          apiURL +
            'analysis/daterange/' +
            fromDate.toISO() +
            '/' +
            toDate.toISO() +
            '?max=10'
        );
        const data: IAnalysis[] = await response.json();
        setAnalyses(data);
        createToast(`Hämtade analyser för ${data.length} dagar`);
      } catch (err) {
        console.log(err);
        createToast('Fel uppstod när analysdata skulle hämtas', 'error');
      }
    };

    !analyses && fetchData();
  }, []);

  return { analyses };
};
