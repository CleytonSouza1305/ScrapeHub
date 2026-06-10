async function validateToken() {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await fetch(`http://localhost:2200/api/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      console.error(
        `Erro ao validar token\nStatus: ${data.status || 500}\nMessage: ${data.message || `Invalid validation token.`}`,
      );
      return null;
    }

    return data
  } catch (e) {
    console.error(`Erro ao validar token`, e);
    return null;
  }
}

export default validateToken;
