const status = {
  data: {
    tasks: [{ id: 1, title: "mock task", completed: true, deleted: true }],
  },
  listeners: [],
  init() {
    const localData = localStorage.getItem("saved-status");
    if (localData["saved-status"] == null) {
      localStorage.setItem("saved-status", JSON.stringify(this.data));
    } else return status.setStatus(JSON.parse(localData));
  },
  getStatus() {
    return this.data;
  },
  addTask(id: number, title: string) {
    const currentStatus = this.getStatus();
    currentStatus.tasks.push({
      id: id,
      title: title,
      completed: false,
      deleted: false,
    });
    return this.setStatus(currentStatus);
  },
  updateStatus(id, value: boolean) {
    const currentStatus = this.getStatus();
    const found = currentStatus.tasks.find((task) => {
      return task.id == id;
    });
    found.completed = value;
    this.setStatus(currentStatus);
  },
  deleteItem(id, deleted: boolean) {
    const currentStatus = this.getStatus();
    const found = currentStatus.tasks.find((task) => {
      return task.id == id;
    });
    found.deleted = deleted;
    this.setStatus(currentStatus);
  },
  setStatus(newStatus: object) {
    this.data = newStatus;
    for (const callback of this.listeners) {
      callback();
    }
    localStorage.setItem("saved-status", JSON.stringify(newStatus));
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { status };
