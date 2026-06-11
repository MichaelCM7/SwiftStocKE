import { Link } from 'react-router';
import './Analytics.css';

// --- Inline SVG Charts ---

// Donut Chart for Stock Distribution
function DonutChart() {
  // Segments: [value, color]
  const segments = [
    { value: 40, color: '#1a1a1a' },
    { value: 25, color: '#555555' },
    { value: 20, color: '#888888' },
    { value: 15, color: '#bbbbbb' },
  ];

  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const cx = 60, cy = 60, r = 48, innerR = 28;
  let cumulativeAngle = -90;

  function polarToCartesian(cx, cy, r, angleDeg) {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

  function describeSlice(cx, cy, r, innerR, startAngle, endAngle) {
    const p1 = polarToCartesian(cx, cy, r, startAngle);
    const p2 = polarToCartesian(cx, cy, r, endAngle);
    const p3 = polarToCartesian(cx, cy, innerR, endAngle);
    const p4 = polarToCartesian(cx, cy, innerR, startAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return [
      `M ${p1.x} ${p1.y}`,
      `A ${r} ${r} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
      `L ${p3.x} ${p3.y}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
      'Z',
    ].join(' ');
  }

  return (
    <svg viewBox="0 0 120 120" className="donut-chart-svg">
      {segments.map((seg, i) => {
        const sliceAngle = (seg.value / total) * 360;
        const startAngle = cumulativeAngle;
        const endAngle = cumulativeAngle + sliceAngle - 1.5;
        cumulativeAngle += sliceAngle;
        return (
          <path
            key={i}
            d={describeSlice(cx, cy, r, innerR, startAngle, endAngle)}
            fill={seg.color}
          />
        );
      })}
    </svg>
  );
}

// Line Chart for Stock Levels
function LineChart() {
  const data = [320, 280, 310, 260, 290, 340, 310, 360, 330, 380, 350, 370];
  const labels = ['Jan', 'April', 'July', 'October'];
  const yLabels = [400, 300, 200];
  const width = 340;
  const height = 130;
  const padL = 36, padR = 16, padT = 12, padB = 28;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;
  const minVal = 200, maxVal = 400;

  function xPos(i) {
    return padL + (i / (data.length - 1)) * chartW;
  }
  function yPos(val) {
    return padT + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
  }

  const points = data.map((v, i) => `${xPos(i)},${yPos(v)}`).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="line-chart-svg">
      {/* Y grid lines */}
      {yLabels.map((y) => (
        <g key={y}>
          <line
            x1={padL} y1={yPos(y)}
            x2={width - padR} y2={yPos(y)}
            stroke="#e5e5e5" strokeWidth="1"
          />
          <text x={padL - 6} y={yPos(y) + 4} textAnchor="end" fontSize="9" fill="#999">
            {y}
          </text>
        </g>
      ))}
      {/* X axis labels */}
      {labels.map((label, i) => {
        const xi = Math.round((i / (labels.length - 1)) * (data.length - 1));
        return (
          <text key={label} x={xPos(xi)} y={height - 6} textAnchor="middle" fontSize="9" fill="#999">
            {label}
          </text>
        );
      })}
      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Dots */}
      {data.map((v, i) => (
        <circle key={i} cx={xPos(i)} cy={yPos(v)} r="2.5" fill="#1a1a1a" />
      ))}
    </svg>
  );
}

// --- Main Component ---

export function Analytics() {
  const ImageIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );

  const highDemandGoods = ['Item 1', 'Item 2', 'Item 3'];
  const lowDemandGoods = ['Item 1', 'Item 2', 'Item 3'];

  const restockingItems = [
    { name: 'Soap Bar', quantity: 18, status: 'Low' },
    { name: 'Toothbrush', quantity: 12, status: 'Low' },
    { name: 'Hair Brush', quantity: 5, status: 'Low' },
  ];

  return (
    <div className="analytics-page-container">

      {/* ── Header ── */}
      <header className="analytics-header">
        <div className="analytics-header-logo">
          <ImageIcon className="analytics-header-logo-icon" />
          <span className="analytics-project-name">Project Name</span>
        </div>

        <nav className="analytics-header-nav">
          <Link to="/Analytics" className="analytics-nav-link analytics-nav-link--active">Analytics</Link>
          <Link to="/Sales" className="analytics-nav-link">Sales</Link>
          <Link to="/ManageStock" className="analytics-nav-link">Manage Stock</Link>
          <Link to="/History" className="analytics-nav-link">History</Link>
        </nav>

        <Link to="/SignIn" className="analytics-btn-logout">Log Out</Link>
      </header>

      {/* ── Page Title ── */}
      <main className="analytics-main">
        <div className="analytics-page-title">
          <h1 className="analytics-title">Analytics</h1>
          <p className="analytics-subtitle">Your Data Reimagined</p>
        </div>

        {/* ── Charts Row ── */}
        <div className="analytics-charts-row">
          <div className="analytics-card">
            <h2 className="analytics-card-title">Stock Distribution</h2>
            <div className="analytics-chart-wrapper">
              <DonutChart />
            </div>
          </div>

          <div className="analytics-card">
            <h2 className="analytics-card-title">Stock Levels</h2>
            <div className="analytics-chart-wrapper analytics-chart-wrapper--line">
              <LineChart />
            </div>
          </div>
        </div>

        {/* ── Demand Goods Row ── */}
        <div className="analytics-demand-row">
          <div className="analytics-card">
            <h2 className="analytics-card-title">High Demand Goods</h2>
            <ol className="analytics-demand-list">
              {highDemandGoods.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>

          <div className="analytics-card">
            <h2 className="analytics-card-title">Low Demand Goods</h2>
            <ol className="analytics-demand-list">
              {lowDemandGoods.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>
        </div>

        {/* ── Restocking Table ── */}
        <section className="analytics-restock-section">
          <h2 className="analytics-restock-title">Goods That Need Restocking</h2>

          <div className="analytics-table-wrapper">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Item Quantity</th>
                  <th>Stock Status</th>
                </tr>
              </thead>
              <tbody>
                {restockingItems.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <span className="analytics-status-badge analytics-status-badge--low">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="analytics-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-website-name">&lt;Website Name&gt;</span>
          </div>
          <div className="footer-links-container">
            <div className="footer-links-column">
              <Link to="/Analytics">Analytics</Link>
              <Link to="/Sales">Sales</Link>
              <Link to="/ManageStock">Manage Stock</Link>
              <Link to="/History">History</Link>
              <Link to="/SignIn">Log Out</Link>
            </div>
            <div className="footer-links-column">
              <a href="#terms">Terms and Conditions</a>
              <a href="#privacy">Privacy Policy</a>
              <a href="#cookies">Manage Cookies</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>©2026 &lt;Website Name&gt;. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}