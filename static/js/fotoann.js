'use strict';

function GetAlbum(link) {
  fetch(link)
    .then(function(response) {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    })
    .then(function(album) {
      switch ((window.location.pathname).match('\/[\\w-]*')[0]) {
        case '/':
          GenerationIndex(album);
          break;
        case '/portfolio':
          GenerationPortfolio(album);
          break;
        case '/p-wedding':
          GenerationPortfolioSubPage(album);
          break;
        case '/p-children':
          GenerationPortfolioSubPage(album);
          break;
        case '/p-family':
          GenerationPortfolioSubPage(album);
          break;
        case '/p-portret':
          GenerationPortfolioSubPage(album);
          break;
        case '/reviews':
          GenerationReviews(album);
          break;
        case '/photo-event':
          GenerationPhotoEvents(album);
          break;
        default:
          GenerationIndex(album);
      }
    })
    .catch(function(err) {
      console.log(err)
    });
}

function GenerationIndex(album) {
  document.getElementById('photo-gallery').style.visibility='hidden';
  let allImg = album.photos.length;
  
  for (let i in album.photos) {
    let card = document.createElement('div');
    let img = new Image();

    card.setAttribute('class', 'card shadow p-3 mb-3 bg-white rounded');

    img.src = album.photos[i].pic240min;
    img.setAttribute('loading', 'lazy');
    img.setAttribute('data-original', album.photos[i].pic_max);
    img.alt = 'фотограф Анна +79132826264';
    img.addEventListener('load', function() {
      allImg--;
      if(allImg == 0) {
          hiddenPreloading();
          document.getElementById('photo-gallery').style.height = 'auto';
          document.getElementById('photo-gallery').style.visibility='visible';
        }
    });

    card.appendChild(img);
    document.getElementById('photo-gallery').appendChild(card);
  }

  const viewer = new Viewer(document.getElementById('photo-gallery'), {
    url: 'data-original',
    navbar: false,
    title: 4,
    toolbar: {
      zoomIn: false,
      zoomOut: false,
      oneToOne: false,
      reset: false,
      prev: 4,
      play: {
        show: 4,
        size: 'large',
      },
      next: 4,
      rotateLeft: false,
      rotateRight: false,
      flipHorizontal: false,
      flipVertical:false,
    },
    fullscreen: false,
    loop: false,
    rotatable: false,
    ready() {
      viewer.show(true);
    }
  });
}

function GenerationPortfolio(album) {
  document.getElementById('portfolio').style.visibility='hidden';
  let allImg = album.photos.length;
  for (let i in album.photos) {
    let card = document.createElement('div');
    let text = document.createElement('div');
    let link = document.createElement('a');
    let img = new Image();
    switch (parseInt(i)) {
      case 0:
        card.setAttribute('class', 'card');
        text.setAttribute('class', 'text');
        link.setAttribute('href', '/p-wedding');
        break;
      case 1:
        card.setAttribute('class', 'card');
        text.setAttribute('class', 'text');
        link.setAttribute('href', '/p-children');
        break;
      case 2:
        card.setAttribute('class', 'card');
        text.setAttribute('class', 'text');
        link.setAttribute('href', '/p-family');
        break;
      case 3:
        card.setAttribute('class', 'card');
        text.setAttribute('class', 'text');
        link.setAttribute('href', '/p-portret');
        break;
      default:
        card.setAttribute('class', 'card');
        link.setAttribute('href', '/');
    }
    img.src = album.photos[i].pic_max;
    img.alt = 'фотограф Анна +79132826264';
    img.addEventListener('load', function() {
      allImg--;
      if(allImg == 0) {
          hiddenPreloading();
          document.getElementById('portfolio').style.visibility='visible';
        }
    });

    link.appendChild(img);

    text.innerHTML = album.photos[i].text;
    card.appendChild(text);
    card.appendChild(link);

    document.getElementById('portfolio').appendChild(card);
  }
}

function GenerationPortfolioSubPage(album) {
  document.getElementById('photo-gallery').style.visibility='hidden';
  let allImg = album.photos.length;
  
  let numEvent = 4;
  let flag = false;
  let row;
  for (let i in album.photos) {
    let card = document.createElement('div');
    let img = new Image();

    img.src = album.photos[i].pic_max;
    img.alt = 'фотограф Анна +79132826264';
    img.addEventListener('load', function() {
      allImg--;
      if(allImg == 0) {
          hiddenPreloading();
          document.getElementById('photo-gallery').style.visibility='visible';
        }
    });

    card.appendChild(img);

    if ((((++i) % numEvent) == 0) || flag) {
      flag = !flag;
      if (flag) {
        row = document.createElement('div');
      }
      row.setAttribute('class', 'row no-gutters');
      card.setAttribute('class', 'card col-md-6 mb-3');
      row.appendChild(card);
      document.getElementById('photo-gallery').appendChild(row);
    } else {
      card.setAttribute('class', 'card mb-3');
      document.getElementById('photo-gallery').appendChild(card);
    }
  }
}

function GenerationPhotoEvents(album) {
  document.getElementById('photo-event').style.visibility='hidden';
  for (let i in album.photos) {
    let div = document.createElement('div');
    let card = document.createElement('div');
    let img = new Image();
    let card_body = document.createElement('div');

    img.setAttribute('class', 'mw-100');
    img.src = album.photos[i].pic240min;
    img.alt = 'фотограф Анна +79132826264';
    img.addEventListener('load', function() {
      allImg--;
      if(allImg == 0) {
          hiddenPreloading();
          document.getElementById('photo-event').style.visibility='visible';
        }
    });

    card.appendChild(img);

    card_body.setAttribute('class', 'card-body');
    card_body.innerHTML = album.photos[i].text;

    card.setAttribute('class', 'card mb-4');
    card.appendChild(card_body);

    div.setAttribute('class', 'col-sm-6 col-md-4');
    div.appendChild(card);

    document.getElementById('photo-event').appendChild(div);
  }
}

function hiddenPreloading() {
  document.body.classList.add('loaded_hiding');
      window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
      }, 500);
}

//--------------------------------------------------------
// Генерация страниц
//--------------------------------------------------------
  let album_id;
  let salt = 's175d4c4372d17fc982d31104b6c37686';
  let page = {
    index: '863420403159',
    portfolio: '863420335063',
    portfolio_wedding: '863420833495',
    portfolio_family: '863420873943',
    portfolio_child: '863420911575',
    portfolio_portret: '863420898775',
    photo_event: '880688066263'
  };

  switch ((window.location.pathname).match('\/[\\w-]*')[0]) {
    case '/':
      album_id = page.index;
      break;
    case '/index':
        album_id = page.index;
    break;
    case '/portfolio':
      album_id = page.portfolio;
      break;
    case '/p-wedding':
      album_id = page.portfolio_wedding;
      break;
    case '/p-children':
      album_id = page.portfolio_child;
      break;
    case '/p-family':
      album_id = page.portfolio_family;
      break;
    case '/p-portret':
      album_id = page.portfolio_portret;
      break;
    case '/reviews':
      // отзывы
      break;
    case '/photo-event':
      album_id = page.photo_event;
      break;
    default:
      console.log('Could not determine album_id');
  }
  if (album_id != undefined) {
    let sig = 'aid=' + album_id + 'application_key=CBAEGMAMEBABABABAcount=100fields=photo.pic240min,photo.pic_max,photo.textformat=jsonmethod=photos.getPhoto' + salt;
    GetAlbum('https://api.ok.ru/fb.do' +
      '?aid=' + album_id +
      '&application_key=CBAEGMAMEBABABABA' +
      '&count=100' +
      '&fields=photo.pic240min%2Cphoto.pic_max%2Cphoto.text' +
      '&format=json' +
      '&method=photos.getPhotos' +
      '&sig=' + md5(sig) +
      '&access_token=tkn14fszGBpmxBiKNC32otYB2U02sW5j5o6LxlMlBMAdMdhuWBp1HEFm3sQ38g2ky5az3');
  }

  // document.addEventListener('readystatechange', function() {
  //   if(document.readyState == 'complete') {
  //     console.log(document.readyState);
  //     document.querySelector('#photo-gallery').removeAttribute('style');
  //   } else {
  //     console.log(document.readyState);
  //   }
  // });
  
//-----------------------------------------------------
// Обработчик события ссылок страницы
//-----------------------------------------------------



//-----------------------------------------------------
// Анимация перехода по якорю
//-----------------------------------------------------
document.querySelector('a.scroll-smooth[href*="#"]').scrollIntoView({ behavior: 'smooth' });


//-----------------------------------------------------
// Back to top show/hide
//-----------------------------------------------------
var pxShow = 300;       // height on which the button will show 
var fadeInTime = 400;   // how slow/fast you want the button to show
var fadeOutTime = 400;  // how slow/fast you want the button to hide
var scrollSpeed = 300;  // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

window.onscroll = function() {
  if(window.scrollY >= pxShow) {    
    document.getElementById('go-top').style.transition = 'opacity '+fadeInTime+'ms';
    document.getElementById('go-top').style.opacity = '1';
  } else {
    document.getElementById('go-top').style.opacity = '0';
    document.getElementById('go-top').style.transition = 'opacity '+fadeOutTime+'ms';
  }
}

//--------------------------------------------------------
// Установка копирайта
//--------------------------------------------------------
document.getElementById('tm').innerHTML = '&copy;2018 - ' + new Date().getFullYear() + ' Copyright: <a href="https://olegknyazev.ml/">Oleg Knyazev</a>'


