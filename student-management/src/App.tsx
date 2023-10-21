
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login, Home } from '@mui/icons-material';
import RequireAuth from './pages/RequireAuth';
import SignIn from './pages/SignIn';
import StudentManagement from './pages/StudentManagement';
import Layout from './pages/Layout';
import DefaultLayout from './containers/DefaultLayout';
import TeacherManagement from './pages/TeacherManagement';
import GradeManagement from './pages/GradeManagement';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import useAuth from './hooks/useAuth';
import AttendanceManagement from './pages/AttendanceManagement';
import AttendanceView from './pages/AttendanceView';
import GradeView from './pages/GradeView';
import TeacherView from './pages/Teacherview';

export const ROLES = {
  student: 'student',
  teacher: 'teacher',
  principal: 'principal'
}




function App() {

  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<SignIn />} />
    
        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.principal,ROLES.teacher, ROLES.student]} />}>
          <Route path="/" element={<DefaultLayout  ><Home /></DefaultLayout>} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.principal]}  />}>
         
          <Route path="/teachers" element={<DefaultLayout  ><TeacherManagement /></DefaultLayout>} />
          <Route path="/grades" element={<DefaultLayout  ><GradeManagement /></DefaultLayout>} />
       
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.teacher, ROLES.principal]}  />}>
          <Route path="/students" element={<DefaultLayout  ><StudentManagement /></DefaultLayout>} />
          <Route path="/attendances" element={<DefaultLayout  ><AttendanceManagement /></DefaultLayout>} />
       
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.student]}  />}>
          <Route path="/students" element={<DefaultLayout  ><StudentManagement /></DefaultLayout>} />
          <Route path="/attendancesview" element={<DefaultLayout  ><AttendanceView /></DefaultLayout>} />
          <Route path="/gradesview" element={<DefaultLayout  ><GradeView /></DefaultLayout>} />
          <Route path="/teachersview" element={<DefaultLayout  ><TeacherView /></DefaultLayout>} />
       
        </Route>
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route> */}

        {/* catch all */}
        {/* <Route path="*" element={<Missing />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
