import Home from "../component/main/home";
import Login from "../component/login/Login";
import School from "../component/main/school";
import ErrorPage from "../component/404";
import Wechat from '../component/WeChat'
import RetrievePassword from '../component/retrievePassword'


import { recreationCenter } from "../component/RecreationCenter/";
import Audio from '../component/RecreationCenter/audio';
import Video from '../component/RecreationCenter/video';

import Person from "../component/person";
import PersonUserInformation from '../component/person/userInformation';
import Resume from '../component/person/resume';
import manageResume from '../component/person/manageResume'
import JobPreference from '../component/person/preference'
import JobRecommendation from '../component/person/recommendation'

import Enterprise from "../component/enterprise";
import UserInformation from '../component/enterprise/userInformation'
import Job from '../component/enterprise/job'
import ManageJob from '../component/enterprise/manageJob'
import Preference from '../component/enterprise/preference'
import ResumeRecommendation from '../component/enterprise/recommendation'

import RegisterPerson from "../component/register/Person";
import RegisterEnterprise from "../component/register/Enterprise";

import Admin from "../component/admin";
import AdminPower from '../component/admin/adminPower';
import PersonAssess from '../component/admin/person/assessment';
import EnterpriseAssess from '../component/admin/enterprise/assessment';
import PersonAccount from '../component/admin/person/account';
import EnterpriseAccount from '../component/admin/enterprise/account'


export const primaryRouterConfig = [
  {
    path: "/",
    component: Home,
    auth: false
  },
  {
    path: "/home",
    component: Home,
    auth: false
  },
  {
    path: "/recreationCenter",
    component: recreationCenter,
  }, {
    path: "/recreationCenter/video",
    component: Video,
  }, {
    path: "/recreationCenter/music",
    component: Audio,
  },
  {
    path: "/school",
    component: School,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/retrievePassword",
    component: RetrievePassword,
  },
  {
    path: "/wechat",
    component: Wechat,
    auth: true,
  },
  {
    path: "/404",
    component: ErrorPage
  },
  {
    path: "/registerPerson",
    component: RegisterPerson,
    auth: false
  },
  {
    path: "/registerEnterprise",
    component: RegisterEnterprise,
    auth: false
  },
  {
    path: "/person",
    component: Person,
    auth: true,
    type:'person'
  }, {
    path: "/person/userInformation",
    component: PersonUserInformation,
    auth: true,
    type:'person'
  }, {
    path: "/person/resume",
    component: Resume,
    auth: true,
    type:'person'
  }, {
    path: "/person/manageResume",
    component: manageResume,
    auth: true,
    type:'person'
  }, {
    path: "/person/preference",
    component: JobPreference,
    auth: true,
    type:'person'
  }, {
    path: "/person/recommendation",
    component: JobRecommendation,
    auth: true,
    type:'person'
  },
  {
    path: "/enterprise",
    component: Enterprise,
    auth: true,
    type:'enterprise'
  }, {
    path: "/enterprise/userInformation",
    component: UserInformation,
    auth: true,
    type:'enterprise'
  }, {
    path: "/enterprise/job",
    component: Job,
    auth: true,
    type:'enterprise'
  }, {
    path: "/enterprise/manageJob",
    component: ManageJob,
    auth: true,
    type:'enterprise'
  }, {
    path: "/enterprise/recommendation",
    component: ResumeRecommendation,
    auth: true,
    type:'enterprise'
  }, {
    path: "/enterprise/preference",
    component: Preference,
    auth: true,
    type:'enterprise'
  },
  {
    path: "/admin",
    component: Admin,
    auth: true,
    type:'admin'
  }, {
    path: "/admin/userInformation",
    component: AdminPower,
    auth: true,
    type:'admin'
  }, {
    path: "/admin/personAssess",
    component: PersonAssess,
    auth: true,
    type:'admin'
  }, {
    path: "/admin/personAccount",
    component: PersonAccount,
    auth: true,
    type:'admin'
  }, {
    path: "/admin/enterpriseAssess",
    component: EnterpriseAssess,
    auth: true,
    type:'admin'
  }, {
    path: "/admin/enterpriseAccount",
    component: EnterpriseAccount,
    auth: true,
    type:'admin'
  }
];


