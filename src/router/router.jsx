import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/RootLayout.jsx";
import AuthPage from "../pages/auth/AuthPage.jsx";
import DashboardPage from "../pages/analytical-dashboard/DashboardPage.jsx";
import AttendanceAssessmentsPage from "../pages/attendance-assessments/AttendanceAssessmentsPage.jsx";
import ContributorProfilePage from "../pages/contributor-profile/ContributorProfilePage.jsx";
import CourseCatalogPage from "../pages/course-catalog/CourseCatalogPage.jsx";
import InternalComunicationsPage from "../pages/internal-comunications/InternalComunicationsPage.jsx";
import RegistrationManagementPage from "../pages/registration-management/RegistrationManagementPage.jsx";
import {attendanceAssessmentsLoader,courseCatalogLoader,dashboardLoader,indexRedirectLoader,internalComunicationsLoader,registrationManagementLoader,requireAnonLoader,requireSessionLoader,} from "./loaders.js";
import RegistrationProcessPage from "../pages/registration-management/RegistrationProcessPage.jsx";
import RegistrationConfirmationPage from "../pages/registration-management/RegistrationConfirmationPage.jsx";

export const router = createBrowserRouter([
  { path: "/", loader: indexRedirectLoader },
  { path: "/auth", loader: requireAnonLoader, element: <AuthPage /> },
  {
    id: "root",
    loader: requireSessionLoader,
    element: <RootLayout />,
    children: [
      { path: "/dashboard", loader: dashboardLoader, element: <DashboardPage /> },
      { path: "/course-catalog", loader: courseCatalogLoader, element: <CourseCatalogPage /> },
      {
        path: "/registration-management",
        loader: registrationManagementLoader,
        element: <RegistrationManagementPage />,
      },
      { 
        path: "/registration-management/:id/process", 
        loader: courseCatalogLoader,
        element: <RegistrationProcessPage /> 
      },
      { 
        path: "/registration-management/success", 
        element: <RegistrationConfirmationPage /> 
      },
      {
        path: "/attendance-assessments",
        loader: attendanceAssessmentsLoader,
        element: <AttendanceAssessmentsPage />,
      },
      {
        path: "/internal-comunications",
        loader: internalComunicationsLoader,
        element: <InternalComunicationsPage />,
      },
      { path: "/contributor-profile", element: <ContributorProfilePage /> },
    ],
  },
]);
