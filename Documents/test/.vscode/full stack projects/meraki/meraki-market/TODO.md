# TODO: Fix Authentication and Authorization Errors

## Issues Identified
- Password trimming inconsistency between frontend and backend causing 400 on login.
- Cookie settings incompatible with localhost causing 401 on protected routes.
- Admin login failing due to credential mismatches.

## Tasks
- [ ] Trim passwords on frontend in Login.jsx and Signup.jsx before sending to backend.
- [ ] Update cookie settings in generateToken.js to sameSite: "lax" for localhost compatibility.
- [ ] Verify JWT_SECRET is set in .env (assumed correct).
- [ ] Test user login and registration.
- [ ] Test admin login and registration.
- [ ] Test protected routes like profile, orders, checkout.
- [ ] Verify admin dashboard access.

## Followup
- Run backend and frontend servers.
- Test all authentication flows.
- Check browser console for errors.
