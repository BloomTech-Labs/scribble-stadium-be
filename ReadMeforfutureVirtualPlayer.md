For those who are working on the Virtual Player Bot/User Remainder and Round Off.


**Challenges**

- Decide which Submission to be pulled from past cohorts to be used for Virtual Players.
- Need Admin Authorization for pulling any submission from DS(Data Science) side.
  - If there is a `DS student` in the team. See if the student can find a way to do this.
  - If no `DS Student` in the team, will have to ask the DS cohort side about Admin Authorization for the backend to use the Data Science Database.

    Given the Endpoint after launching the Backend. 
    `http://localhost:8000/api-docs/` -> `Submissions` -> `GET /submissions/child/{id}` 
    The `GET` required a DataScience Endpoint.

**Labspt22 Team Notes**

- Our [Whimsical Flow Chart](https://whimsical.com/player-remainder-issue-SAUYt62erZoLqbJvCjWRmL) of How the Virtual Player works. 
  - Feel free to make a copy and edit it.


**Front-End Notes**
------------------
- `RenderMatchUp.js` / `FaceOffContent.js` - where the code will go to pull images/data for axios get pull request.
  
- Research where the Render logic should be.
- Research and check API endpoints.
- Test the API for Front-End if it is working


**Back-End Notes**
------------------
The Submission of getting all data for the child is at `http://localhost:8000/api-docs/` -> `Submissions` -> `GET /submissions/child/{id}`. 

The Implementation for the Virtual Player Submission Endpoint (API) is at `api/submission/submissionRouter.js` at Line `225` - `252`

- Code the logic for API BackEnd and FrontEnd
- Test it with PostMan/TablePlus.

