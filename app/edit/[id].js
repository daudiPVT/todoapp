import { useRouter } from 'next/router';
import { useQuery, useMutation } from 'react-query';
import { useState, useEffect } from 'react';

const fetchTask = async (id) => {
  const res = await fetch(`/api/tasks/${id}`);
  const data = await res.json();
  return data;
};

const updateTask = async (id, task) => {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};

const EditTask = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: task, isLoading, error } = useQuery(['task', id], () => fetchTask(id), {
    enabled: !!id,
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const mutation = useMutation(updateTask, {
    onSuccess: () => {
      router.push('/dashboard');
    },
  });

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ id, task: { title, description } });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading task.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
