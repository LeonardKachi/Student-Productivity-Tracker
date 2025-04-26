import { useState, useEffect } from 'react';
import { Button, Card, Flex, TextField } from '@aws-amplify/ui-react';
import { API } from 'aws-amplify';
import { useAuth } from './Auth';
import LogEntry from './LogEntry';

function Dashboard() {
  const { userId } = useAuth();
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState({
    content: '',
    type: 'log',
    blockers: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, [userId]);

  const fetchLogs = async () => {
    try {
      const response = await API.get('StudentTrackerAPI', `/logs?userId=${userId}`);
      setLogs(response.items);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('StudentTrackerAPI', '/logs', {
        body: {
          ...newLog,
          userId
        }
      });
      setNewLog({ content: '', type: 'log', blockers: '' });
      fetchLogs();
    } catch (error) {
      console.error('Error saving log:', error);
    }
  };

  return (
    <div>
      <Card variation="outlined" className="mb-4">
        <h4>Add New Entry</h4>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="1rem">
            <select
              className="form-select"
              value={newLog.type}
              onChange={(e) => setNewLog({ ...newLog, type: e.target.value })}
            >
              <option value="log">Daily Log</option>
              <option value="feedback">Feedback</option>
              <option value="blocker">Blocker</option>
            </select>

            <TextField
              label="What did you work on today?"
              placeholder="E.g., Learned about Auto Scaling and Load Balancing"
              value={newLog.content}
              onChange={(e) => setNewLog({ ...newLog, content: e.target.value })}
              required
            />

            {newLog.type === 'blocker' && (
              <TextField
                label="Blockers faced"
                placeholder="Describe any challenges you faced"
                value={newLog.blockers}
                onChange={(e) => setNewLog({ ...newLog, blockers: e.target.value })}
              />
            )}

            <Button type="submit" variation="primary" isLoading={isLoading}>
              Save Entry
            </Button>
          </Flex>
        </form>
      </Card>

      <h4 className="mb-3">Your Recent Entries</h4>
      {isLoading ? (
        <p>Loading...</p>
      ) : logs.length === 0 ? (
        <p>No entries yet. Add your first entry above!</p>
      ) : (
        <div className="d-flex flex-column gap-3">
          {logs.map((log) => (
            <LogEntry key={log.logId} log={log} onDelete={fetchLogs} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;