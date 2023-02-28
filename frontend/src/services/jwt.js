function saveToken(token) {
    localStorage.setItem('jwtToken', token);
}

function deleteToken() {
    localStorage.removeItem('jwtToken');
}

function getToken() {
    return localStorage.getItem('jwtToken');
}

function getTokenPayload() {
    const token = getToken();
    if (!token) {
        return null;
    }

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
        return null;
    }

    const encodedPayload = tokenParts[1];
    const decodedPayload = atob(encodedPayload);
    const parsedPayload = JSON.parse(decodedPayload);

    return parsedPayload;
}

function isTokenValid() {
    const token = getToken();
    if (!token) {
        return false;
    }

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
        return false;
    }

    const encodedPayload = tokenParts[1];
    const decodedPayload = atob(encodedPayload);
    const parsedPayload = JSON.parse(decodedPayload);

    const now = Math.floor(Date.now() / 1000);
    if (parsedPayload.exp < now) {
        return false;
    }

    return true;
}

export default { saveToken, deleteToken, getToken, getTokenPayload, isTokenValid };
