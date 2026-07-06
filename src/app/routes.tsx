import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Jobs } from "./pages/Jobs";
import { JobDetail } from "./pages/JobDetail";
import { Campaign } from "./pages/Campaign";
import { CampaignDetail } from "./pages/CampaignDetail";
import { Saved } from "./pages/Saved";
import { Profile } from "./pages/Profile";
import { ProfileEdit } from "./pages/ProfileEdit";
import { Register } from "./pages/Register";
import { School } from "./pages/School";
import { SchoolArticleDetail } from "./pages/SchoolArticleDetail";
import { Timetable } from "./pages/Timetable";
import { TimetableClassDetail } from "./pages/TimetableClassDetail";
import { Activities } from "./pages/Activities";
import { GroupDetail } from "./pages/GroupDetail";
import { Connect } from "./pages/Connect";
import { Sponsors } from "./pages/Sponsors";
import { Hospitals } from "./pages/Hospitals";
import { HospitalDetail } from "./pages/HospitalDetail";
import { ExamPrep } from "./pages/ExamPrep";
import { Articles } from "./pages/Articles";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <School /> },
      { path: "jobs", element: <Jobs /> },
      { path: "jobs/:id", element: <JobDetail /> },
      { path: "school", element: <School /> },
      { path: "school/timetable", element: <Timetable /> },
      { path: "school/timetable/:id", element: <TimetableClassDetail /> },
      { path: "school/articles/:id", element: <SchoolArticleDetail /> },
      { path: "hospitals", element: <Hospitals /> },
      { path: "hospitals/:id", element: <HospitalDetail /> },
      { path: "exam-prep", element: <ExamPrep /> },
      { path: "articles", element: <Articles /> },
      { path: "activities", element: <Activities /> },
      { path: "activities/groups/:id", element: <GroupDetail /> },
      { path: "activities/study-abroad/:id", element: <SchoolArticleDetail /> },
      { path: "activities/articles/:id", element: <SchoolArticleDetail /> },
      { path: "connect", element: <Connect /> },
      { path: "sponsors", element: <Sponsors /> },
      { path: "sponsors/:id", element: <Campaign /> },
      { path: "campaign", element: <Campaign /> },
      { path: "campaign/:id", element: <CampaignDetail /> },
      { path: "saved", element: <Saved /> },
      { path: "profile", element: <Profile /> },
      { path: "profile/edit", element: <ProfileEdit /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);