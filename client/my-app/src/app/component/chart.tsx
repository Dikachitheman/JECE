"use client"
import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

// Mock data
const mockData = {
  'Monday': 120,
  'Tuesday': 150,
  'Wednesday': 200,
  'Thursday': 180,
  'Friday': 250,
  'Saturday': 300,
  'Sunday': 220
};

const RadarChartComponent = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    setChartData(mockData);
  }, []);

  useEffect(() => {
    if (chartContainer.current && chartData) {
      const labels = Object.keys(chartData);
      const data = Object.values(chartData);

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartContainer.current, {
        type: 'radar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Weekly Earnings',
              data: data,
              backgroundColor: 'rgba(29, 155, 240, 0.2)',
              borderColor: '#1D9BF0',
              borderWidth: 2,
              pointBackgroundColor: '#1D9BF0',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#1D9BF0'
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              beginAtZero: true,
              ticks: {
                callback: (value) => `$${value}`
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'Weekly Earnings (Radar Chart)'
            }
          }
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  return <canvas ref={chartContainer} />;
};

const LineChartComponent = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    setChartData(mockData);
  }, []);

  useEffect(() => {
    if (chartContainer.current && chartData) {
      const labels = Object.keys(chartData);
      const data = Object.values(chartData);

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartContainer.current, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Weekly Earnings',
              data: data,
              backgroundColor: 'rgba(29, 155, 240, 0.2)',
              borderColor: '#1D9BF0',
              borderWidth: 2,
              fill: true,
              tension: 0.4
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Earnings ($)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Day of Week'
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'Weekly Earnings (Line Chart)'
            }
          }
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  return <canvas ref={chartContainer} />;
};


const ChartComponent = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState(null);

  // Mock data
  const mockData = {
    'Monday': 120,
    'Tuesday': 150,
    'Wednesday': 200,
    'Thursday': 180,
    'Friday': 250,
    'Saturday': 300,
    'Sunday': 220
  };

  useEffect(() => {
    // Set the mock data
    setChartData(mockData);
  }, []);

  useEffect(() => {
    if (chartContainer.current && chartData) {
      const labels = Object.keys(chartData);
      const data = Object.values(chartData);

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartContainer.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Total Earnings',
              data: data,
              backgroundColor: '#1D9BF0',
              borderColor: '#1D9BF0',
              borderWidth: 1,
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Earnings ($)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Day of Week'
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'Weekly Earnings'
            }
          }
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  useEffect(() => {
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={chartContainer} />;
};

export { RadarChartComponent, LineChartComponent, ChartComponent };

            //   {/* <div>
            //   <h3>Stats</h3>
            //   <p>Projects Managed: {stats.projectsManaged}</p>
            //   <p>Ongoing Projects: {stats.ongoingProjects}</p>
            //   <p>Completed Projects: {stats.completedProjects}</p>
            //   <p>Pending Requests: {stats.pendingRequests}</p>
            //   <p>Revenue: {stats.revenue}</p>
            //   </div> */}

