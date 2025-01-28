import { MdOutlineEventNote } from 'react-icons/md'
import GoogleButton from '../component/GoogleButton'
import TaskListView from '../component/TaskListView'
import "firebase/auth";
import { auth, signInWithGooglePopup } from '../config/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';



function Home() {
  const context = useAuth();
  const [user] = useAuthState(auth);

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(`response from firebase:- ${JSON.stringify(response)}`);
    //@ts-ignore
    const accessToken = response?.user?.accessToken
    // console.log(response.user.email);
    console.log(`${response.user.uid}: ${response.user.displayName}: ${response.user.email}: ${response.user.photoURL}: ${response?.user?.accessToken}`);
    const data = {
      uid: response.user.uid,
      displayName: response.user.displayName,
      email: response.user.email,
      photoUrl: response.user.photoURL,
      accessToken,
    }
    console.log(`accesstoken:- ${context.authData.accessToken}`);
    console.log(`accessToken:- ${accessToken}`);
    if (accessToken) {
      await axios.post(`http://localhost:5000/api/v1/auth/verify`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )
        .then((response) => {
          console.log(response.data);
        })
    }
  }

  console.log(`accesstoken:- ${context.authData.accessToken}`);


  const navigate = useNavigate();

  // console.log(user?.getIdToken);

  // console.log(`user:- ${JSON.stringify(user)}`);
  if (user?.emailVerified) {
    navigate('/taskListView')
  } else {
    navigate('/')
  }
  // const handleLogout = () => {
  //   auth.signOut();
  // }

  return (
    <div className="bg-[#FFF9F9] w-full h-screen">
      <div className="flex">
        <div className="flex flex-col w-1/2 pl-20 pt-56 gap-4 h-[167.31px] ">
          <div className="flex">
            <div className="flex items-center">
              <MdOutlineEventNote size={'25px'} />
            </div>
            <div className="h1 h-[37px] text-2xl w-[131px]">Task buddy</div>
          </div>
          <div className="w-[294.61px] h-[32px] ">Streamline your workflow and track progress effortlessly and with our all-in-one task management app</div>
          <div className="mt-8" onClick={logGoogleUser}>
            <GoogleButton />
          </div>
        </div>
        <div className="relative w-1/2">
          <TaskListView />
        </div>
      </div>
    </div>
  )
}

export default Home;