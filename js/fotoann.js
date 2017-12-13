'use strict';

function RequestAlbum() {

  httpGet('https://api.ok.ru/fb.do?aid=858510026711&application_key=CBAEGMAMEBABABABA&count=100&format=json&method=photos.getPhotos&sig=7e3cd610ed36beaf2b45e832f684dfa4&access_token=tkn14fszGBpmxBiKNC32otYB2U02sW5j5o6LxlMlBMAdMdhuWBp1HEFm3sQ38g2ky5az3')

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

      //  console.log(i, okAlbum.photos[i].pic640x480);

      let img = new Image();

      img.src = okAlbum.photos[i].pic640x480;

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
