import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Layout/Layout";
import Settings from "./Pages/Settings";
import List from "./Pages/List";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout><Home></Home></Layout>
    },
    {
        path: "/settings",
        element: <Layout><Settings></Settings></Layout>
    }, {
        path: "/list",
        element: <Layout><List></List></Layout>
    }
]);