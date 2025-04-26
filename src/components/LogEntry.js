import { Button, Card, Flex, Text } from '@aws-amplify/ui-react';
import { format } from 'date-fns';
import { API } from 'aws-amplify';

function LogEntry({ log, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await API.del('StudentTrackerAPI', `/logs/${log.logId}`);
      onDelete();
    } catch (error) {
      console.error('Error deleting log:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card variation="elevated">
      <Flex direction="column" gap="0.5rem">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold" textTransform="capitalize">
            {log.type}
          </Text>
          <Text fontSize="small" color="neutral.80">
            {format(new Date(log.createdAt), 'MMM dd, yyyy h:mm a')}
          </Text>
        </Flex>

        <Text>{log.content}</Text>

        {log.blockers && (
          <div className="mt-2">
            <Text fontWeight="bold">Blockers:</Text>
            <Text>{log.blockers}</Text>
          </div>
        )}

        <Flex justifyContent="flex-end">
          <Button
            variation="destructive"
            size="small"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}

export default LogEntry;