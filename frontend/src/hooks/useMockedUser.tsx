// import axios from "axios";
// import toast from "react-hot-toast";
// import { useState } from "react";

// export const useMockedUser = () => {
// const [user, setUser] = useState({ firstName: "", lastName: "", email: "" });
// const [isLoggedIn, setIsLoggedIn] = useState(false);
// const userId = localStorage.getItem("userId");
// useEffect(() => {
//   const fetchUser = async () => {
//     try {
//       const response = await axios.get(
//         `https://afterbox.io/api/auth/signin/${userId}`
//       );
//       const data = response.data;
//       setUser({
//         firstName: data.firstName,
//         lastName: data.lastName,
//         email: data.email,
//       });
//       // If the user data was fetched successfully, the user is logged in
//       setIsLoggedIn(true);
//       toast.success("User data loaded successfully!");
//     } catch (err) {
//       setIsLoggedIn(false);
//       toast.error("Failed to load user data");
//     }
//   };
//   if (userId) {
//     fetchUser();
//   } else {
//     setIsLoggedIn(false);
//   }
// }, [userId]);
// return {
//   firstName: user.firstName,
//   lastName: user.lastName,
//   email: user.email,
//   isLoggedIn,
// };
// };
