document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const transcript = document.getElementById("transcript").value.trim();
  const audioFile = document.getElementById("audio").files[0];
  const result = document.getElementById("result");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("transcript", transcript);

  if (audioFile) {
    formData.append("audio", audioFile);  // ⭐ 必须名为 audio！
  }

  try {
    const res = await fetch("https://lingualisten-backend.onrender.com/materials", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (res.ok) {
      result.textContent = "✅ 上传成功！Material ID = " + data.id;
    } else {
      result.textContent = "❌ 上传失败：" + JSON.stringify(data);
    }

  } catch (err) {
    result.textContent = "❌ 网络错误：" + err.message;
  }
});
