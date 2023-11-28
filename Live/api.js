export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI1NmU3NGQzZi1jN2NhLTRkMWItODZlOS1lZTMxYTNjY2YyNWYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5Njc4Mzc3NywiZXhwIjoxNzA0NTU5Nzc3fQ.r_Wjsj1PHYC3ItYkxrRUWpVIE-tcvdqw8JNJ9m9YNOE"

// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const { roomId } = await res.json();
  console.log("room id", roomId);
  return roomId;
};
