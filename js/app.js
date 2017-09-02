// const createVideoList = (video, parent) => {
const createVideoList = () => {
  let template = document.getElementById('video_thumbnail');

}

let xhr = null;
const uploadVideo = () =>{
  xhr  = new XMLHttpRequest();
  let title = document.getElementById('video-title-u').value;
  let desc = document.getElementById('video-desc-u').value;
  let cat = document.getElementById('video-category-u').value;
  let video = document.querySelector('#video-video-u').files[0];
  let progress = document.querySelector("#upload-progress");
  let upload = document.querySelector("#upload-video");
  let cancel = document.querySelector("#cancel-upload");
  let done = document.querySelector("#done-upload");
  let retry = document.querySelector("retry-upload");
  upload.disabled = true;
  cancel.disabled = false;
  let url = "https://httpbin.org/post";
  let fd = new FormData();
  xhr.open('POST', url, true);
  xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText); // handle response.
            progress.className = "progress-bar bg-success done";
            progress.innerHTML = "Success!"
            cancel.hidden = true;
            done.hidden = false;
        }else if(xhr.readyState == 4 && xhr.status == 400){
          progress.className = "progress-bar bg-danger done";
          progress.innerHTML = "Error";
          cancel.hidden = true;
          retry.hidden = false;
        }
      }

  xhr.upload.addEventListener("progress", function(e) {
			var pc = parseInt((e.loaded / e.total * 100));
      console.log(pc);
			progress.style.width = pc + '%';
      if(pc == 100){
        cancel.disabled = true;
      }
		}, false);
  fd.append('title',title);
  fd.append('desc',desc);
  fd.append('cat',cat);
  fd.append("video", video);
  xhr.send(fd);
}

const cancelUpload = () => {
  xhr.abort();
  resetUploading(false);
}
const retryUpload = () =>{
  cancelUpload();
  uploadVideo();
}
const resetUploading = (bool) => {
  if(bool){
    xhr = null;
    document.getElementById('video-title-u').value = "";
    document.getElementById('video-desc-u').value = "";
    document.querySelector('#video-video-u').value = "";
    document.querySelector("#done-upload").hidden = true;
  }
  document.querySelector("#cancel-upload").hidden = false;
  document.querySelector("#retry-upload").hidden = true;
  let progress = document.querySelector("#upload-progress");
  progress.style.width = '0%';
  progress.innerHTML = "";
  document.querySelector("#upload-video").disabled = false;
  document.querySelector("#cancel-upload").disabled = true;
}

document.getElementById('upload-video').onclick = uploadVideo;
