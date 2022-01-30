const db = require("./db");

const Query = {
  Test: () => "Test success, GraphQL is up & running !!",
  greeting: () => {
    return "hello from tutorial point !!!";
  },
  greetingWithAuth: (root, args, context, info) => {
    if (!context.user) throw new Error("Unauthorize");

    return "Hello from Server. Welcome back: " + context.user.firstname;
  },
  sayHello: (root, args, context, info) => {
    return `Hi ${args.name}! server say hello to you`;
  },
  students: () => db.students.list(),
  studentById: (root, args, context, info) => {
    return db.students.get(args.id);
  },
  setFavouriteColor: (root, args) => {
    return "Your favourite color is " + args.color;
  },
};

const Student = {
  fullname: (root, args, context, info) => {
    return root.firstname + " " + root.lastname;
  },
  college: (root) => {
    return db.collages.get(root.collegeId);
  },
};

const Mutation = {
  createStudent: (root, args, context, info) => {
    return db.students.create({
      collegeId: args.collegeId,
      firstname: args.firstname,
      lastname: args.lastname,
    });
  },
  createStudent_return_object: (root, args, context, info) => {
    const id = db.students.create({
      collegeId: args.collegeId,
      firstname: args.firstname,
      lastname: args.lastname,
    });

    return db.students.get(id);
  },
  signUp: (root, args, context, info) => {
    const { email, password, firstname } = args.input;
    const emailExpression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailExpression.test(
      String(email).toLocaleLowerCase()
    );

    if (!isValidEmail) throw new Error("Email not in proper format");
    if (firstname.length > 15)
      throw new Error("Firstname must be less than 15 characters");
    if (password.length < 8)
      throw new Error("Password must be minimum 8 characters");

    return "success";
  },
};
module.exports = { Query, Student, Mutation };
