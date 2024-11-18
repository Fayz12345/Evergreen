// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';

import TitleHeader from '../../TitleHeader';

// Helper function to load data from localStorage
const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const Dashboard = () => {
  const [tradeInHistory, setTradeInHistory] = useState([]);

  useEffect(() => {
    const history = loadFromLocalStorage('tradeInHistory');
    setTradeInHistory(history);
  }, []);

  // Group trade-ins by device name and calculate total quantity
  const tradeDataByDevice = tradeInHistory.reduce((acc, trade) => {
    const existingDevice = acc.find((item) => item.device === trade.device);
    if (existingDevice) {
      existingDevice.quantity += trade.quantity;
    } else {
      acc.push({ device: trade.device, quantity: trade.quantity });
    }
    return acc;
  }, []);

  // Prepare data for Pie Chart: Group by condition type
  const tradeDataByCondition = tradeInHistory.reduce((acc, trade) => {
    const existingCondition = acc.find((item) => item.condition === trade.condition);
    if (existingCondition) {
      existingCondition.value += trade.quantity;
    } else {
      acc.push({ condition: trade.condition, value: trade.quantity });
    }
    return acc;
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
  <>
          <TitleHeader heading="Dashboard" />

          <div className="mt-5">
            <h1 className="mb-4">Trade-In Dashboard</h1>

            <div className="row d-flex justify-content-around my-5">
              {/* Bar Chart: Trade-Ins by Device */}
              <div className="col-lg-6 bg-body-tertiary shadow border rounded p-4">
                <h2 className="text-center">Trade-Ins by Device</h2>
                <BarChart
                  width={500}
                  height={300}
                  data={tradeDataByDevice}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="device" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="quantity" fill="#8884d8" />
                </BarChart>
              </div>

              {/* Pie Chart: Trade-Ins by Condition */}
              <div className="col-lg-4 bg-body-tertiary shadow border rounded p-4">
                <h2 className="text-center">Trade-Ins by Condition</h2>
                <PieChart width={400} height={400}>
                  <Pie
                    data={tradeDataByCondition}
                    dataKey="value"
                    nameKey="condition"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label
                  >
                    {tradeDataByCondition.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </div>
          </div>
       </>
  );
};

export default Dashboard;
