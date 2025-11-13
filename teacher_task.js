document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("uploadForm");
  const result = document.getElementById("result");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // 阻止默认提交，保证 JS 可以执行

    const title = document.getElementById("title").value.trim();
    const transcript = document.getElementById("transcript").value.trim();
    const audioFile = document.getElementById("audio").files[0];

    result.textContent = "⏳ 上传中 Uploading...";

    // 构造 multipart/form-data
    const fd = new FormData();
    fd.append("title", title);
    fd.append("transcript", transcript);

    if (audioFile) {
      fd.append("audio", audioFile); // ⭐ audio 字段必须是 UploadFile 才不会 422
    }

    try {
      const response = await fetch("https://lingualisten-backend.onrender.com/materials", {
        method: "POST",
        body: fd,
      });

      if (!response.ok) {
        const errorText = await response.text();
        result.textContent = "❌ 上传失败 Upload failed: " + errorText;
        return;
      }

      const data = await response.json();
      result.textContent = "✅ 上传成功！Material ID: " + data.id;
      form.reset();

    } catch (err) {
      result.textContent = "❌ 网络错误或服务器无响应 Network error.";
      console.error(err);
    }
  });
});
