const video = document.getElementById('video');
const BASE_URL = 'http://localhost:8080';

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('../models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('../models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('../models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('../models'),
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  let labeledFaceDescriptors;
  (async () => {
    labeledFaceDescriptors = await loadLabeledImages();
  })();

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    if (labeledFaceDescriptors) {
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
      const results = resizedDetections.map((d) =>
        faceMatcher.findBestMatch(d.descriptor)
      );
      results.forEach((result, i) => {
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: result.toString(),
        });
        drawBox.draw(canvas);
        return faceVerifyLogin(result.toString());
      });
    }
  }, 200);
});

function loadLabeledImages() {
  const labels = ['nick@exmaple.com', 'student@lms.com', 'zebr@example.com'];
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 1; i++) {
        const img = await faceapi.fetchImage(
          `${BASE_URL}/img/${label}/${i}.jpg`
        );

        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();

        descriptions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}

const faceVerifyLogin = async (email) => {
  const response = await fetch(`${BASE_URL}/api/face-verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email.split(' ')[0] }),
  });
  const result = await response.json();
  if (result?.status) {
    localStorage.setItem('token', JSON.stringify(result?.data?.token));
    localStorage.setItem('user', JSON.stringify(result?.data?.user));
    if (result?.data?.user?.type == 'admin') {
      window.location.href = '/public/index.html';
    } else {
      window.location.href = '/public/books.html';
    }
  } else {
    alert('Face verificaition failed,Try again or use email to login');
  }
};
