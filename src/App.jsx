import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import React from 'react'
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import AddJobPage from './pages/AddJobPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage from './pages/JobPage';
import EditJobPage from './pages/EditJobPage';


const App = () => {
  // Add new Job
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob)
    });
    return;
  };

  // Delete Job
  const deleteJob = async(id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
      headers: {
       'Content-Type': 'application/json', 
      },
    });
    return;
  };

  // Edit Job
  const editJob = async (id, job) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });
    } catch (error) {
      console.log('Error editing job', error);
    } finally {
      return 
    }
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage/>} />
        <Route path='/jobs' element={<JobsPage/>} />
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob}/>} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />}/>
        <Route path='edit-job/:id' element={<EditJobPage updateJobSubmit={editJob} />}/>
        <Route path='*' element={<NotFoundPage/>} />
      </Route>
    )
  );

  return <RouterProvider router={router}/>;
}

export default App