class Task {
  constructor(name, labels, isDone, dueDate, dueTime, importance, description) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.labels = Array(...labels);
    this.isDone = Boolean(isDone);
    this.dueDate = dueDate;
    this.dueTime = dueTime;
    this.importance = Number(importance); // 4 to 1
    this.description = description;
  };
  get timeLeft() {
    const minute = 60;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = (52 / 12) * week;
    const year = 12 * month;

    const timeLeft = (new Date(this.dueDate) - Date.now()) / 1000;
    if (timeLeft < 0) { return `past dueDate` }
    else if (timeLeft < hour) { return `${Math.trunc(timeLeft / minute)} minutes left` }
    else if (timeLeft < day) { return `${Math.trunc(timeLeft / hour)} hours left` }
    else if (timeLeft < week) { return `${Math.trunc(timeLeft / day)} days left` }
    else if (timeLeft < month) { return `${Math.trunc(timeLeft / week)} weeks left` }
    else if (timeLeft < year) { return `${Math.trunc(timeLeft / month)} months left` }
    else { return `${Math.trunc(timeLeft / year)} years left` }
  }
  get priority() {
    return Math.round((this.urgence + this.importance) / 2);
  }
  get urgence() {
    const minute = 60;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = (52 / 12) * week;
    const year = 12 * month;

    const timeLeft = (new Date(this.dueDate) - Date.now()) / 1000;
    if (timeLeft < 0) { return 0 }
    else if (timeLeft < hour) { return 6 }
    else if (timeLeft < day) { return 5 }
    else if (timeLeft < week) { return 4 }
    else if (timeLeft < month) { return 3 }
    else if (timeLeft < year) { return 2 }
    else { return 1 }
  }
  remove() { // void
    user.tasks.splice(user.tasks.findIndex(task => task.id === this.id), 1);
  }
  edit(key, value) {
    if (Object.hasOwn(this, key) && (key != "id")) {
      switch (key) {
        case 'labels':
          this[key] = value.split(" ")
          break;
        default:
          this[key] = value
      }
    }
  }
}

export default Task;