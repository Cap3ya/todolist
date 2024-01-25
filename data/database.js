import User from "../classes/user.js";

let users = [];

const test = new User("test", "test")

test.createTask("First", ["abc", "def"], true, "2024-02-01", "10:00", 0, "Small Description")
test.createTask("Second", ["def", "ghi"], false, "2024-03-01", "20:00", 1, "Small Description")
test.createTask("Third", ["abc", "def"], true, "2024-04-01", "03:00", 2, "Small Description")
test.createTask("Fourth", ["def", "ghi"], false, "2024-05-01", "04:00", 3, "Small Description")
test.createTask("Fifth", ["def", "ghi"], false, "2024-06-01", "00:56", 4, "Small Description")

users.push(test)

export default users;