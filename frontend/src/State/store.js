import { configureStore } from "@reduxjs/toolkit";
import Sidebar from "./Slice/Sidebar"

import Video from "./Slice/Videos"
import VideoList from "./Slice/VideoList"
import IsLogged from "./Slice/IsLogged"

const Store = configureStore({
    reducer:{
        Sidebar,
        Video,
        VideoList,
        IsLogged
    }
})

export default Store