export default function useProfile() {
  const data = localStorage.getItem("userProfile");
  return data ? JSON.parse(data) : { username: "", occupation: "" };
}
