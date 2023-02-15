const downloadFile = async (data) => {
  const blob = await data.blob();
  const newBlob = new Blob([blob]);

  const blobUrl = window.URL.createObjectURL(newBlob);

  const link = document.createElement("a");
  link.href = blobUrl;
  const filename = "Content";
  const extension = "html";
  link.setAttribute("download", `${filename}.${extension}`);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);

  // clean up Url
  window.URL.revokeObjectURL(blobUrl);
};

export default downloadFile;
