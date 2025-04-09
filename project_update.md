# Project Update

## I. Overview

This update adds new features to the Vehicle Value Estimator app based on a webchat flow. The update includes adding three new buttons to the `ValuationResults.jsx` page: "Create Vehicle Ad", "Research Common Problems", and "Get Vehicle Reviews". It also includes creating three new pages corresponding to these buttons.

## II. Task List

1.  [ ] **Update `ValuationResults.jsx`:**
    *   Add three new buttons: "Create Vehicle Ad", "Research Common Problems", and "Get Vehicle Reviews".
    *   Pass the vehicle details (year, make, model) as props to these buttons.
2.  [ ] **Create `CreateAd.jsx`:**
    *   Create a new page to handle vehicle ad creation.
    *   Fetch data from an ad creation API (if available) or display a form for the user to create an ad manually.
    *   Display the ad creation results.
3.  [ ] **Create `CommonProblems.jsx`:**
    *   Create a new page to display common problems for the selected vehicle.
    *   Fetch data from a common problems API (if available) or display a list of common problems based on a predefined data source.
4.  [ ] **Create `VehicleReviews.jsx`:**
    *   Create a new page to display vehicle reviews for the selected vehicle.
    *   Fetch data from a vehicle reviews API (if available) or display a list of reviews from a predefined data source.
5.  [ ] **Update `App.js`:**
    *   Add routes for the three new pages.
6.  [ ] **Update `AppContext.jsx` (Optional):**
    *   If the new pages require access to the global state, update the `AppContext` accordingly.