



// // 获取文件
// export async function getTasksContents(blockId) {
//     //写入文件，读取文件，保存文件
//     let url = "http://127.0.0.1:6806/api/attr/getBlockAttrs";
//     let data = {
//         "id": blockId,
//       };

//     try {
//         let response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data)
//         })
//         let response_data = await response.json();

//         return {
//             code: 0, // 
//             message: response_data
//         };
//     } catch (error) {
//         // 如果发生错误，返回错误信息
//         return {
//             code: 500, // 或其他适当的错误状态码
//             message: error.message
//         };
//     }

// }



// // 写入
// export async function putTasksContents(blockId,tasksMap) {
//     // 将 Map 转换为普通的 JavaScript 对象
//     let tasksObject = {};
//     tasksMap.forEach((value, key) => {
//         tasksObject[key] = value;
//     });
//     // 将对象转换为 JSON 字符串
//     let jsonContent = JSON.stringify(tasksObject, null, 2);


//     //写入文件，读取文件，保存文件
//     let url = "http://127.0.0.1:6806/api/attr/setBlockAttrs";
//     let data = {
//         "id": blockId,
//         "attrs": {
//           "custom-tasksmap": jsonContent
//         }
//     };

//     try {
//         let response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data)
//         })

//         let response_data = (await response).json();
//         return {
//             code: 0, // 
//             message: response_data
//         };
//     } catch (error) {
//         // 如果发生错误，返回错误信息
//         return {
//             code: 500, // 或其他适当的错误状态码
//             message: error.message
//         };
//     }

// }


// //通过markdown创建文档
// export async function createDocWithMd() {
//     // // 将 Map 转换为普通的 JavaScript 对象
//     // let tasksObject = {};
//     // tasksMap.forEach((value, key) => {
//     //     tasksObject[key] = value;
//     // });
//     // // 将对象转换为 JSON 字符串
//     // let jsonContent = JSON.stringify(tasksObject, null, 2);


//     //写入文件，读取文件，保存文件
//     let url = "http://127.0.0.1:6806/api/block/appendBlock";
//     let data = {
//         "data": "foo**bar**{: style=\"color: var(--b3-font-color8);\"}baz",
//         "dataType": "markdown",
//         "parentID": "20231218154508-sr0xvlc"
//       };

//     try {
//         let response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data)
//         })

//         let response_data = (await response).json();
//         return {
//             code: 0, // 
//             message: response_data
//         };
//     } catch (error) {
//         // 如果发生错误，返回错误信息
//         return {
//             code: 500, // 或其他适当的错误状态码
//             message: error.message
//         };
//     }

// }


// //通过sql查询
// export async function sql() {

//     let url = "http://127.0.0.1:6806/api/query/sql";
//     let data = {
//         "stmt": "SELECT * FROM blocks WHERE content LIKE'%1111111111111%'" 
//       };

//     try {
//         let response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data)
//         })

//         let response_data = (await response).json();
//         return {
//             code: 0, // 
//             message: response_data
//         };
//     } catch (error) {
//         // 如果发生错误，返回错误信息
//         return {
//             code: 500, // 或其他适当的错误状态码
//             message: error.message
//         };
//     }

// }


const apiUrl = "http://127.0.0.1:6806";

async function fetchApi(endpoint, method, data) {
    try {
        const response = await fetch(`${apiUrl}/${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        return {
            code: 0,
            message: responseData,
        };
    } catch (error) {
        return {
            code: 500,
            message: error.message,
        };
    }
}

// 获取tasks
export async function getTasksContents(blockId) {
    return fetchApi("api/attr/getBlockAttrs", "POST", { id: blockId });
}
// 写入task
export async function putTasksContents(blockId, tasksMap) {
    const tasksObject = Object.fromEntries(tasksMap);
    const jsonContent = JSON.stringify(tasksObject, null, 2);
    // console.log(jsonContent)
    return fetchApi("api/attr/setBlockAttrs", "POST", {
        id: blockId,
        attrs: { "custom-tasksmap": jsonContent },
    });
}


// export async function createDocWithMd() {
//     const data = {
//         data: "foo**bar**{: style=\"color: var(--b3-font-color8);\"}baz",
//         dataType: "markdown",
//         parentID: "20231218154508-sr0xvlc",
//     };
//     return fetchApi("api/block/appendBlock", "POST", data);
// }

// sql查询 "SELECT * FROM blocks WHERE content LIKE'%1111111111111%'"
export async function sql(dataSql) {
    const data = {
        stmt: dataSql,
    };
    return fetchApi("api/query/sql", "POST", data);
}
