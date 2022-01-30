# graphql-tutorialpoint

Source code graphql tutorial from tutorialpoint.

1. tutorial link: https://www.tutorialspoint.com/graphql/index.htm
2. Query list
   - greeting
     - args : -
     - response : string
   - greetingWithAuth
     - args : -
     - response : string
   - sayHello
     - args : name
     - response : string
   - students
     - args : -
     - response : [Student]
   - studentById
     - args : id
     - response : Student
   - setFavouriteColor
     - args : color
     - response : String
3. Mutation list
   - createStudent
     - args : {firstname, lastname, collage}
     - response : ID
   - createStudent_return_object
     - args : {firstname, lastname, collage}
     - response : Student
   - signUp
     - args : {firstname, email, password}
     - response : string
4. How to start
   - Clone project
   ```
   git clone https://github.com/MiftahSalam/graphql-tutorialpoint
   ```
   - Go to project directory
   ```
   cd graphql-tutorialpoint
   ```
   - install packages
   ```
   npm i
   ```
   - start server
   ```
   npm start
   ```
