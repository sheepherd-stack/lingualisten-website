const API_BASE = "https://lingualisten-backend.onrender.com";

// 1. Upload Material
async function uploadMaterial() {
    const text = document.getElementById("materialText").value;
    if (!text) return alert("Please enter text");

    const formData = new FormData();
    formData.append("text", text);

    const audioFile = document.getElementById("audioFile").files[0];
    if (audioFile) formData.append("audio", audioFile);

    const res = await fetch(API_BASE + "/materials", {
        method: "POST",
        body: formData
    });

    const data = await res.json();
    document.getElementById("uploadResult").innerHTML =
        "Uploaded! Material ID: <b>" + data.material_id + "</b>";
}


// 2. Auto Split
async function autoSplit() {
    const mid = document.getElementById("materialId").value;
    if (!mid) return alert("Please enter material ID");

    const res = await fetch(API_BASE + `/materials/${mid}/split`, {
        method: "POST"
    });

    const data = await res.json();
    document.getElementById("splitResult").innerHTML =
        "Split success: " + JSON.stringify(data);
}


// 3. Create Task
async function createTask() {
    const type = document.getElementById("taskType").value;
    const mid = document.getElementById("taskMaterialId").value;

    if (!mid) return alert("Please enter material ID");

    const body = {
        task_type: type,
        material_id: mid,
        user_id: 1  // 未来会改成老师登录ID
    };

    const res = await fetch(API_BASE + "/tasks", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });

    const data = await res.json();
    document.getElementById("taskResult").innerHTML =
        "Task created: Task ID <b>" + data.task_id + "</b>";
}
