import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/HomePage/HomePage';
import Layout from './Layout';
import PinDetails from '../components/Pins/PinDetails';
import CreatePin from '../components/Pins/CreatePin';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: '/pins/:pinId',
        element: <PinDetails />
      },
      {
        path: '/pins/new',
        element: <CreatePin />
      },
      // {
      //   path: "login",
      //   element: <LoginFormPage />,
      // },
      // {
      //   path: "signup",
      //   element: <SignupFormPage />,
      // },
      {
        path: "*",
        element: <h1>404 Not Found</h1>
      }
    ],
  },
]);
