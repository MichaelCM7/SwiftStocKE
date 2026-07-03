import { Link } from 'react-router';
import { Pagination } from '../../components/Pagination/Pagination';
import './Analytics.css';
import dayjs from 'dayjs';
import axios from 'axios';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function DynamicDonutChart({ products }) {
  // 1. Group items by their stock status from your database
  const lowStockCount = products.filter(product => product.status === 'Low Stock').length;
  const outOfStockCount = products.filter(product => product.status === 'Out of Stock').length;
  const moderateStockCount = products.filter(product => product.status === 'Moderate Stock').length;
  const goodStockCount = products.filter(product => product.status === 'Good Stock').length;

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

function LineChart({ data, labels }) {
  const formattedLabels = labels.map((isoString) =>
    dayjs(isoString).format('DD/MM HH:mm')
  );

  const chartData = {
    labels: formattedLabels, // Uses the freshly formatted dates on X-axis
    datasets: [
      {
        label: 'Total Stock',
        data: data,           // Map your raw primitive numbers [682, 680] here
        borderColor: '#2563eb',
        backgroundColor: '#2563eb',
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 6,
        tension: 0.15,        // Elegant, minimal curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows fill-to-fit inside .analytics-chart-wrapper
    plugins: {
      legend: {
        display: false,        // Hides generic dataset box for a cleaner dashboard look
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,      // Clean dashboard; no vertical bars
        },
        ticks: {
          color: '#94a3b8',
          font: { size: 10 },
        },
      },
      y: {
        beginAtZero: false,    // Set to false if you want the chart to zoom in closer to fluctuations (e.g., between 680 and 682)
        grid: {
          color: '#e2e8f0',    // Your standard subtle border divider style
        },
        ticks: {
          color: '#94a3b8',
          font: { size: 10 },
        },
      },
    },
  };

  return (
    // Component drops perfectly into your CSS flex framework grid
    <div style={{ width: '100%', height: '100%', minHeight: '130px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export function Analytics({ isAuthorized, setIsAuthorized }) {
  const [rawProducts, setRawProducts] = useState([]);
  const [highDemandGoods, setHighDemandGoods] = useState([]);
  const [lowDemandGoods, setLowDemandGoods] = useState([]);
  const [restockingItems, setRestockingItems] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const graphValues = [];
  const graphLabels = [];

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

  async function fetchPieChartData() {
    try {
      const response = await axios.get('/api/products/get-items');
      const data = response.data.products;

      if (data) {
        const allProducts = data;
        setRawProducts(allProducts);

        const sortedHigh = [...allProducts]
          .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
          .slice(0, 5);

        const sortedLow = [...allProducts]
          .sort((a, b) => (a.salesCount || 0) - (b.salesCount || 0))
          .slice(0, 5);

        const needsRestock = allProducts.filter(
          (item) => item.status === 'Low Stock' || item.status === 'Out of Stock'
        );

        setHighDemandGoods(sortedHigh);
        setLowDemandGoods(sortedLow);
        setRestockingItems(needsRestock);
      }
    } catch (error) {
      console.error("Error communicating with data servers:", error);
    }
  }

  async function fetchLineChartData() {
    try {
      const response = await axios.get('/api/analytics/');
      const data = response.data.analytics[0].data;
      setGraphData(data);
    } catch (error) {
      console.error("Error communicating with data servers:", error);
    }
  }

  useEffect(() => {
    setIsAuthorized(true);
    fetchPieChartData();
    fetchLineChartData();
  }, [setIsAuthorized]);

  graphData.forEach(item => {
    graphValues.push(item.totalQuantity);
    graphLabels.push(item.dateTime);
  });

  const statusClass = {
    "Low Stock": "analytics-status-badge--low",
    "Out of Stock": "analytics-status-badge--out",
    "Moderate Stock": "analytics-status-badge--moderate",
    "Good Stock": "analytics-status-badge--good",
  };

  return (
    <div className="analytics-page-container">
      <Header isAuthorized={isAuthorized} />

      <main className="analytics-main">
        <div className="analytics-page-title">
          <h1 className="analytics-title" data-testid="analytics-title">Analytics</h1>
        </div>

        {/* Charts Row */}
        <div className="analytics-charts-row">
          <div className="analytics-card">
            <h2 className="analytics-card-title" data-testid="distribution-title">Stock Distribution</h2>
            <div className="analytics-chart-wrapper">
              <DynamicDonutChart products={rawProducts} />
            </div>
          </div>

          <div className="analytics-card">
            <h2 className="analytics-card-title" data-testid="levels-title">Stock Levels</h2>
            <div className="analytics-chart-wrapper analytics-chart-wrapper--line">
              <LineChart data={graphValues} labels={graphLabels} />
            </div>
          </div>
        </div>

        {/* Demand Row */}
        <div className="analytics-demand-row">
          <div className="analytics-card">
            <h2 className="analytics-card-title" data-testid="high-demand-title">High Demand Items</h2>
            <ol className="analytics-demand-list">
              {highDemandGoods.map((item) => (
                <li key={item._id}>
                  {item.itemName} <strong style={{ float: 'right', color: '#2563eb' }}>{item.salesCount} sold</strong>
                </li>
              ))}
            </ol>
          </div>

          <div className="analytics-card">
            <h2 className="analytics-card-title" data-testid="low-demand-title">Low Demand Items</h2>
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
          <h2 className="analytics-restock-title" data-testid="restock-title">Items That Need Restocking</h2>

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