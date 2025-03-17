const baseUrl = 'https://yatish-testing-v15.frappe.cloud';
export async function login(kwargs: any) {
  const login_url = `${baseUrl}/api/method/login`;

  if (kwargs.email && kwargs.password) {
    try {
      const response = await fetch(login_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usr: kwargs.email,
          pwd: kwargs.password,
        }),
        credentials: 'include',
      });

      return await response.json();
   
    } catch (error) {
      return { error: 'An error occurred while logging in' };
    }
  } else {
    return { error: 'Invalid username or password' };
  }
}
export async function generatekeys(kwargs:any) {
     let header_detials = {
     'Content-Type': 'application/json',
      Cookie: kwargs.sid,
    };
    const generateKeysUrl = `${baseUrl}/api/method/frappe.core.doctype.user.user.generate_keys`;
    const keysResponse = await fetch(generateKeysUrl, {
        method: 'POST',
        body: JSON.stringify({
          user: kwargs.email,
          usr: kwargs.email,
          pwd: kwargs.password,
        }),
        headers: header_detials,
      });

      const keysData = await keysResponse.json();

      if (keysData.message.api_secret) {
        const userDetails = `${baseUrl}/api/resource/User/${kwargs.email}`;
        const res = await fetch(userDetails, { method: 'GET', headers: header_detials });
        let response = await res.json();
        if (response.data.api_key) {
          return { status: 'success', token: `token ${response.data.api_key}:${keysData.message.api_secret}` };
        } else {
          return { error: response.message || 'Login failed' };
        }
      } else {
        return { error: keysData.message || 'Login failed' };
      }
   
}