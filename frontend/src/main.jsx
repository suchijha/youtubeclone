import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import {Provider} from "react-redux"
import './index.css'
import App from './App.jsx'
import Welcome from './page/Welcome.jsx'
import Login from './page/Login.jsx'
import Store from './State/store.js'
import Signup from './page/Signupt.jsx'
import CreateChannel from './page/CreateChannel.jsx'
import ChannelPage from './page/ChannelPage.jsx'
import MyChannelPage from './page/MyChannelPage.jsx'
import UploadVideoPage from './page/UploadVideoPage.jsx'
import VideoPage from './page/VideoPage.jsx'





const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Welcome/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/signup",
        element:<Signup/>
      },
      {
        path:'/createchannel',
        element:<CreateChannel/>
      },
      {
        path:'/mychannel',
        element:<MyChannelPage/>
      },
      {
         path:"/uploadvideo",
         element:<UploadVideoPage/>
      },
      {
        path:'/channel/:id',
        element:<ChannelPage/>
      },
      {
        path:'/video/:id',
        element:<VideoPage/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={Store}>

    <RouterProvider router={appRouter}/>
     </Provider>
  
  </StrictMode>,
)
