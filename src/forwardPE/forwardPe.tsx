import { useState } from 'react';
import './styles.css'

interface CalculatedValues {
  estimatedRevenue: number;
  ebitda: number;
  pat: number;
  forwardEps: number;
  forwardPe: number;
}

function ForwardPe() {
  const [ticker, setTicker] = useState('');
  const [currentPE, setCurrentPE] = useState(0);
  const [currentRevenue, setCurrentRevenue] = useState(0);
  const [revenueGrowth, setRevenueGrowth] = useState(0);
  const [ebitdaMargin, setEbitdaMargin] = useState(0);
  const [interestCost, setInterestCost] = useState(0);
  const [patMargin, setPatMargin] = useState(0);
  const [totalShares, setTotalShares] = useState(0);
  const [cmp, setCmp] = useState(0);
  const [calculatedValues, setCalculatedValues] = useState<CalculatedValues | null>(null);

  const calculateForwardPE = () => {
    const estimatedRevenue = currentRevenue * (1 + revenueGrowth / 100);
    const ebitda = estimatedRevenue * (ebitdaMargin / 100);
    const pat = estimatedRevenue * (patMargin / 100) - interestCost;
    const forwardEps = pat / totalShares;
    const forwardPe = cmp / forwardEps;

    setCalculatedValues({
      estimatedRevenue,
      ebitda,
      pat,
      forwardEps,
      forwardPe
    });
  };

  return (
    <div>
      <div className="calculator-container">
        <h2>Forward P/E Calculator</h2>
        
        <div className="input-group">
          <label>Company Ticker (NSE):</label>
          <input type="text" value={ticker} onChange={(e) => setTicker(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Current P/E:</label>
          <input type="number" value={currentPE} onChange={(e) => setCurrentPE(Number(e.target.value))} />
        </div>

        <div className="input-group">
          <label>Current Revenue (in Cr ₹):</label>
          <input type="number" value={currentRevenue} onChange={(e) => setCurrentRevenue(Number(e.target.value))} />
        </div>

        <div className="input-group">
          <label>Estimated Revenue Growth (%):</label>
          <input type="number" value={revenueGrowth} onChange={(e) => setRevenueGrowth(Number(e.target.value))} />
        </div>

        <div className="input-group">
          <label>EBITDA Margin (%):</label>
          <input type="number" value={ebitdaMargin} onChange={(e) => setEbitdaMargin(Number(e.target.value))} />
        </div>

        <div className="input-group">
          <label>Interest Cost (in Cr ₹):</label>
          <input type="number" value={interestCost} onChange={(e) => setInterestCost(Number(e.target.value))} />
        </div>

        <div className="input-group">
          <label>PAT Margin (%):</label>
          <input type="number" value={patMargin} onChange={(e) => setPatMargin(Number(e.target.value))} />
        </div>

        <div className="input-group">
          <label>Total Shares (in Cr):</label>
          <input type="number" value={totalShares} onChange={(e) => setTotalShares(Number(e.target.value))} />
        </div>

        <div className="input-group">
          <label>Current Market Price (₹):</label>
          <input type="number" value={cmp} onChange={(e) => setCmp(Number(e.target.value))} />
        </div>

        <button onClick={calculateForwardPE}>Calculate</button>

        {calculatedValues && (
          <div className="results">
            <h3>Results:</h3>
            <p>Estimated Revenue: ₹{calculatedValues.estimatedRevenue.toFixed(2)} Cr</p>
            <p>EBITDA: ₹{calculatedValues.ebitda.toFixed(2)} Cr</p>
            <p>PAT: ₹{calculatedValues.pat.toFixed(2)} Cr</p>
            <p>Forward EPS: ₹{calculatedValues.forwardEps.toFixed(2)}</p>
            <p>Forward P/E: {calculatedValues.forwardPe.toFixed(2)}x</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForwardPe