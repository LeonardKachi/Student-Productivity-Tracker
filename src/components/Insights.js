import { useState, useEffect } from 'react';
import { Card, Flex, Heading, SelectField } from '@aws-amplify/ui-react';
import { Bar, Pie } from 'react-chartjs-2';
import { API } from 'aws-amplify';
import { useAuth } from './Auth';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function Insights() {
  const { userId } = useAuth();
  const [timeRange, setTimeRange] = useState('week');
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, [userId, timeRange]);

  const fetchInsights = async () => {
    setIsLoading(true);
    try {
      const response = await API.get(
        'StudentTrackerAPI',
        `/insights?userId=${userId}&range=${timeRange}`
      );
      setInsights(response);
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const activityData = {
    labels: insights?.dailyActivity?.labels || [],
    datasets: [
      {
        label: 'Entries',
        data: insights?.dailyActivity?.data || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  };

  const typeDistributionData = {
    labels: insights?.typeDistribution?.labels || [],
    datasets: [
      {
        data: insights?.typeDistribution?.data || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ]
      }
    ]
  };

  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center" className="mb-4">
        <Heading level={4}>Your Productivity Insights</Heading>
        <SelectField
          label="Time Range"
          labelHidden
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="all">All Time</option>
        </SelectField>
      </Flex>

      {isLoading ? (
        <p>Loading insights...</p>
      ) : (
        <div className="row g-4">
          <div className="col-md-8">
            <Card variation="outlined">
              <h5>Daily Activity</h5>
              <Bar
                data={activityData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top'
                    }
                  }
                }}
              />
            </Card>
          </div>
          <div className="col-md-4">
            <Card variation="outlined">
              <h5>Entry Type Distribution</h5>
              <Pie
                data={typeDistributionData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    }
                  }
                }}
              />
            </Card>
          </div>
          <div className="col-12">
            <Card variation="outlined">
              <h5>Summary</h5>
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <strong>Total Entries:</strong> {insights?.totalEntries}
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <strong>Most Active Day:</strong> {insights?.mostActiveDay}
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <strong>Last Entry:</strong>{' '}
                    {insights?.lastEntryDate || 'No entries yet'}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default Insights;