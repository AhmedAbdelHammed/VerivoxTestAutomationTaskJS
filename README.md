# VerivoxTestAutomationTask

This task is for automating DSL Calculator feature in Verivox website  

**Technologies Used:**   
- Cucumber  
- Cypress  
- Mochaawesome reports
- Java Script

**Prerequisites to run the automation test:**    
1- Node js installed on the machine (npm@5.2.0 or greater)  
  
**Steps to run the automation test:**  
1- Open terminal   
2- Go to project location  
3- Run 'npx cypress run --spec "cypress/integration/cucumber-tests/DSLCalculator.feature"' command  
4- To check the run result report open 'TestRunReport.html' from '{Project Location}/cypress/reports' folder   
5- To check the run recorded video open 'DSLCalculator.feature.mp4' from '{Project Location}/cypress/videos/cucumber-tests'  

**Notes:**  
1- The tests will run headless  
2- You will find the feature file under "cypress/integration/cucumber-tests", the step defination under "cypress/integration/cucumber-tests/DSLCalculator" and the ObjectRepo folder under "cypress/integration"  
