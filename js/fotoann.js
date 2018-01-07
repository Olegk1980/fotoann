'use strict';

function CreateParamLink(numPage) {
  let param;
  switch (numPage) {
    case 1:
      param = 'aid=863420403159&application_key=CBAEGMAMEBABABABA&count=100&fields=photo.PIC180MIN%2Cphoto.PIC1024MAX&format=json&method=photos.getPhotos&sig=d1f865e8d4b7d51a0c73f42f60ffa531&access_token=tkn14fszGBpmxBiKNC32otYB2U02sW5j5o6LxlMlBMAdMdhuWBp1HEFm3sQ38g2ky5az3';
      break;
    case 4:
      alert('В точку!');
      break;
    case 5:
      alert('Перебор');
      break;
    default:
      alert('Я таких значений не знаю');
  }
  if (param != undefined) {
    RequestAlbum(param)
  }

}

function RequestAlbum(param) {
  HttpGet('https://api.ok.ru/fb.do?' + param)
    .then(JSON.parse,
      function okError(error) {
        if (error.code == 404) {
          return {
            name: "NoOK",
            avatar_url: 'anon.png'
          };
        } else {
          throw error;
        }
      }
    )
    .then(function okShowFoto(okAlbum) {
      for (var i in okAlbum.photos) {
        //  console.log(i, okAlbum.photos[i].pic180min);
        let list = document.createElement('li');
        let link = document.createElement('a');
        link.setAttribute('class', 'lightbox');
        link.setAttribute('href', okAlbum.photos[i].pic1024max);
        link.setAttribute('data-toggle', 'lightbox');
        link.setAttribute('data-gallery', 'gallery');
        link.setAttribute('data-type', 'image');
        let img = new Image();
        img.src = okAlbum.photos[i].pic180min;
        link.appendChild(img);
        list.appendChild(link);
        document.getElementById('tiles').appendChild(list);
      }
    })
    .then(function GalleryFoto() {
      $(document).on("click", '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox({ wrapping: false });
      });
    })
    .catch(function genericError(error) {
      alert(error); // Error: Not Found
    });
}

function HttpGet(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };
    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };
    xhr.send();
  });
}
