import React, {useEffect} from "react";
import {Routes, Route} from 'react-router'
import {HelloRoute} from "../routes/HelloRoute";
import {GoodByeRoute} from "../routes/GoodByeRoute";

export const App: React.FC = () => {
    useEffect(() => {
        console.log('only on client')
    },[])
    console.log('on both sides')
    return <Routes>
            <Route path="/hello" element={<HelloRoute />} />
            <Route path="/good-bye" element={<GoodByeRoute />}/>
    </Routes>
};
