import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import Layout from './Layout';
import PinDetails from '../components/Pins/PinDetails';
import ManagePins from '../components/Pins/ManagePins';
import PinForm from '../components/Pins/PinForm';
import { pinLoader } from './pin';
import BoardForm from '../components/Board/BoardForm';
import { boardLoader } from './boardLoader';
import UserProfile from '../components/UserProfile/UserProfile';


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
      // {
      //   path: '/pins/new',
      //   element: <CreatePin />
      // },
      {
        path: '/pins/new',
        element: <PinForm />,
        action: pinLoader
      },
      {
        path: '/boards/new',
        element: <BoardForm />,
        action: boardLoader
      },
      {
        path: '/user/pins',
        element: <ManagePins />
      },
      {
        path: '/user/current',
        element: <UserProfile/>
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
