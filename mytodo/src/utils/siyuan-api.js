



// 获取文件
export async function getTasksContents(blockId) {
    //写入文件，读取文件，保存文件
    let url = "http://127.0.0.1:6806/api/attr/getBlockAttrs";
    let data = {
        "id": blockId,
      };

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        let response_data = await response.json();

        return {
            code: 0, // 
            message: response_data
        };
    } catch (error) {
        // 如果发生错误，返回错误信息
        return {
            code: 500, // 或其他适当的错误状态码
            message: error.message
        };
    }

}



// 写入
export async function putTasksContents(blockId,tasksMap) {
    // 将 Map 转换为普通的 JavaScript 对象
    let tasksObject = {};
    tasksMap.forEach((value, key) => {
        tasksObject[key] = value;
    });
    // 将对象转换为 JSON 字符串
    let jsonContent = JSON.stringify(tasksObject, null, 2);


    //写入文件，读取文件，保存文件
    let url = "http://127.0.0.1:6806/api/attr/setBlockAttrs";
    let data = {
        "id": blockId,
        "attrs": {
          "custom-tasksmap": jsonContent
        }
    };

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        let response_data = (await response).json();
        return {
            code: 0, // 
            message: response_data
        };
    } catch (error) {
        // 如果发生错误，返回错误信息
        return {
            code: 500, // 或其他适当的错误状态码
            message: error.message
        };
    }

}



