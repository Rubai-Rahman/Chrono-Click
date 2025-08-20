export const makeAdmin = async (email: string) => {
  const user = { email };
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/admin`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${localStorage.getItem("idToken")}`, // This needs to be handled securely in Next.js
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    throw new Error("Failed to make admin");
  }
  return res.json();
};