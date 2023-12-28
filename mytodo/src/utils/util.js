import { putTasksContents } from './siyuan-api.js'

export function initTask(taskConfig = {}) {
    const {
        name = '',
        state = TaskStateEnum.Todo,
        createTime = new Date().toLocaleString(),
        updateTime = new Date().toLocaleString(),
        deadline = '',
        desc = '自定义的描述/备注/记录等',
    } = taskConfig;

    return {
        id: Date.now(),
        name,
        state,
        createTime,
        updateTime,
        deadline,
        desc,

    };
}

// 增
export function addTask(tasks, task) {
    //要判断state是否正确
    //添加
    const tempTask = {
        id: (task.id == '' || task.id == undefined) ? Date.now().toLocaleString() : task.id,
        name: task.name,
        state: task.state,
        createTime: (task.createTime == '' || task.createTime == undefined) ? new Date().toLocaleString() : task.createTime,
        updateTime:  new Date().toLocaleString(),
        deadline: task.deadline,
        desc: task.desc,
    }
    //在tasks中增加task元素
    tasks.get(tempTask.state).push(tempTask);

    putTasks(tasks)

    return tasks;
}

//覆盖（修改）
export function modifyTask(tasks, oldTasksState, task) {
    //要判断state是否正确
    // //先删除后增加
    // tasks = deleteTask(tasks,task);
    // tasks = addTask(tasks,task);
    // 遍历tasks，找到和task.id一样的内容，修改内容

    // 遍历tasks，找到和task.id一样的内容，修改内容


    // 如果task的state和oldTasksState一样，那就只需要修改
    // 如果不一样就需要删除增加
    if (task.state === oldTasksState) {
        let taskList = tasks.get(oldTasksState);
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id === task.id) {
                taskList[i].name = task.name;
                taskList[i].state = task.state;
                taskList[i].createTime = task.createTime;
                taskList[i].updateTime = new Date().toLocaleString();
                taskList[i].deadline = task.deadline;
                taskList[i].desc = task.desc;
            }
        }
    } else {
        if(oldTasksState !== "todo" && oldTasksState !== "doing" && oldTasksState !== "done"){
            //找到之前的state,在tasks中
            //遍历tasks,这个map
            for (const [key, value] of tasks) {
                for (let i = 0; i < value.length; i++) {
                    if (value[i].id === task.id) {
                        oldTasksState = key;
                        break;
                    }
                }
            }
        }
        deleteTask(tasks, oldTasksState, task);
        addTask(tasks, task);
    }



    putTasks(tasks)

    return tasks;
}


// 删除
export function deleteTask(tasks, oldTasksState, task) {
    // console.log("debug");
    let tasksList = tasks.get(oldTasksState);
    let taskIndex = tasksList.findIndex(item => item.id === task.id);
    if (taskIndex !== -1) {
        tasksList.splice(taskIndex, 1);
    }

    putTasks(tasks)

    return tasks;
}

//state 分类
export function classifyTask(tasks) {
    let todoTasks = [];
    let doingTasks = [];
    let doneTasks = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].state === 'todo') {
            todoTasks.push(tasks[i]);
        } else if (tasks[i].state === 'doing') {
            doingTasks.push(tasks[i]);
        } else if (tasks[i].state === 'done') {
            doneTasks.push(tasks[i]);
        }
    }
    return {
        todoTasks,
        doingTasks,
        doneTasks
    }
}

// 格式化时间
export function formatTime(timeString) {
    // 使用 Date 对象的方法获取年、月、日、小时、分钟、秒
    const time = new Date(timeString);
    let year = time.getFullYear();
    let month = (time.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，加1后格式化为两位数
    let day = time.getDate().toString().padStart(2, '0'); // 格式化为两位数
    let hours = time.getHours().toString().padStart(2, '0'); // 格式化为两位数
    let minutes = time.getMinutes().toString().padStart(2, '0'); // 格式化为两位数
    let seconds = time.getSeconds().toString().padStart(2, '0'); // 格式化为两位数
    // 组合成所需的时间格式，例如：YYYY-MM-DD HH:MM:SS
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}



export function Enum(baseEnum) {
    return new Proxy(baseEnum, {
        get(target, name) {
            if (!baseEnum.hasOwnProperty(name)) {
                throw new Error(`"${name}" value does not exist in the enum`)
            }
            return baseEnum[name]
        },
        set(target, name, value) {
            throw new Error('Cannot add a new value to the enum')
        }
    })
}

export const TaskStateEnum = Enum({
    Todo: 'todo',
    Doing: 'doing',
    Done: 'done',
})

export const TaskStateColorMap = new Map();
TaskStateColorMap.set("todo","blue")
TaskStateColorMap.set("doing","red")
TaskStateColorMap.set("done","grey")



// 获取挂件所在块信息
export function getWidgetBlockInfo() {
    let widgetBlockEle = window.frameElement.parentElement.parentElement;

    let widgetBlkID = widgetBlockEle.getAttribute('data-node-id');
    return {
        id: widgetBlkID  //挂件块id
    }
}

export function putTasks(tasks) {
    const rep = putTasksContents(getWidgetBlockInfo().id, tasks);
}