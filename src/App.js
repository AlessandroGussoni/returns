import React, { useState, useMemo, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend,
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';

const DATA = [{"year": 1928, "S&P500": "43,81", "tbill_3m": "3,08", "usbond_10y": "0,84", "real_estate": "1,49", "gold": "0,10"}, 
  {"year": 1929, "S&P500": "-8,30", "tbill_3m": "3,16", "usbond_10y": "4,20", "real_estate": "-2,06", "gold": "-0,15"}, 
  {"year": 1930, "S&P500": "-25,12", "tbill_3m": "4,55", "usbond_10y": "4,54", "real_estate": "-4,30", "gold": "0,10"}, 
  {"year": 1931, "S&P500": "-43,84", "tbill_3m": "2,31", "usbond_10y": "-2,56", "real_estate": "-8,15", "gold": "-17,38"},
  {"year": 1932, "S&P500": "-8,64", "tbill_3m": "1,07", "usbond_10y": "8,79", "real_estate": "-10,47", "gold": "21,28"},
  {"year": 1933, "S&P500": "49,98", "tbill_3m": "0,96", "usbond_10y": "1,86", "real_estate": "-3,81", "gold": "27,26"},
  {"year": 1934, "S&P500": "-1,19", "tbill_3m": "0,28", "usbond_10y": "7,96", "real_estate": "2,91", "gold": "31,75"}, 
  {"year": 1935, "S&P500": "46,74", "tbill_3m": "0,17", "usbond_10y": "4,47", "real_estate": "9,77", "gold": "0,43"},
  {"year": 1936, "S&P500": "31,94", "tbill_3m": "0,17", "usbond_10y": "5,02", "real_estate": "3,22", "gold": "0,09"}, 
  {"year": 1937, "S&P500": "-35,34", "tbill_3m": "0,28", "usbond_10y": "1,38", "real_estate": "2,56", "gold": "-0,23"},
  {"year": 1938, "S&P500": "29,28", "tbill_3m": "0,07", "usbond_10y": "4,21", "real_estate": "-0,87", "gold": "0,17"},
  {"year": 1939, "S&P500": "-1,10", "tbill_3m": "0,05", "usbond_10y": "4,41", "real_estate": "-1,30", "gold": "-1,23"},
  {"year": 1940, "S&P500": "-10,67", "tbill_3m": "0,04", "usbond_10y": "5,40", "real_estate": "3,31", "gold": "-1,66"},
  {"year": 1941, "S&P500": "-12,77", "tbill_3m": "0,13", "usbond_10y": "-2,02", "real_estate": "-8,38", "gold": "0,00"},
  {"year": 1942, "S&P500": "19,17", "tbill_3m": "0,34", "usbond_10y": "2,29", "real_estate": "3,33", "gold": "0,00"}, 
  {"year": 1943, "S&P500": "25,06", "tbill_3m": "0,38", "usbond_10y": "2,49", "real_estate": "11,45", "gold": "0,00"},
  {"year": 1944, "S&P500": "19,03", "tbill_3m": "0,38", "usbond_10y": "2,58", "real_estate": "16,58", "gold": "0,00"}, 
  {"year": 1945, "S&P500": "35,82", "tbill_3m": "0,38", "usbond_10y": "3,80", "real_estate": "11,78", "gold": "2,54"}, 
  {"year": 1946, "S&P500": "-8,43", "tbill_3m": "0,38", "usbond_10y": "3,13", "real_estate": "24,10", "gold": "0,00"},
  {"year": 1947, "S&P500": "5,20", "tbill_3m": "0,60", "usbond_10y": "0,92", "real_estate": "21,26", "gold": "0,00"},
  {"year": 1948, "S&P500": "5,70", "tbill_3m": "1,05", "usbond_10y": "1,95", "real_estate": "2,06", "gold": "0,00"},
  {"year": 1949, "S&P500": "18,30", "tbill_3m": "1,12", "usbond_10y": "4,66", "real_estate": "0,09", "gold": "-8,70"},
  {"year": 1950, "S&P500": "30,81", "tbill_3m": "1,20", "usbond_10y": "0,43", "real_estate": "3,64", "gold": "9,56"},
  {"year": 1951, "S&P500": "23,68", "tbill_3m": "1,52", "usbond_10y": "-0,30", "real_estate": "6,05", "gold": "0,00"},
  {"year": 1952, "S&P500": "18,15", "tbill_3m": "1,72", "usbond_10y": "2,27", "real_estate": "4,41", "gold": "-0,35"}, 
  {"year": 1953, "S&P500": "-1,21", "tbill_3m": "1,89", "usbond_10y": "4,14", "real_estate": "11,52", "gold": "0,69"},
  {"year": 1954, "S&P500": "52,56", "tbill_3m": "0,94", "usbond_10y": "3,29", "real_estate": "0,92", "gold": "0,57"}, 
  {"year": 1955, "S&P500": "32,60", "tbill_3m": "1,72", "usbond_10y": "-1,34", "real_estate": "0,00", "gold": "-0,03"}, 
  {"year": 1956, "S&P500": "7,44", "tbill_3m": "2,62", "usbond_10y": "-2,26", "real_estate": "0,91", "gold": "-0,11"}, 
  {"year": 1957, "S&P500": "-10,46", "tbill_3m": "3,22", "usbond_10y": "6,80", "real_estate": "2,72", "gold": "-0,11"},
  {"year": 1958, "S&P500": "43,72", "tbill_3m": "1,77", "usbond_10y": "-2,10", "real_estate": "0,66", "gold": "0,43"}, 
  {"year": 1959, "S&P500": "12,06", "tbill_3m": "3,39", "usbond_10y": "-2,65", "real_estate": "0,11", "gold": "0,00"}, 
  {"year": 1960, "S&P500": "0,34", "tbill_3m": "2,87", "usbond_10y": "11,64", "real_estate": "0,77", "gold": "0,48"}, 
  {"year": 1961, "S&P500": "26,64", "tbill_3m": "2,35", "usbond_10y": "2,06", "real_estate": "0,98", "gold": "-0,06"}, 
  {"year": 1962, "S&P500": "-8,81", "tbill_3m": "2,77", "usbond_10y": "5,69", "real_estate": "0,32", "gold": "-0,06"}, 
  {"year": 1963, "S&P500": "22,61", "tbill_3m": "3,16", "usbond_10y": "1,68", "real_estate": "2,14", "gold": "-0,40"}, 
  {"year": 1964, "S&P500": "16,42", "tbill_3m": "3,55", "usbond_10y": "3,73", "real_estate": "1,26", "gold": "0,03"}, 
  {"year": 1965, "S&P500": "12,40", "tbill_3m": "3,95", "usbond_10y": "0,72", "real_estate": "1,66", "gold": "0,06"}, 
  {"year": 1966, "S&P500": "-9,97", "tbill_3m": "4,86", "usbond_10y": "2,91", "real_estate": "1,22", "gold": "0,03"}, 
  {"year": 1967, "S&P500": "23,80", "tbill_3m": "4,29", "usbond_10y": "-1,58", "real_estate": "2,32", "gold": "-0,51"}, 
  {"year": 1968, "S&P500": "10,81", "tbill_3m": "5,34", "usbond_10y": "3,27", "real_estate": "4,13", "gold": "12,47"}, 
  {"year": 1969, "S&P500": "-8,24", "tbill_3m": "6,67", "usbond_10y": "-5,01", "real_estate": "6,99", "gold": "5,01"}, 
  {"year": 1970, "S&P500": "3,56", "tbill_3m": "6,39", "usbond_10y": "16,75", "real_estate": "8,22", "gold": "-9,45"}, 
  {"year": 1971, "S&P500": "14,22", "tbill_3m": "4,33", "usbond_10y": "9,79", "real_estate": "4,24", "gold": "16,69"}, 
  {"year": 1972, "S&P500": "18,76", "tbill_3m": "4,06", "usbond_10y": "2,82", "real_estate": "2,98", "gold": "48,78"}, 
  {"year": 1973, "S&P500": "-14,31", "tbill_3m": "7,04", "usbond_10y": "3,66", "real_estate": "3,42", "gold": "72,96"}, 
  {"year": 1974, "S&P500": "-25,90", "tbill_3m": "7,85", "usbond_10y": "1,99", "real_estate": "10,07", "gold": "66,15"}, 
  {"year": 1975, "S&P500": "37,00", "tbill_3m": "5,79", "usbond_10y": "3,61", "real_estate": "6,77", "gold": "-24,80"}, 
  {"year": 1976, "S&P500": "23,83", "tbill_3m": "4,98", "usbond_10y": "15,98", "real_estate": "8,18", "gold": "-4,10"}, 
  {"year": 1977, "S&P500": "-6,98", "tbill_3m": "5,26", "usbond_10y": "1,29", "real_estate": "14,65", "gold": "22,64"}, 
  {"year": 1978, "S&P500": "6,51", "tbill_3m": "7,18", "usbond_10y": "-0,78", "real_estate": "15,72", "gold": "37,01"}, 
  {"year": 1979, "S&P500": "18,52", "tbill_3m": "10,05", "usbond_10y": "0,67", "real_estate": "13,74", "gold": "126,55"}, 
  {"year": 1980, "S&P500": "31,74", "tbill_3m": "11,39", "usbond_10y": "-2,99", "real_estate": "7,40", "gold": "15,19"}, 
  {"year": 1981, "S&P500": "-4,70", "tbill_3m": "14,04", "usbond_10y": "8,20", "real_estate": "5,10", "gold": "-32,60"}, 
  {"year": 1982, "S&P500": "20,42", "tbill_3m": "10,60", "usbond_10y": "32,81", "real_estate": "0,56", "gold": "15,62"}, 
  {"year": 1983, "S&P500": "22,34", "tbill_3m": "8,62", "usbond_10y": "3,20", "real_estate": "4,75", "gold": "-16,80"}, 
  {"year": 1984, "S&P500": "6,15", "tbill_3m": "9,54", "usbond_10y": "13,73", "real_estate": "4,68", "gold": "-19,38"}, 
  {"year": 1985, "S&P500": "31,24", "tbill_3m": "7,47", "usbond_10y": "25,71", "real_estate": "7,47", "gold": "6,00"}, 
  {"year": 1986, "S&P500": "18,49", "tbill_3m": "5,97", "usbond_10y": "24,28", "real_estate": "9,61", "gold": "18,96"}, 
  {"year": 1987, "S&P500": "5,81", "tbill_3m": "5,78", "usbond_10y": "-4,96", "real_estate": "7,85", "gold": "24,53"}, 
  {"year": 1988, "S&P500": "16,54", "tbill_3m": "6,67", "usbond_10y": "8,22", "real_estate": "7,22", "gold": "-15,26"},
  {"year": 1989, "S&P500": "31,48", "tbill_3m": "8,11", "usbond_10y": "17,69", "real_estate": "4,39", "gold": "-2,84"}, 
  {"year": 1990, "S&P500": "-3,06", "tbill_3m": "7,50", "usbond_10y": "6,24", "real_estate": "-0,69", "gold": "-3,11"}, 
  {"year": 1991, "S&P500": "30,23", "tbill_3m": "5,38", "usbond_10y": "15,00", "real_estate": "-0,17", "gold": "-8,56"}, 
  {"year": 1992, "S&P500": "7,49", "tbill_3m": "3,43", "usbond_10y": "9,36", "real_estate": "0,82", "gold": "-5,73"}, 
  {"year": 1993, "S&P500": "9,97", "tbill_3m": "3,00", "usbond_10y": "14,21", "real_estate": "2,16", "gold": "17,68"}, 
  {"year": 1994, "S&P500": "1,33", "tbill_3m": "4,25", "usbond_10y": "-8,04", "real_estate": "2,52", "gold": "-2,17"}, 
  {"year": 1995, "S&P500": "37,20", "tbill_3m": "5,49", "usbond_10y": "23,48", "real_estate": "1,79", "gold": "0,98"}, 
  {"year": 1996, "S&P500": "22,68", "tbill_3m": "5,01", "usbond_10y": "1,43", "real_estate": "2,43", "gold": "-4,59"}, 
  {"year": 1997, "S&P500": "33,10", "tbill_3m": "5,06", "usbond_10y": "9,94", "real_estate": "4,02", "gold": "-21,41"}, 
  {"year": 1998, "S&P500": "28,34", "tbill_3m": "4,78", "usbond_10y": "14,92", "real_estate": "6,44", "gold": "-0,83"}, 
  {"year": 1999, "S&P500": "20,89", "tbill_3m": "4,64", "usbond_10y": "-8,25", "real_estate": "7,68", "gold": "0,85"}, 
  {"year": 2000, "S&P500": "-9,03", "tbill_3m": "5,82", "usbond_10y": "16,66", "real_estate": "9,29", "gold": "-5,44"}, 
  {"year": 2001, "S&P500": "-11,85", "tbill_3m": "3,40", "usbond_10y": "5,57", "real_estate": "6,68", "gold": "0,75"}, 
  {"year": 2002, "S&P500": "-21,97", "tbill_3m": "1,61", "usbond_10y": "15,12", "real_estate": "9,56", "gold": "25,57"}, 
  {"year": 2003, "S&P500": "28,36", "tbill_3m": "1,01", "usbond_10y": "0,38", "real_estate": "9,81", "gold": "19,89"}, 
  {"year": 2004, "S&P500": "10,74", "tbill_3m": "1,37", "usbond_10y": "4,49", "real_estate": "13,64", "gold": "4,65"}, 
  {"year": 2005, "S&P500": "4,83", "tbill_3m": "3,15", "usbond_10y": "2,87", "real_estate": "13,51", "gold": "17,77"}, 
  {"year": 2006, "S&P500": "15,61", "tbill_3m": "4,73", "usbond_10y": "1,96", "real_estate": "1,73", "gold": "23,20"}, 
  {"year": 2007, "S&P500": "5,48", "tbill_3m": "4,36", "usbond_10y": "10,21", "real_estate": "-5,40", "gold": "31,92"}, 
  {"year": 2008, "S&P500": "-36,55", "tbill_3m": "1,37", "usbond_10y": "20,10", "real_estate": "-12,00", "gold": "4,32"}, 
  {"year": 2009, "S&P500": "25,94", "tbill_3m": "0,15", "usbond_10y": "-11,12", "real_estate": "-3,86", "gold": "25,04"}, 
  {"year": 2010, "S&P500": "14,82", "tbill_3m": "0,14", "usbond_10y": "8,46", "real_estate": "-4,11", "gold": "29,24"}, 
  {"year": 2011, "S&P500": "2,10", "tbill_3m": "0,05", "usbond_10y": "16,04", "real_estate": "-3,89", "gold": "12,02"}, 
  {"year": 2012, "S&P500": "15,89", "tbill_3m": "0,09", "usbond_10y": "2,97", "real_estate": "6,44", "gold": "5,68"}, 
  {"year": 2013, "S&P500": "32,15", "tbill_3m": "0,06", "usbond_10y": "-9,10", "real_estate": "10,71", "gold": "-27,61"},
  {"year": 2014, "S&P500": "13,52", "tbill_3m": "0,03", "usbond_10y": "10,75", "real_estate": "4,51", "gold": "0,12"}, 
  {"year": 2015, "S&P500": "1,38", "tbill_3m": "0,05", "usbond_10y": "1,28", "real_estate": "5,20", "gold": "-12,11"},
  {"year": 2016, "S&P500": "11,77", "tbill_3m": "0,32", "usbond_10y": "0,69", "real_estate": "5,30", "gold": "8,10"}, 
  {"year": 2017, "S&P500": "21,61", "tbill_3m": "0,93", "usbond_10y": "2,80", "real_estate": "6,21", "gold": "12,66"}, 
  {"year": 2018, "S&P500": "-4,23", "tbill_3m": "1,94", "usbond_10y": "-0,02", "real_estate": "4,52", "gold": "-0,93"}, 
  {"year": 2019, "S&P500": "31,21", "tbill_3m": "2,06", "usbond_10y": "9,64", "real_estate": "3,69", "gold": "19,08"}, 
  {"year": 2020, "S&P500": "18,02", "tbill_3m": "0,35", "usbond_10y": "11,33", "real_estate": "10,43", "gold": "24,17"}, 
  {"year": 2021, "S&P500": "28,47", "tbill_3m": "0,05", "usbond_10y": "-4,42", "real_estate": "18,87", "gold": "-3,75"}, 
  {"year": 2022, "S&P500": "-18,04", "tbill_3m": "2,02", "usbond_10y": "-17,83", "real_estate": "5,67", "gold": "0,55"}, 
  {"year": 2023, "S&P500": "26,06", "tbill_3m": "5,07", "usbond_10y": "3,88", "real_estate": "6,29", "gold": "13,26"}
]

const generateMockData = (startYear, endYear) => {
  return DATA.filter(item => item.year >= startYear && item.year <= endYear)
    .map(item => ({
      year: item.year,
      'S&P 500': parseFloat(item["S&P500"].replace(',', '.')) / 100,
      'Gold': parseFloat(item.gold.replace(',', '.')) / 100,
      'Bonds': parseFloat(item.usbond_10y.replace(',', '.')) / 100,
      'T-Bills': parseFloat(item.tbill_3m.replace(',', '.')) / 100,
      'Real Estate': parseFloat(item.real_estate.replace(',', '.')) / 100
    }));
};

const AssetComparisonChart = () => {
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(2023);
  const [data, setData] = useState(() => generateMockData(2000, 2023));
  const [isCumulative, setIsCumulative] = useState(false);
  const [portfolioMix, setPortfolioMix] = useState({
    'S&P 500': 40,
    'Gold': 30,
    'Bonds': 30,
    'T-Bills': 0,
    'Real Estate': 0
  });
  const [totalPercentage, setTotalPercentage] = useState(100);
  const [investment, setInvestment] = useState(10000);
  const [showPortfolioValue, setShowPortfolioValue] = useState(false);
  const [visibleAssets, setVisibleAssets] = useState({
    'Portfolio': true,
    'S&P 500': true,
    'Gold': true,
    'Bonds': true,
    'T-Bills': false,
    'Real Estate': false
  });

  useEffect(() => {
    const total = Object.entries(portfolioMix)
      .filter(([asset]) => visibleAssets[asset])
      .reduce((sum, [, value]) => sum + value, 0);
    setTotalPercentage(total);
  }, [portfolioMix, visibleAssets]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(generateMockData(parseInt(startYear), parseInt(endYear)));
  };

  const handlePortfolioMixChange = (asset, value) => {
    const newValue = parseInt(value) || 0;
    const otherAssetsTotal = Object.entries(portfolioMix)
      .filter(([key]) => key !== asset && visibleAssets[key])
      .reduce((sum, [, val]) => sum + val, 0);
    
    const cappedValue = Math.min(newValue, 100 - otherAssetsTotal);
    
    setPortfolioMix(prev => ({...prev, [asset]: cappedValue}));
  };

  const toggleAssetVisibility = (asset) => {
    setVisibleAssets(prev => ({...prev, [asset]: !prev[asset]}));
  };

  const processedData = useMemo(() => {
    let processedData = data.map(yearData => ({...yearData}));
    if (isCumulative) {
      let cumulativeValues = {...visibleAssets, 'Portfolio': 1};
      processedData = processedData.map(yearData => {
        let newYearData = {year: yearData.year};
        for (let asset in cumulativeValues) {
          if (asset !== 'Portfolio' && visibleAssets[asset]) {
            cumulativeValues[asset] = (cumulativeValues[asset] || 1) * (1 + yearData[asset]);
            newYearData[asset] = parseFloat((cumulativeValues[asset] - 1).toFixed(4));
          }
        }
        // Calculate portfolio performance
        const portfolioReturn = Object.keys(portfolioMix)
          .filter(asset => visibleAssets[asset])
          .reduce((sum, asset) => {
            return sum + (yearData[asset] * (portfolioMix[asset] / 100));
          }, 0);
        cumulativeValues['Portfolio'] *= (1 + portfolioReturn);
        newYearData['Portfolio'] = parseFloat((cumulativeValues['Portfolio'] - 1).toFixed(4));
        
        if (showPortfolioValue) {
          newYearData['Portfolio Value'] = parseFloat((investment * cumulativeValues['Portfolio']).toFixed(2));
        }
        
        return newYearData;
      });
    } else {
      processedData = processedData.map(yearData => {
        const portfolioReturn = Object.keys(portfolioMix)
          .filter(asset => visibleAssets[asset])
          .reduce((sum, asset) => {
            return sum + (yearData[asset] * (portfolioMix[asset] / 100));
          }, 0);
        return {...yearData, 'Portfolio': parseFloat(portfolioReturn.toFixed(4))};
      });
    }
    return processedData;
  }, [data, isCumulative, portfolioMix, investment, showPortfolioValue, visibleAssets]);

  const assets = ['Portfolio', 'S&P 500', 'Gold', 'Bonds', 'T-Bills', 'Real Estate', ];
  const colors = ['#21b6a8', '#8884d8', '#ffc658', '#ff7300', '#82ca9d', '#e28743', ];

  const styles = {
    container: {
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    header: {
      textAlign: 'center',
      padding: '24px',
      backgroundColor: '#f3f4f6',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#2563eb',
      marginBottom: '8px',
    },
    subtitle: {
      color: '#4b5563',
      marginBottom: '16px',
    },
    content: {
      padding: '24px',
    },
    form: {
      marginBottom: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
    },
    inputGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    label: {
      marginRight: '8px',
    },
    input: {
      width: '100px',
      padding: '4px 8px',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
    },
    button: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    portfolioMix: {
      backgroundColor: '#f3f4f6',
      padding: '16px',
      borderRadius: '8px',
      width: '100%',
    },
    portfolioMixTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px',
      textAlign: 'center',
    },
    assetInputs: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      justifyContent: 'center',
      marginBottom: '8px',
    },
    assetInput: {
      display: 'flex',
      flexDirection: 'column',
    },
    totalPercentage: {
      textAlign: 'center',
      fontSize: '14px',
    },
    warning: {
      backgroundColor: '#fee2e2',
      border: '1px solid #ef4444',
      color: '#b91c1c',
      padding: '12px',
      borderRadius: '4px',
      marginBottom: '16px',
    },
    assetToggle: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '16px',
    },
    toggleButton: {
      padding: '4px 8px',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
  };


  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Investment Returns Explorer</h1>
        <p style={styles.subtitle}>
          Compare the performance of major asset classes and your custom portfolio mix over time.
        </p>
      </div>
      <div style={styles.content}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <div>
              <label htmlFor="startYear" style={styles.label}>Start Year:</label>
              <input
                id="startYear"
                type="number"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                style={styles.input}
              />
            </div>
            <div>
              <label htmlFor="endYear" style={styles.label}>End Year:</label>
              <input
                id="endYear"
                type="number"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>Update Chart</button>
          </div>
          <div style={styles.inputGroup}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                id="cumulative-mode"
                type="checkbox"
                checked={isCumulative}
                onChange={(e) => {
                  setIsCumulative(e.target.checked);
                  setShowPortfolioValue(false);
                }}
              />
              <label htmlFor="cumulative-mode">Cumulative Returns</label>
            </div>
          </div>
          <div style={styles.portfolioMix}>
            <h2 style={styles.portfolioMixTitle}>Portfolio Mix</h2>
            <div style={styles.assetInputs}>
              {Object.keys(portfolioMix).map(asset => (
                <div key={asset} style={styles.assetInput}>
                  <label htmlFor={`${asset}-mix`} style={styles.label}>{asset}:</label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      id={`${asset}-mix`}
                      type="number"
                      value={portfolioMix[asset]}
                      onChange={(e) => handlePortfolioMixChange(asset, e.target.value)}
                      style={{ ...styles.input, width: '60px' }}
                    />
                    <span style={{ marginLeft: '4px' }}>%</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              ...styles.totalPercentage,
              color: totalPercentage > 100 ? '#ef4444' : '#10b981'
            }}>
              Total: {totalPercentage}% {totalPercentage > 100 ? '(Capped at 100%)' : ''}
            </div>
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
              <div>
                <label htmlFor="investment" style={styles.label}>Investment Amount:</label>
                <input
                  id="investment"
                  type="number"
                  value={investment}
                  onChange={(e) => setInvestment(parseFloat(e.target.value) || 0)}
                  style={{ ...styles.input, width: '120px' }}
                />
              </div>
              <button
                onClick={() => setShowPortfolioValue(!showPortfolioValue)}
                disabled={!isCumulative}
                style={{
                  ...styles.button,
                  backgroundColor: !isCumulative ? '#9ca3af' : '#3b82f6',
                  cursor: !isCumulative ? 'not-allowed' : 'pointer',
                }}
              >
                {showPortfolioValue ? 'Show Returns' : 'Show Portfolio Value'}
              </button>
            </div>
          </div>
        </form>
        <div style={styles.assetToggle}>
          {assets.map((asset, index) => (
            <button
              key={asset}
              onClick={() => toggleAssetVisibility(asset)}
              style={{
                ...styles.toggleButton,
                backgroundColor: visibleAssets[asset] ? colors[index] : 'transparent',
                color: visibleAssets[asset] ? 'white' : 'black',
              }}
            >
              {asset}
            </button>
          ))}
        </div>
        {totalPercentage > 100 && (
          <div style={styles.warning}>
            <strong>Warning: </strong>
            <span>The total percentage exceeds 100%. The portfolio will be scaled down proportionally.</span>
          </div>
        )}
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={processedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis 
              tickFormatter={(value) => 
                showPortfolioValue
                  ? `$${value.toLocaleString()}`
                  : `${(value * 100).toFixed(0)}%`
              } 
            />
            <Tooltip 
              formatter={(value, name) => [
                showPortfolioValue && name === 'Portfolio Value'
                  ? `$${value.toLocaleString()}`
                  : `${(value * 100).toFixed(2)}%`,
                name
              ]}
            />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            {assets.map((asset, index) => (
              visibleAssets[asset] && (
                <Line
                  key={asset}
                  type="monotone"
                  dataKey={showPortfolioValue && asset === 'Portfolio' ? 'Portfolio Value' : asset}
                  name={asset}
                  stroke={colors[index]}
                  strokeWidth={asset === 'Portfolio' ? 3 : 2}
                  dot={false}
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AssetComparisonChart;