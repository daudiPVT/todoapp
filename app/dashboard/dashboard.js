import { useSession } from 'next-auth/react';
//import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// const fetchTasks = async () => {
//   const res = await fetch('/api/tasks');
//   const data = await res.json();
//   return data;
// };

const data=[]

const Dashboard = () => {
  const { data: session } = useSession();
  const { data: tasks, error, isLoading } = useQuery('tasks', fetchTasks);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading tasks.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Task Dashboard</h1>
      <button
        onClick={() => router.push('/edit/new')}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
      >
        Add New Task
      </button>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p>{task.description}</p>
            <div className="mt-2">
              <button
                onClick={() => router.push(`/edit/${task.id}`)}
                className="bg-yellow-500 text-white py-1 px-3 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => alert('Delete task functionality to be implemented')}
                className="bg-red-500 text-white py-1 px-3 rounded-lg ml-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
