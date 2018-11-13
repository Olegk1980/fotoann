'use strict';

function GetLink(pageNum) {
  let album_id;
  let salt = 's175d4c4372d17fc982d31104b6c37686';
  let page = {
    index: '863420403159',
    portfolio: '863420335063',
    portfolio_wedding: '863420833495',
    portfolio_famaly: '863420873943',
    portfolio_child: '863420911575',
    portfolio_portret: '863420898775'
  };

  switch (pageNum) {
    case 1:
      album_id = page.index;
      break;
    case 2:
      album_id = page.portfolio;
      break;
    case 21:
      album_id = page.portfolio_wedding;
      break;
    case 22:
      album_id = page.portfolio_child;
      break;
    case 23:
      album_id = page.portfolio_famaly;
      break;
    case 24:
      album_id = page.portfolio_portret;
      break;
    default:
      alert('Не удалось определить album_id');
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
      '&access_token=tkn14fszGBpmxBiKNC32otYB2U02sW5j5o6LxlMlBMAdMdhuWBp1HEFm3sQ38g2ky5az3', pageNum);
  }
  return false;
}

function GetAlbum(link, pageNum) {
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
      switch (parseInt(pageNum)) {
        case 1:
          GenerationIndex(album);
          break;
        case 2:
          GenerationPortfolio(album);
          break;
        case 21:
          GenerationPortfolioSubPage(album);
          break;
        case 22:
          GenerationPortfolioSubPage(album);
          break;
        case 23:
          GenerationPortfolioSubPage(album);
          break;
        case 24:
          GenerationPortfolioSubPage(album);
          break;
        case 3:
          GenerationReviews(album);
          break;
        case 4:
          GenerationEvents(album);
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
  document.getElementById('photo-gallery').setAttribute('style', 'display: none;');
  for (let i in album.photos) {
    let card = document.createElement('div');
    let link = document.createElement('a');
    let img = new Image();

    card.setAttribute('class', 'card animated flipInY');

    link.setAttribute('class', 'lightbox');
    link.setAttribute('href', album.photos[i].pic_max);
    link.setAttribute('data-toggle', 'lightbox');
    link.setAttribute('data-gallery', 'gallery');
    link.setAttribute('data-type', 'image');

    img.src = album.photos[i].pic240min;
    img.alt = 'фотограф Анна +79132826264';

    link.appendChild(img);

    card.appendChild(link);

    document.getElementById('photo-gallery').appendChild(card);
  }
  $('#photo-gallery img:last').on('load', function() {
    $('#photo-gallery').removeAttr('style');
  });

  $(document).on("click", '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox({
      wrapping: false,
      alwaysShowClose: true
    });
  });
}

function GenerationPortfolio(album) {
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
        link.setAttribute('href', '/p-famaly');
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

    link.appendChild(img);

    text.innerHTML = album.photos[i].text;
    card.appendChild(text);

    card.appendChild(link);

    document.getElementById('portfolio').appendChild(card);
  }
}

function GenerationPortfolioSubPage(album) {
  //  let totalCount = album.totalCount - 2;
  let numEvent = 4;
  let flag = false;
  let row;
  for (let i in album.photos) {
    let card = document.createElement('div');
    let img = new Image();

    img.src = album.photos[i].pic_max;
    img.alt = 'фотограф Анна +79132826264';

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

/*
//-----------------------------------------------------
//Анимация галереи на первой странице
//-----------------------------------------------------
$(window).on('load', function() {
  if (new RegExp("\/$|\/index").test(location.pathname)) {
    $('#photo-gallery').removeAttr('style');
  }
});
*/

//-----------------------------------------------------
//Анимация перехода по якорю
//-----------------------------------------------------
$(document).on('click', 'a.scroll-smooth[href*="#"]', function(event) {
  event.preventDefault();
  $('html, body').animate({
    scrollTop: $(($.attr(this, 'href')).match(/#.+/)[0]).offset().top
  }, 500);
});

//-----------------------------------------------------
// Back to top
//-----------------------------------------------------
var pxShow = 300; // height on which the button will show 
var fadeInTime = 400; // how slow/fast you want the button to show
var fadeOutTime = 400; // how slow/fast you want the button to hide
var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

// Show or hide the sticky footer button
$(window).scroll(function() {
  if ($(window).scrollTop() >= pxShow) {
    $("#go-top").fadeIn(fadeInTime);
  } else {
    $("#go-top").fadeOut(fadeOutTime);
  }
});
//--------------------------------------------------------
//  Установка копирайта
//--------------------------------------------------------
document.getElementById('tm').innerHTML = '&copy;2018 - ' + new Date().getFullYear() + ' Copyright: <a href="https://olegknyazev.ml/">Oleg Knyazev</a>'
