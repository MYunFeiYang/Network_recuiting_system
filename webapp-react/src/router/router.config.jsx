import Login from "../component/login/Login";
import Audio from "../component/audio";
import Video from "../component/video";
import Home from "../component/main/home";
import Person from "../component/person";
import Enterprise from "../component/enterprise";
import RegisterPerson from "../component/register/Person";
import RegisterEnterprise from "../component/register/Enterprise";
import Admin from "../component/admin";
import School from "../component/main/school";
import ErrorPage from "../component/404";


const routerConfig = [
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
    path: "/music",
    component: Audio,
    auth: true
  },
  {
    path: "/video",
    component: Video,
    auth: true
  },
  {
    path: "/school",
    component: School,
    auth: true
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/404",
    component: ErrorPage
  },
  {
    path: "/register/person",
    component: RegisterPerson,
    auth: false
  },
  {
    path: "/register/enterprise",
    component: RegisterEnterprise,
    auth: false
  },
  {
    path: "/person",
    component: Person,
    auth: true
  },
  {
    path: "/enterprise",
    component: Enterprise,
    auth: true
  },
  {
    path: "/admin",
    component: Admin,
    auth: true
  }
];

export default routerConfig;
