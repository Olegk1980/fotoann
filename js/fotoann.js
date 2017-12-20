'use strict';

function CreateParamLink(numPage) {
  let param;
  switch (numPage) {
    case 1:
      param = 'aid=863420403159&application_key=CBAEGMAMEBABABABA&count=100&fields=photo.PIC180MIN&format=json&method=photos.getPhotos&sig=722118adf757acc4b2d411a0da052d1a&access_token=tkn14fszGBpmxBiKNC32otYB2U02sW5j5o6LxlMlBMAdMdhuWBp1HEFm3sQ38g2ky5az3';
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

  httpGet('https://api.ok.ru/fb.do?' + param)

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

      let img = new Image();

      img.src = okAlbum.photos[i].pic180min;

      let link = document.createElement('a');

      link.setAttribute('href', '#');

      link.appendChild(img);

      let list = document.createElement('li');

      list.appendChild(link);

      document.getElementById('tiles').appendChild(list);

    }

  })

  .catch(function genericError(error) {

    alert(error); // Error: Not Found

  });

}


function httpGet(url) {

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
