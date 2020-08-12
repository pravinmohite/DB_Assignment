Assumption
1)I assumed that sorting should be in ascending order by last changed bid.
2)I assumed that we need to show sparkline in last column of every row.


Approach
1)Created utils.js Module using CommonJS, which contains all the required functions
2)To avoid re-rendering of table we are finding the index where new data has to be inserted and adding the row at that particular index of table.
3)Added timestamp attribute in each received object to manage last 30 seconds data to show sparkline
4)Added jasmine for unit testing
5)By default jasmine dont show report of successful unit tests, So I have modified the report to show success logs with details

Steps to run the assignment
->npm install
->npm start

Steps to start the unit test:-
-> npm test









