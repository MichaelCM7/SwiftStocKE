import { Link } from 'react-router';
import { Pagination } from '../../components/Pagination/Pagination';
import './Analytics.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function DynamicDonutChart({ products }) {
  // 1. Group items by their stock status from your database
  const lowStockCount = products.filter(p => p.status === 'Low Stock').length;
  const outOfStockCount = products.filter(p => p.status === 'Out of Stock').length;
  const moderateStockCount = products.filter(p => p.status === 'Moderate Stock').length;
  const goodStockCount = products.filter(p => p.status === 'Good Stock').length;

  // 2. Wrap counts into the expected Chart.js structural object
  const chartData = {
    labels: ['Good Stock', 'Moderate Stock', 'Low Stock', 'Out of Stock'],
    datasets: [
      {
        data: [goodStockCount, moderateStockCount, lowStockCount, outOfStockCount],
        backgroundColor: ['#0eb94cff', '#ffa601ff', '#face86ff', '#ef4444'], // Custom alert colors
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom', // Positions labels underneath the donut
      },
    },
  };

  return (
    <div style={{ height: '220px', width: '100%' }}>
      <Doughnut data={chartData} options={options} />
    </div>
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
      {yLabels.map((y) => (
        <g key={y}>
          <line
            x1={padL} y1={yPos(y)}
            x2={width - padR} y2={yPos(y)}
            stroke="#e2e8f0" strokeWidth="1"
          />
          <text x={padL - 6} y={yPos(y) + 4} textAnchor="end" fontSize="9" fill="#94a3b8">
            {y}
          </text>
        </g>
      ))}
      {labels.map((label, i) => {
        const xi = Math.round((i / (labels.length - 1)) * (data.length - 1));
        return (
          <text key={label} x={xPos(xi)} y={height - 6} textAnchor="middle" fontSize="9" fill="#94a3b8">
            {label}
          </text>
        );
      })}
      <polyline
        points={points}
        fill="none"
        stroke="#2563eb"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {data.map((v, i) => (
        <circle key={i} cx={xPos(i)} cy={yPos(v)} r="2.5" fill="#2563eb" />
      ))}
    </svg>
  );
}

// --- Main Component ---
export function Analytics({ isAuthorized, setIsAuthorized }) {
  const [rawProducts, setRawProducts] = useState([]);
  const [highDemandGoods, setHighDemandGoods] = useState([]);
  const [lowDemandGoods, setLowDemandGoods] = useState([]);
  const [restockingItems, setRestockingItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [startIndex, setStartIndex] = useState(itemsPerPage * (currentPage - 1));
  const [endIndex, setEndIndex] = useState(itemsPerPage * currentPage);

  useEffect(() => {
    const newStartIndex = itemsPerPage * (currentPage - 1);
    const newEndIndex = itemsPerPage * currentPage;
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  }, [currentPage]);

  const currentRestockingItems = restockingItems.slice(startIndex, endIndex);

  useEffect(() => {
    setIsAuthorized(true);

    async function fetchAnalytics() {
      try {
        const response = await fetch('/api/products/get-items');
        const data = await response.json();

        if (data.success && data.products) {
          const allProducts = data.products;
          setRawProducts(allProducts);

          // High Demand: Sorted by salesCount descending
          const sortedHigh = [...allProducts]
            .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
            .slice(0, 5);

          // Low Demand: Sorted by salesCount ascending
          const sortedLow = [...allProducts]
            .sort((a, b) => (a.salesCount || 0) - (b.salesCount || 0))
            .slice(0, 5);

          // Restocking Items: Filtered by low/out-of-stock statuses
          const needsRestock = allProducts.filter(
            (item) => item.status === 'Low Stock' || item.status === 'Out of Stock'
          );

          setHighDemandGoods(sortedHigh);
          setLowDemandGoods(sortedLow);
          setRestockingItems(needsRestock);
        }
      } catch (error) {
        console.error("Error communicating with data servers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, [setIsAuthorized]);

  const statusClass = {
    "Low Stock": "analytics-status-badge--low",
    "Out of Stock": "analytics-status-badge--out",
    "Moderate Stock": "analytics-status-badge--moderate",
    "Good Stock": "analytics-status-badge--good",
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading insights...</div>;
  }

  return (
    <div className="analytics-page-container">
      <Header isAuthorized={isAuthorized} />

      <main className="analytics-main">
        <div className="analytics-page-title">
          <h1 className="analytics-title">Analytics</h1>
        </div>

        {/* Charts Row */}
        <div className="analytics-charts-row">
          <div className="analytics-card">
            <h2 className="analytics-card-title">Stock Distribution</h2>
            <div className="analytics-chart-wrapper">
              {/* SWAPPED: Passing our live product state into our new component */}
              <DynamicDonutChart products={rawProducts} />
            </div>
          </div>

          <div className="analytics-card">
            <h2 className="analytics-card-title">Stock Levels</h2>
            <div className="analytics-chart-wrapper analytics-chart-wrapper--line">
              <LineChart />
            </div>
          </div>
        </div>

        {/* Demand Row */}
        <div className="analytics-demand-row">
          <div className="analytics-card">
            <h2 className="analytics-card-title">High Demand Items</h2>
            <ol className="analytics-demand-list">
              {highDemandGoods.map((item) => (
                <li key={item._id}>
                  {item.itemName} <strong style={{ float: 'right', color: '#2563eb' }}>{item.salesCount} sold</strong>
                </li>
              ))}
            </ol>
          </div>

          <div className="analytics-card">
            <h2 className="analytics-card-title">Low Demand Items</h2>
            <ol className="analytics-demand-list">
              {lowDemandGoods.map((item) => (
                <li key={item._id}>
                  {item.itemName} <span style={{ float: 'right', color: '#94a3b8' }}>{item.salesCount} sold</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Restocking Table */}
        <section className="analytics-restock-section">
          <h2 className="analytics-restock-title">Items That Need Restocking</h2>

          <div className="analytics-table-wrapper">
            <div className="table-responsive">
              <table className="analytics-table">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Item Quantity</th>
                    <th>Stock Status</th>
                  </tr>
                </thead>
                <tbody>
                  {restockingItems.length === 0 ? (
                    <tr><td colSpan="3" style={{ textAlign: 'center' }}>All stock levels healthy!</td></tr>
                  ) : (
                    currentRestockingItems.map((item) => (
                      <tr key={item._id}>
                        <td>{item.itemName}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <span className={`analytics-status-badge ${statusClass[item.status] || 'analytics-status-badge--good'}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {restockingItems.length > 0 && (
              <Pagination
                data={restockingItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </section>
      </main>

      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}