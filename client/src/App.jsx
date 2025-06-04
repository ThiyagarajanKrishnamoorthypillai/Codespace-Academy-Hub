import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
//import "./App.css";

import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from "./components/login";
import AdminLogin from "./components/AdminLogin";
import UserRegister from  "./components/UserRegister";
import UserHome from  "./components/UserHome";
import UserProfile from './components/UserProfile';
import EditUserProfile from './components/EditUserProfile';
import Index from './components/Index';
import AdminHome from './components/AdminHome';
import ViewUserAdmin from './components/ViewUserAdmin';

import ResetPassword from './components/ResetPassword';

import AdminProfile from './components/AdminProfile';
import PostQuestion from './components/PostQuestion';
import ViewQuestionAdmin from './components/ViewQuestionAdmin';
import UpdateQuestion from './components/UpdateQuestion';
import ViewQuestionUser from './components/ViewQuestionUser';
import PostAnswer from './components/PostAnswer';
import ViewAnswerUser from './components/ViewAnswerUser';
import ViewAnswerAdmin from './components/ViewAnswerAdmin';
import SelectCourse from './components/SelectCourse';
import PostFeedback from './components/PostFeedback';
import GoogleAuthProvider from './components/GoogleAuthProvider';
import ViewFeedbackUser from './components/ViewFeedbackUser';
import ViewFeedbackAdmin from './components/ViewFeedbackAdmin';
import UpdateFeedbackAdmin from './components/UpdateFeedbackAdmin';
import PostMarkAdmin from './components/PostMarkAdmin';
import ViewMarksAdmin from './components/ViewMarksAdmin';
import StartSession from './components/StartSession';
import ViewMarksUser from './components/ViewMarksUser';
import UserLayout from './components/UserLayout';
import AdminLayout from './components/AdminLayout';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
      
            <Route path='/' element={<Index />} />
            <Route path='/user_login' element={<Login />} />
            <Route path='/admin_login' element={<AdminLogin />} />
            <Route path='/user_register' element={<UserRegister />} />
            <Route path='/reset_password' element={<ResetPassword />} />
            <Route path='/select_course' element={<SelectCourse/>}/>
            <Route path='/google_auth_provider' element={<GoogleAuthProvider/>}/>
        {/* User Sub-Layout */}  
            
            

{/* Admin Sub-Layout */}  
            <Route path="update_question/:id" element={<UpdateQuestion/>}/>
            <Route path="update_feedback_admin" element={<UpdateFeedbackAdmin/>}/>
            


{/* User routes with layout */}
  <Route path="/user_home" element={<UserLayout />}>
    <Route index element={<UserDashboard />} /> 
    <Route path="view_question_user" element={<ViewQuestionUser />} />
      <Route path="post_answer" element={<PostAnswer/>}/>
<Route path="post_feedback" element={<PostFeedback/>}/>
 <Route path="user_profile" element={<UserProfile />} />   
 <Route path="view_answer_user" element={<ViewAnswerUser/>}/>
<Route path="view_feedback_user" element={<ViewFeedbackUser/>}/>
<Route path="view_marks_user" element={<ViewMarksUser/>}/>
 <Route path="edit_profile/:id" element={<EditUserProfile />} /> 

  </Route>

            
            {/* Admin routes with layout */}
  <Route path="/admin_home" element={<AdminLayout />}>
    <Route index element={<AdminDashboard />} />
    <Route path="post_question" element={<PostQuestion />} />
    <Route path="admin_profile" element={<AdminProfile />} />
             <Route path="view_question_admin" element={<ViewQuestionAdmin/>}/>

            
             <Route path="view_answer_admin" element={<ViewAnswerAdmin/>}/>
<Route path="view_feedback_admin" element={<ViewFeedbackAdmin/>}/>
<Route path="post_mark_admin" element={<PostMarkAdmin/>}/>
<Route path="view_marks_admin" element={<ViewMarksAdmin/>}/>
<Route path="start_session" element={<StartSession/>}/>
<Route path="view_user_admin" element={<ViewUserAdmin />} /> 
            <Route path="admin_profile" element={<AdminProfile />} />
           
  </Route>


          </Routes>

        </BrowserRouter>
      </div>
    );
}



export default App;

