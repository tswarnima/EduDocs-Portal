import { countActiveUsers, countRequests } from "../../data/localStore.js";

export async function getHomePageContent() {
  const totalStudents = countActiveUsers();
  const totalRequests = countRequests();
  const pendingRequests = countRequests({ status: "Pending" });

  return {
    title: "Welcome to EduDocs Portal",
    subtitle: "Request, track, and manage your academic documents securely.",
    features: [
      "Request Documents",
      "Track Requests",
      "Request History",
      "Manage Profile",
    ],
    stats: {
      totalStudents,
      totalRequests,
      pendingRequests,
    },
  };
}
