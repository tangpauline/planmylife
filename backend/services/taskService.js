const Fuse = require("fuse.js");

const findFuzzyRow = (allTasks, taskToFind) => {
    // console.log("task to find: ", taskToFind);
    // console.log("all tasks: ", allTasks);
    const fuse = new Fuse(allTasks, {
        keys: ["task_name"],
        threshold: 0.4,
    });
    const result = fuse.search(taskToFind);
    return result.length > 0 ? result[0].item : null;
}

module.exports = { findFuzzyRow }