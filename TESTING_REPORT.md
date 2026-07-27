# Testing Report - Sift

## 1. Features Tested

### Authentication
- Sign-in flow
- Sign-up flow
- Demo account login
- Validation for empty fields
- Error handling for invalid credentials
- Loading state behavior

### Recommendation Experience
- Recommended titles section
- Recently watched section
- Genre-based browsing
- Title cards rendering
- Carousel left/right scrolling

### Interactive Actions
- Rating titles
- Clearing or changing a rating
- Opening title details
- Closing the modal
- Marking titles as watched
- Logging out

### UI and Responsiveness
- Desktop and narrow-screen layouts
- Focus states for keyboard users
- Empty-state messaging
- Error/status banner behavior
- Offline-safe fallback behavior for poster assets

## 2. Bugs Found and Fixed

### Bug 1: Auth helper crashed on non-promise paths
- Symptom: login attempts could trigger an unhandled TypeError during the error-handling wrapper path.
- Fix: updated the helper to safely handle both promise and non-promise results.

### Bug 2: Passwords were handled as plain text in the demo app flow
- Symptom: credentials were stored and compared in clear text in the client-side state.
- Fix: moved authentication to a hashed-password flow and updated seed users accordingly.

### Bug 3: User input was accepted without sanitization
- Symptom: raw form values could be stored and displayed without cleaning.
- Fix: added text sanitization for names, emails, and password fields.

### Bug 4: Error messaging was inconsistent for failed actions
- Symptom: some failed actions did not surface clear feedback to the user.
- Fix: added consistent user-visible error/status messages for auth, rating, and watch-history actions.

### Bug 5: Some UI states lacked accessible announcements
- Symptom: users relying on screen readers could miss important updates.
- Fix: added live regions and clearer labels for errors and modal actions.

## 3. Security Measures Implemented

- Passwords are now hashed before being stored or compared in the app flow.
- Input values are sanitized before use to limit unsafe or unexpected content.
- Authentication errors are handled without exposing internal failure details.
- Sensitive demo credentials are no longer stored as raw plaintext values.
- The app now uses safer UI error handling to avoid unhandled runtime exceptions.

## 4. Accessibility Features Added

- Added descriptive aria-labels to form inputs and modal controls.
- Added live regions for validation and status messages using role="alert" and role="status".
- Improved keyboard focus visibility for buttons and inputs.
- Added clearer labels for carousel navigation and close controls.
- Improved modal interaction semantics with a dedicated close button.

## 5. Verification

- Tests run: Vitest suite
- Result: 3 tests passed
- Build check: Vite production build completed successfully
