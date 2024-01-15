import message from "./message";

export async function checkToken(token : string) : Promise<boolean> {
    const requestUrl = "http://localhost:8080/auth/token";
    const res = await fetch(requestUrl, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          'authorization' : `Bearer ${token}`
        },
    })
    const data : message = await res.json();
    if(data.message === "check") {
        return true;
    }
    return false
}

export async function tokenRefresh(refreshToken : string) : Promise<string|boolean> {
    const requestUrl = "http://localhost:8080/auth/token";
    const res = await fetch(requestUrl, {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            refreshToken
        }),
    })
    const data : message = await res.json();
    if(data.message === "Refresh Success") {
        return String(data.data);
    }
    return false;
}