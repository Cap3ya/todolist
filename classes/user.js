import Task from "./task.js";
class User {
    constructor(name = "test", password = "test", tasks = []) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.password = password;
        this.tasks = tasks;
    }
    createTask(...args) {
        this.tasks.push(new Task(...args));
    }
}
export default User;
