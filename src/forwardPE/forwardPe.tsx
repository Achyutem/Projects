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
