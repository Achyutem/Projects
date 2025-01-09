import React, { useState } from "react";

const App: React.FC = () => {
  const [ticker, setTicker] = useState<string>("");
  const [peRatio, setPeRatio] = useState<string>("");
  const [currentRevenue, setCurrentRevenue] = useState<string>("");
  const [revenueGrowth, setRevenueGrowth] = useState<string>("");
  const [ebitdaMargin, setEbitdaMargin] = useState<string>("");
  const [interestCost, setInterestCost] = useState<string>("");
  const [patMargin, setPatMargin] = useState<string>("");
  const [sharesOutstanding, setSharesOutstanding] = useState<string>("");
  const [cmp, setCmp] = useState<string>("");
  const [forwardPe, setForwardPe] = useState<number | null>(null);
  const [forwardEps, setForwardEps] = useState<number | null>(null);
  const [showInputs, setShowInputs] = useState<boolean>(true);
  const [earningsGrowthRate, setEarningsGrowthRate] = useState<string>("");
  const [pegRatio, setPegRatio] = useState<number | null>(null);

  const calculateForwardPE = () => {
    const estimatedRevenue =
      parseFloat(currentRevenue || "0") *
      (1 + parseFloat(revenueGrowth || "0") / 100);
    const ebitda = estimatedRevenue * (parseFloat(ebitdaMargin || "0") / 100);
    const adjustedEbitda = ebitda - parseFloat(interestCost || "0");
    const pat = adjustedEbitda * (parseFloat(patMargin || "0") / 100);
    const eps = pat / parseFloat(sharesOutstanding || "0");
    const forwardPE = parseFloat(cmp || "0") / eps;
    const growthRate = parseFloat(earningsGrowthRate || "0");
    const pegRatio = growthRate > 0 ? forwardPE / growthRate : null;

    setForwardEps(eps);
    setForwardPe(forwardPE);
    setPegRatio(pegRatio);
    setShowInputs(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-screen-lg mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 mb-6">
          Forward P/E Calculator
        </h1>
        {showInputs ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Company Ticker (NSE)", value: ticker, set: setTicker },
              { label: "Current P/E", value: peRatio, set: setPeRatio },
              {
                label: "Current Revenue (INR in Crs)",
                value: currentRevenue,
                set: setCurrentRevenue,
              },
              {
                label: "Estimated Revenue Growth (%)",
                value: revenueGrowth,
                set: setRevenueGrowth,
              },
              {
                label: "EBITDA Margin (%)",
                value: ebitdaMargin,
                set: setEbitdaMargin,
              },
              {
                label: "Estimated Earnings Growth Rate (%)",
                value: earningsGrowthRate,
                set: setEarningsGrowthRate,
              },
              {
                label: "Interest Cost (INR)",
                value: interestCost,
                set: setInterestCost,
              },
              { label: "PAT Margin (%)", value: patMargin, set: setPatMargin },
              {
                label: "No. of Total Shares (in Crs)",
                value: sharesOutstanding,
                set: setSharesOutstanding,
              },
              { label: "CMP (INR)", value: cmp, set: setCmp },
            ].map(({ label, value, set }, idx) => (
              <div key={idx}>
                <label className="block text-gray-700 font-bold">
                  {label}:
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ))}
            <button
              onClick={calculateForwardPE}
              className="col-span-1 sm:col-span-2 w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-lg focus:outline-none hover:bg-indigo-700">
              Calculate Forward P/E
            </button>
          </div>
        ) : (
          <div>
            <div className="mt-6 bg-indigo-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
                Results for {ticker}
              </h2>
              {[
                ["Current P/E", peRatio],
                ["Current Revenue", `${currentRevenue} Cr`],
                ["Estimated Revenue Growth", `${revenueGrowth}%`],
                ["EBITDA Margin", `${ebitdaMargin}%`],
                ["Interest Cost", `₹${interestCost} Cr`],
                ["PAT Margin", `${patMargin}%`],
                ["No. of Shares Outstanding", `${sharesOutstanding} Cr`],
                ["CMP", `₹${cmp}`],
                ["Forward EPS", `₹${forwardEps?.toFixed(2)}`],
                ["Forward P/E", forwardPe?.toFixed(2)],
                ["PEG Ratio", pegRatio !== null ? pegRatio.toFixed(2) : "N/A"],
              ].map(([key, value], idx) => (
                <p
                  key={idx}
                  className="text-gray-800">
                  <strong>{key}:</strong> {value}
                </p>
              ))}
            </div>
            <button
              onClick={() => setShowInputs(true)}
              className="w-full py-3 mt-6 bg-indigo-600 text-white font-semibold rounded-lg focus:outline-none hover:bg-indigo-700">
              Edit Values
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

// import React, { useState } from "react";

// const App: React.FC = () => {
//   const [ticker, setTicker] = useState<string>("");
//   const [peRatio, setPeRatio] = useState<string>("");
//   const [currentRevenue, setCurrentRevenue] = useState<string>("");
//   const [revenueGrowth, setRevenueGrowth] = useState<string>("");
//   const [ebitdaMargin, setEbitdaMargin] = useState<string>("");
//   const [interestCost, setInterestCost] = useState<string>("");
//   const [patMargin, setPatMargin] = useState<string>("");
//   const [sharesOutstanding, setSharesOutstanding] = useState<string>("");
//   const [cmp, setCmp] = useState<string>("");
//   const [forwardPe, setForwardPe] = useState<number | null>(null);
//   const [forwardEps, setForwardEps] = useState<number | null>(null);
//   const [showInputs, setShowInputs] = useState<boolean>(true);
//   const [earningsGrowthRate, setEarningsGrowthRate] = useState<string>("");
//   const [pegRatio, setPegRatio] = useState<number | null>(null);

//   const calculateForwardPE = () => {
//     const estimatedRevenue =
//       parseFloat(currentRevenue || "0") *
//       (1 + parseFloat(revenueGrowth || "0") / 100);
//     const ebitda = estimatedRevenue * (parseFloat(ebitdaMargin || "0") / 100);
//     const adjustedEbitda = ebitda - parseFloat(interestCost || "0");
//     const pat = adjustedEbitda * (parseFloat(patMargin || "0") / 100);
//     const eps = pat / parseFloat(sharesOutstanding || "0");
//     const forwardPE = parseFloat(cmp || "0") / eps;
//     const growthRate = parseFloat(earningsGrowthRate || "0");
//     const pegRatio = growthRate > 0 ? forwardPE / growthRate : null;

//     setForwardEps(eps);
//     setForwardPe(forwardPE);
//     setPegRatio(pegRatio);
//     setShowInputs(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
//         <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
//           Forward P/E Calculator
//         </h1>
//         {showInputs ? (
//           <div className="space-y-6">
//             <div>
//               <label className="block text-gray-700 font-bold">
//                 Company Ticker (NSE):
//               </label>
//               <input
//                 type="text"
//                 value={ticker}
//                 onChange={(e) => setTicker(e.target.value)}
//                 className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-bold">
//                 Current P/E:
//               </label>
//               <input
//                 type="number"
//                 value={peRatio}
//                 onChange={(e) => setPeRatio(e.target.value)}
//                 className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-bold">
//                 Current Revenue (INR in Crs):
//               </label>
//               <input
//                 type="number"
//                 value={currentRevenue}
//                 onChange={(e) => setCurrentRevenue(e.target.value)}
//                 className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-bold">
//                 Estimated Revenue Growth (%):
//               </label>
//               <input
//                 type="number"
//                 value={revenueGrowth}
//                 onChange={(e) => setRevenueGrowth(e.target.value)}
//                 className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-bold">
//                 EBITDA Margin (%):
//               </label>
//               <input
//                 type="number"
//                 value={ebitdaMargin}
//                 onChange={(e) => setEbitdaMargin(e.target.value)}
//                 className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-bold">
//                 Estimated Earnings Growth Rate (%):
//               </label>
//               <input
//                 type="number"
//                 value={earningsGrowthRate}
//                 onChange={(e) => setEarningsGrowthRate(e.target.value)}
//                 className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-bold">
//                 Interest Cost (INR):
//               </label>
//               <input
//                 type="number"
//                 value={interestCost}
//                 onChange={(e) => setInterestCost(e.target.value)}
//                 className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-bold">
//                 PAT Margin (%):
//               </label>
//               <input
//                 type="number"
//                 value={patMargin}
//                 onChange={(e) => setPatMargin(e.target.value)}
//                 className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-bold">
//                 No. of Total Shares (in Crs):
//               </label>
//               <input
//                 type="number"
//                 value={sharesOutstanding}
//                 onChange={(e) => setSharesOutstanding(e.target.value)}
//                 className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-bold">
//                 CMP (INR):
//               </label>
//               <input
//                 type="number"
//                 value={cmp}
//                 onChange={(e) => setCmp(e.target.value)}
//                 className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>

//             <button
//               onClick={calculateForwardPE}
//               className="w-full py-3 mt-6 bg-indigo-600 text-white font-semibold rounded-lg focus:outline-none hover:bg-indigo-700">
//               Calculate Forward P/E
//             </button>
//           </div>
//         ) : (
//           <div>
//             <div className="mt-8 bg-indigo-50 p-6 rounded-lg shadow-md">
//               <h2 className="text-2xl font-bold text-indigo-600 mb-4">
//                 Results for {ticker}
//               </h2>
//               <p className="text-gray-800">
//                 <strong>Current P/E:</strong> {peRatio}
//               </p>
//               <p className="text-gray-800">
//                 <strong>Current Revenue:</strong> {currentRevenue} Cr
//               </p>
//               <p className="text-gray-800">
//                 <strong>Estimated Revenue Growth:</strong> {revenueGrowth}%
//               </p>
//               <p className="text-gray-800">
//                 <strong>EBITDA Margin:</strong> {ebitdaMargin}%
//               </p>
//               <p className="text-gray-800">
//                 <strong>Interest Cost:</strong> ₹{interestCost} Cr
//               </p>
//               <p className="text-gray-800">
//                 <strong>PAT Margin:</strong> {patMargin}%
//               </p>
//               <p className="text-gray-800">
//                 <strong>No. of Shares Outstanding:</strong> {sharesOutstanding}{" "}
//                 Cr
//               </p>
//               <p className="text-gray-800">
//                 <strong>CMP:</strong> ₹{cmp}
//               </p>
//               <p className="text-gray-800">
//                 <strong>Forward EPS:</strong> ₹{forwardEps?.toFixed(2)}
//               </p>
//               <p className="text-gray-800">
//                 <strong>Forward P/E:</strong> {forwardPe?.toFixed(2)}
//               </p>
//               <p className="text-gray-800">
//                 <strong>PEG Ratio:</strong>{" "}
//                 {pegRatio !== null ? pegRatio.toFixed(2) : "N/A"}
//               </p>
//               <p>
//                 <a
//                   href={`https://www.screener.in/company/${ticker}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-indigo-600 underline hover:text-indigo-800">
//                   View {ticker} on Screener
//                 </a>
//               </p>
//               <p>
//                 <a
//                   href={`https://www.tradingview.com/chart/?symbol=NSE%3A${ticker}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-indigo-600 underline hover:text-indigo-800">
//                   View {ticker} on TradingView
//                 </a>
//               </p>
//             </div>
//             <button
//               onClick={() => setShowInputs(true)}
//               className="w-full py-3 mt-6 bg-indigo-600 text-white font-semibold rounded-lg focus:outline-none hover:bg-indigo-700">
//               Edit Values
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;
