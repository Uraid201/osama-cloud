
const uploadButton = document.getElementById("uploadButton");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");
const searchInput = document.getElementById("searchInput");
const fileCount = document.getElementById("fileCount");

let selectedFiles = [];

uploadButton.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  const newFiles = Array.from(fileInput.files);

  selectedFiles = [...selectedFiles, ...newFiles];

  renderFiles();

  // Allows selecting the same file again.
  fileInput.value = "";
});

searchInput.addEventListener("input", renderFiles);

function formatSize(bytes) {
  if (bytes < 1024) {
    return bytes + " B";
  }

  if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + " KB";
  }

  if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
}

function getFileIcon(file) {
  if (file.type.startsWith("image/")) return "🖼️";
  if (file.type.startsWith("video/")) return "🎬";
  if (file.type.startsWith("audio/")) return "🎵";
  if (file.type.includes("pdf")) return "📕";

  return "📄";
}

function renderFiles() {
  const query = searchInput.value.toLowerCase().trim();

  const visibleFiles = selectedFiles.filter(file =>
    file.name.toLowerCase().includes(query)
  );

  fileCount.textContent =
    visibleFiles.length +
    (visibleFiles.length === 1 ? " file" : " files");

  fileList.replaceChildren();

  if (visibleFiles.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty";

    empty.textContent = query
      ? "No matching files found."
      : "No files selected yet.";

    fileList.appendChild(empty);
    return;
  }

  visibleFiles.forEach(file => {
    const row = document.createElement("div");
    row.className = "file-row";

    const name = document.createElement("div");
    name.className = "file-name";

    const icon = document.createElement("span");
    icon.className = "file-symbol";
    icon.textContent = getFileIcon(file);

    const filename = document.createElement("strong");
    filename.textContent = file.name;

    name.append(icon, filename);

    const size = document.createElement("span");
    size.className = "muted";
    size.textContent = formatSize(file.size);

    const type = document.createElement("span");
    type.className = "muted";
    type.textContent = file.type.startsWith("image/")
      ? "Image"
      : file.type.startsWith("video/")
        ? "Video"
        : "File";

    row.append(name, size, type);
    fileList.appendChild(row);
  });
}

renderFiles();
