1. API to add a new record => 
    http://localhost:8080/salaries
2. API to delete
    http://localhost:8080//salaries/:name
3. API to fetch SS for entire db
    http://localhost:8080/summary
4. API to fetch SS for contract
    http://localhost:8080/contractsSummary
5. API to fetch SS - Department wise
    http://localhost:8080/departmentSummary
6. API to fetch SS - Department -> subdepartment wise 
    http://localhost:8080/subdepartmentSummary

Notes:
 1. Postman collection exported and attached 
 2. docker - not implemented.
 3. Tests cases are added for each scenario mentioned
 4. In-memory array is used and H2 or other solutions are not implemented
 5. Basic authentication is implmented. Where token can be created with 'srikanth' and 'password'. This is used only for the delete just as an example
 6. Error handling. Not 100% implemented. 

