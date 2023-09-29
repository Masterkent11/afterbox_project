// componentsRoutes.tsx
import FeatureIndex from "../pages/Home/Feature/Index";
import VideoDetailsIndex from "../pages/VideoDetails/VideoDetailsIndex";
import Confirmation from "../components/SendingMessage/Confirmation";
import { Layout } from "../layout/mainLayout";

const componentsRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <FeatureIndex />,
      },
      {
        path: "/video-details/:id",
        element: <VideoDetailsIndex />,
      },
      {
        path: "/confirmation-message",
        element: <Confirmation />,
      },
    ],
  },
];

export default componentsRoutes;
