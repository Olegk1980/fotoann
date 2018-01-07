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
        link.setAttribute('href', '#');
        link.setAttribute('class', 'lightbox');
        //link.setAttribute('class', 'thumbnail');
        link.setAttribute('data-image-id', '');
        link.setAttribute('data-toggle', 'modal');
        link.setAttribute('data-image', okAlbum.photos[i].pic1024max);
        link.setAttribute('data-target', '#image-gallery');
        let img = new Image();
        //img.setAttribute('class', 'img-responsive')
        img.src = okAlbum.photos[i].pic180min;
        link.appendChild(img);
        list.appendChild(link);
        document.getElementById('tiles').appendChild(list);
      }
    })
    .then(function GalleryFoto() {

      loadGallery(true, 'a.lightbox');

      //This function disables buttons when needed
      function disableButtons(counter_max, counter_current) {
        $('#show-previous-image, #show-next-image').show();
        if (counter_max == counter_current) {
          $('#show-next-image').hide();
        } else if (counter_current == 1) {
          $('#show-previous-image').hide();
        }
      }

      /**
       *
       * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
       * @param setClickAttr  Sets the attribute for the click handler.
       */

      function loadGallery(setIDs, setClickAttr) {
        var current_image,
          selector,
          counter = 0;

        $('#show-next-image, #show-previous-image').click(function() {
          if ($(this).attr('id') == 'show-previous-image') {
            current_image--;
          } else {
            current_image++;
          }

          selector = $('[data-image-id="' + current_image + '"]');
          updateGallery(selector);
        });

        function updateGallery(selector) {
          var $sel = selector;
          current_image = $sel.data('image-id');
          //$('#image-gallery-caption').text($sel.data('caption'));
          //$('#image-gallery-title').text($sel.data('title'));
          $('#image-gallery-caption').text('test');
          $('#image-gallery-title').text('title');
          $('#image-gallery-image').attr('src', $sel.data('image'));
          disableButtons(counter, $sel.data('image-id'));
        }

        if (setIDs == true) {
          $('[data-image-id]').each(function() {
            counter++;
            $(this).attr('data-image-id', counter);
          });
        }
        $(setClickAttr).on('click', function() {
          updateGallery($(this));
        });
      }
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
