const downloadFile = async (data, filename, extension) => {
  const blob = await data.blob();
  const newBlob = new Blob([blob]);
  console.log(filename)

  const blobUrl = window.URL.createObjectURL(newBlob);

  const link = document.createElement("a");
  link.href = blobUrl;
  const fname = filename;
  const ext = extension;
  link.setAttribute("download", `${fname}.${ext}`);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);

  // clean up Url
  window.URL.revokeObjectURL(blobUrl);
};

export default downloadFile;
