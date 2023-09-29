import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export interface Video {
  name: string;
  src: string;
  date: string;
  title: string;
  email: string;
}

interface VideoRecordingState {
  videoClips: Video[];
  setVideoClips: React.Dispatch<React.SetStateAction<Video[]>>;
  handleDelete: (name: string) => void;
  addPendingVideo: (video: Video) => void;
  clearPendingVideo: () => void;
  getPendingVideos: () => Video[];
  updatePendingVideos: (source: string) => void;
  savePendingVideos: () => void;
}
interface VideoRecordingProviderProps {
  children: ReactNode;
}

export const VideoRecordingContext = createContext<VideoRecordingState>({
  videoClips: [],
  setVideoClips: () => {},
  handleDelete: () => {},
  addPendingVideo: () => {},
  clearPendingVideo: () => {},
  getPendingVideos: () => [],
  updatePendingVideos: () => {},
  savePendingVideos: () => {},
});

export const VideoRecordingProvider: React.FC<VideoRecordingProviderProps> = ({
  children,
}) => {
  const [videoClips, setVideoClips] = useState<Video[]>([]);

  const userContext = useContext(UserContext);

  // Fetches the video
  // useEffect(() => {
  //   const userId = localStorage.getItem("userId");
  //   const isLoggedIn = userContext?.isLoggedIn;

  //   if (userId && isLoggedIn) {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:4000/users/${userId}`
  //         );
  //         setVideoClips(response.data.videoRecordings);
  //         console.log(response.data, "this is user");
  //       } catch (err) {
  //         console.error("Error fetching data: ", err);
  //       }
  //     };

  //     fetchData();
  //   }
  // }, [userContext?.isLoggedIn]);

  const handleDelete = (videoName: string) => {
    const newVideos = videoClips.filter((video) => video.name !== videoName);
    setVideoClips(newVideos);
  };

  const savePendingVideos = () => {
    localStorage.setItem("pendingVideos", JSON.stringify(videoClips));
  };

  const getPendingVideos = () => {
    return videoClips.filter((video) => video.src === "");
  };

  const addPendingVideo = (video: Video) => {
    setVideoClips((prevClips) => [...prevClips, video]);
  };

  const clearPendingVideo = () => {
    setVideoClips([]);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const isLoggedIn = userContext?.isLoggedIn;

    if (userId && isLoggedIn) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/users/${userId}`
          );
          const savedPendingVideos = getPendingVideos();

          // Merge the saved pending videos with the fetched videos
          const mergedVideos = [
            ...response.data.videoRecordings,
            ...savedPendingVideos,
          ];

          setVideoClips(mergedVideos);
          savePendingVideos(); // Save pending videos after merging
        } catch (err) {
          console.error("Error fetching data: ", err);
        }
      };

      fetchData();
    }
  }, [userContext?.isLoggedIn]);

  // Update the source of pending videos after signup
  const updatePendingVideos = (source: string) => {
    const updatedVideoClips = videoClips.map((video) => {
      if (video.src === "") {
        return { ...video, src: source }; // Update with actual source
      }
      return video;
    });
    setVideoClips(updatedVideoClips);
  };
  useEffect(() => {
    const pendingVideosJson = localStorage.getItem("pendingVideos");
    if (pendingVideosJson) {
      const pendingVideos = JSON.parse(pendingVideosJson);
      setVideoClips(pendingVideos);
    }
  }, []);

  return (
    <VideoRecordingContext.Provider
      value={{
        videoClips,
        setVideoClips,
        handleDelete,
        addPendingVideo,
        clearPendingVideo,
        getPendingVideos,
        updatePendingVideos,
        savePendingVideos,
      }}
    >
      {children}
    </VideoRecordingContext.Provider>
  );
};
