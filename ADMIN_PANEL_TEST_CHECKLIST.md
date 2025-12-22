# Admin Panel - Backend Integration Test Checklist

## Test Environment Setup

**Before starting:**
1. ✅ Backend is running on `http://localhost:3000`
2. ✅ Admin panel is running on `http://localhost:3002` (or configured port)
3. ✅ Database is seeded with default admin user
4. ✅ Debug logging is active (logs will be written to `.cursor/debug.log`)

**Default Admin Credentials:**
- Email: `admin@soothe.com`
- Password: `Admin@123`

---

## Test Scenarios

### 1. Authentication Flow

#### 1.1 Login
- [ ] Navigate to `/auth/login`
- [ ] Enter admin credentials
- [ ] Click "Sign In"
- [ ] **Expected**: Redirect to `/dashboard`, tokens stored in localStorage
- [ ] **Check**: User info displayed in UI

#### 1.2 Token Storage
- [ ] Open browser DevTools → Application → Local Storage
- [ ] **Verify**: `accessToken` and `refreshToken` are stored
- [ ] **Verify**: `user` object is stored

#### 1.3 Token Refresh (if applicable)
- [ ] Wait for token to expire OR manually clear `accessToken`
- [ ] Make any API call
- [ ] **Expected**: Token refresh happens automatically, request succeeds

#### 1.4 Logout
- [ ] Click logout (if available) OR clear localStorage
- [ ] **Expected**: Redirect to login page

---

### 2. Dashboard Page

#### 2.1 Load Dashboard
- [ ] Navigate to `/dashboard`
- [ ] **Expected**: Dashboard loads with statistics cards
- [ ] **Verify**: All stat cards show numbers (may be 0 if no data)

#### 2.2 Dashboard Stats
- [ ] **Check each stat card**:
  - [ ] Pages count
  - [ ] Solutions count
  - [ ] Blog Posts count
  - [ ] Careers count
  - [ ] Team Members count
  - [ ] Contact Submissions count
  - [ ] Media Files count
  - [ ] Users count

#### 2.3 Quick Links
- [ ] Click each quick link:
  - [ ] "Create Page" → Should navigate to `/pages/create`
  - [ ] "New Blog Post" → Should navigate to `/blog/create`
  - [ ] "Add Solution" → Should navigate to `/solutions/create`
  - [ ] "Post Job" → Should navigate to `/careers/create`
  - [ ] "Site Settings" → Should navigate to `/settings`

---

### 3. Pages Module

#### 3.1 List Pages
- [ ] Navigate to `/pages`
- [ ] **Expected**: Pages list loads (may be empty)
- [ ] **Verify**: Search box works
- [ ] **Verify**: Pagination works (if multiple pages)

#### 3.2 Create Page
- [ ] Click "Create Page"
- [ ] Fill in form:
  - [ ] Title: "Test Page"
  - [ ] Slug: "test-page" (auto-generated)
  - [ ] Content: Add some content
  - [ ] Meta title, description (optional)
- [ ] Click "Create"
- [ ] **Expected**: Success toast, redirect to pages list
- [ ] **Verify**: New page appears in list

#### 3.3 Edit Page
- [ ] Click edit icon on a page
- [ ] Modify title/content
- [ ] Click "Update"
- [ ] **Expected**: Success toast, changes saved
- [ ] **Verify**: Changes reflected in list

#### 3.4 Delete Page
- [ ] Click delete icon on a page
- [ ] Confirm deletion
- [ ] **Expected**: Success toast, page removed from list

---

### 4. Solutions Module

#### 4.1 List Solutions
- [ ] Navigate to `/solutions`
- [ ] **Expected**: Solutions list loads
- [ ] **Verify**: Search and pagination work

#### 4.2 Create Solution
- [ ] Click "Create Solution"
- [ ] Fill in form:
  - [ ] Title: "Test Solution"
  - [ ] Description: "Test description"
  - [ ] Category: Select or create
  - [ ] Features: Add 2-3 features
  - [ ] Benefits: Add 2-3 benefits
- [ ] Click "Create"
- [ ] **Expected**: Success, solution appears in list

#### 4.3 Edit Solution
- [ ] Edit a solution
- [ ] Update fields
- [ ] **Expected**: Changes saved

#### 4.4 Delete Solution
- [ ] Delete a solution
- [ ] **Expected**: Solution removed

---

### 5. Categories Module

#### 5.1 List Categories
- [ ] Navigate to `/categories`
- [ ] **Expected**: Categories list loads

#### 5.2 Create Category
- [ ] Click "Create Category"
- [ ] Fill in: Name, Slug, Description
- [ ] **Expected**: Category created

#### 5.3 Edit/Delete Category
- [ ] Edit a category
- [ ] Delete a category
- [ ] **Expected**: Operations succeed

---

### 6. Blog Module

#### 6.1 List Blog Posts
- [ ] Navigate to `/blog`
- [ ] **Expected**: Blog posts list loads

#### 6.2 Create Blog Post
- [ ] Click "Create Blog Post"
- [ ] Fill in:
  - [ ] Title, Slug
  - [ ] Excerpt
  - [ ] Content (rich text)
  - [ ] Featured image (optional)
  - [ ] Tags
  - [ ] Status: DRAFT or PUBLISHED
- [ ] **Expected**: Post created

#### 6.3 Edit/Delete Blog Post
- [ ] Edit a post
- [ ] Delete a post
- [ ] **Expected**: Operations succeed

---

### 7. Careers Module

#### 7.1 List Careers
- [ ] Navigate to `/careers`
- [ ] **Expected**: Job listings load

#### 7.2 Create Career
- [ ] Click "Create Career"
- [ ] Fill in:
  - [ ] Title, Department, Location, Type
  - [ ] Description
  - [ ] Responsibilities (array)
  - [ ] Requirements (array)
  - [ ] Benefits (array)
  - [ ] Salary range
  - [ ] Status: OPEN or CLOSED
- [ ] **Expected**: Career created

#### 7.3 Edit/Delete Career
- [ ] Edit a career
- [ ] Delete a career
- [ ] **Expected**: Operations succeed

---

### 8. Applicants Module

#### 8.1 List Applicants
- [ ] Navigate to `/applicants`
- [ ] **Expected**: Applicants list loads
- [ ] **Verify**: Shows career applied for, status, date

#### 8.2 View Applicant
- [ ] Click on an applicant
- [ ] **Expected**: Full details displayed
- [ ] **Verify**: CV download works (if available)

#### 8.3 Delete Applicant
- [ ] Delete an applicant
- [ ] **Expected**: Applicant removed

---

### 9. Team Module

#### 9.1 List Team Members
- [ ] Navigate to `/team`
- [ ] **Expected**: Team members list loads

#### 9.2 Create Team Member
- [ ] Click "Create Team Member"
- [ ] Fill in:
  - [ ] First Name, Last Name
  - [ ] Role
  - [ ] Bio
  - [ ] Photo (upload)
  - [ ] Social links (optional)
- [ ] **Expected**: Member created

#### 9.3 Edit/Delete Team Member
- [ ] Edit a member
- [ ] Delete a member
- [ ] **Expected**: Operations succeed

---

### 10. Media Library

#### 10.1 List Media
- [ ] Navigate to `/media`
- [ ] **Expected**: Media files grid loads
- [ ] **Verify**: Images display correctly
- [ ] **Verify**: Search works

#### 10.2 Upload Media
- [ ] Enter alt text
- [ ] Click "Choose File"
- [ ] Select an image file
- [ ] **Expected**: Upload succeeds, file appears in grid
- [ ] **Verify**: Image displays correctly
- [ ] **Verify**: URL can be copied

#### 10.3 Delete Media
- [ ] Delete a media file
- [ ] **Expected**: File removed from list

---

### 11. Contact Submissions

#### 11.1 List Submissions
- [ ] Navigate to `/contact`
- [ ] **Expected**: Contact submissions list loads
- [ ] **Verify**: Shows name, email, subject, date, read status

#### 11.2 View Submission
- [ ] Click on a submission
- [ ] **Expected**: Full message displayed
- [ ] **Verify**: Mark as read works (if available)

#### 11.3 Delete Submission
- [ ] Delete a submission
- [ ] **Expected**: Submission removed

---

### 12. Users Module

#### 12.1 List Users
- [ ] Navigate to `/users`
- [ ] **Expected**: Users list loads (admin only)
- [ ] **Verify**: Shows email, role, status

#### 12.2 Create User
- [ ] Click "Create User"
- [ ] Fill in:
  - [ ] Email, First Name, Last Name
  - [ ] Password
  - [ ] Role: ADMIN, EDITOR, AUTHOR, VIEWER
  - [ ] Active status
- [ ] **Expected**: User created

#### 12.3 Edit/Delete User
- [ ] Edit a user
- [ ] Delete a user
- [ ] **Expected**: Operations succeed

---

### 13. Settings Module

#### 13.1 View Settings
- [ ] Navigate to `/settings`
- [ ] **Expected**: Settings form loads with current values

#### 13.2 Update Settings
- [ ] Modify settings:
  - [ ] Site name, description
  - [ ] Logo, favicon
  - [ ] Social media links
  - [ ] Contact info
  - [ ] Accessibility settings
- [ ] Click "Save"
- [ ] **Expected**: Settings saved, success toast

---

### 14. Accessibility Module

#### 14.1 View Accessibility
- [ ] Navigate to `/accessibility`
- [ ] **Expected**: Accessibility form loads

#### 14.2 Update Accessibility
- [ ] Modify settings:
  - [ ] WCAG level
  - [ ] Feature toggles (keyboard nav, screen reader, etc.)
  - [ ] Statement
- [ ] Click "Save"
- [ ] **Expected**: Settings saved

---

## Error Scenarios to Test

### 15. Error Handling

#### 15.1 Invalid Credentials
- [ ] Try login with wrong password
- [ ] **Expected**: Error message displayed

#### 15.2 Network Errors
- [ ] Stop backend server
- [ ] Try to load any page
- [ ] **Expected**: Error toast, graceful handling

#### 15.3 Unauthorized Access
- [ ] Clear tokens
- [ ] Try to access protected route
- [ ] **Expected**: Redirect to login

#### 15.4 Invalid Data
- [ ] Try to create item with invalid data
- [ ] **Expected**: Validation errors displayed

---

## Performance Checks

### 16. Performance

- [ ] Dashboard loads in < 2 seconds
- [ ] List pages load in < 1 second
- [ ] File uploads complete in reasonable time
- [ ] No console errors (check DevTools)
- [ ] No memory leaks (monitor memory usage)

---

## Browser Compatibility

### 17. Cross-Browser

Test in:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (if available)

---

## Notes

- All operations should show appropriate loading states
- Success/error toasts should appear for all operations
- Forms should validate before submission
- Delete operations should require confirmation
- Search and pagination should work on all list pages

---

## After Testing

1. Check `.cursor/debug.log` for any logged errors
2. Review browser console for JavaScript errors
3. Review network tab for failed API calls
4. Document any issues found

---

**Test Date**: _______________  
**Tester**: _______________  
**Backend Version**: _______________  
**Admin Panel Version**: _______________


