import { useEffect } from 'react';

const GoogleAuthProvider = () => {
  useEffect(() => {
    window.google?.accounts.id.initialize({
      client_id: "502137770921-hge1c2omjad4e3r0t2prrg1cfn3705cm.apps.googleusercontent.com",
      callback: (response) => {
        if (response.credential) {
          localStorage.setItem('token', response.credential);
          const payload = JSON.parse(atob(response.credential.split('.')[1]));
          document.cookie = `email=${payload.email}; path=/;`;
          // optionally: name, picture, etc.
        }
      }
    });

    // auto-refresh token
    window.google?.accounts.id.prompt();
  }, []);

  return null;
};

export default GoogleAuthProvider;
