//slick(topのheroイメージに適用)
$(function(){
    $('.fade_slide').slick({
        accessibility: false,
        fade: true,
        autoplay: true,
        infinite: true,
        dots: false,
        arrows: false,
        autoplaySpeed: 3000,
        speed: 1000,
    });
});

//タイトルにspanタグを一文字ずつあてるための関数
const wrapCharSpan = function(str){
     return [...str].map(char => `<span>${char}</span>`).join('');
}
const title = document.querySelectorAll('.title');
title.forEach(el => el.innerHTML = wrapCharSpan(el.textContent.trim()));

//メニュー展開時はスクロールできないようにする為の関数
function handle(event) {
    event.preventDefault();
}

// ハンバーガーメニューを押したときにナビゲーションを開く処理
const nav = document.querySelector('.nav_btn');
const body_element = document.querySelector('body');
nav.addEventListener('click',function() {
    if(body_element.dataset.openmenu == "false"){
        body_element.dataset.openmenu = "true";
        //スクロールを一時的にさせないようにする処理
        document.addEventListener('touchmove', handle, { passive: false });
        document.addEventListener('mousewheel', handle, { passive: false });
    } else {
        body_element.dataset.openmenu = "false";
        //スクロールを解除する処理
        document.removeEventListener('touchmove', handle, { passive: false });
        document.removeEventListener('mousewheel', handle, { passive: false });
    }
});

//タイトルのアニメーションを実行する関数
function showTitle() {
    let scrollValue = window.pageYOffset;
    // 画面の高さを取得
    let windowHeight = window.innerHeight;
    // はみ出させる値
    let value = 150;
    // 条件設定
    for (let i = 0; i < title.length; i++) {
        // 取得した要素のtop値の取得 + スクロール量
        let scrollTop = title[i].getBoundingClientRect().top + scrollValue;
        //条件
        if (scrollValue > scrollTop - windowHeight + value) {
            title[i].classList.add("is-ani");
        }
    }
}

//ロードまたはスクロールしたときにshowSubTitleの関数を実行
$(window).on('load scroll', showTitle);

// ナビゲーションのリンクボタンを押したときにメニューを閉じる処理
const header_link = document.querySelectorAll('.header_nav_item_link');
for(let i = 0; i<header_link.length; i++){
    header_link[i].addEventListener('click',function(){
        if(body_element.dataset.openmenu == "true"){
            body_element.dataset.openmenu = "false";
            //スクロールを解除する処理
            document.removeEventListener('touchmove', handle, { passive: false });
            document.removeEventListener('mousewheel', handle, { passive: false });
        }
    });
}

// タブレットをpc画面の縮小サイズで表示する設定
const baseW = 1040; // viewportのwidth
const ua = navigator.userAgent

const sp = ua.indexOf('iPhone') > -1 ||
(ua.indexOf('Android') > -1 && ua.indexOf('Mobile') > -1)

const tab = !sp && (
ua.indexOf('iPad') > -1 ||
(ua.indexOf('Macintosh') > -1 && 'ontouchend' in document) ||
ua.indexOf('Android') > -1
)

if (tab) {
let viewportContent = "width=" + baseW + "px,user-scalable=no";
document.querySelector("meta[name='viewport']").setAttribute("content", viewportContent);
}

// ページ内リンクへスムーズに移動する処理
window.addEventListener('DOMContentLoaded', () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const anchorLinksArr = Array.prototype.slice.call(anchorLinks);
    const headerHeight = document.querySelector('.header_inner').offsetHeight;
    anchorLinksArr.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.hash;
            const targetElement = document.querySelector(targetId);
            const targetOffsetTop = window.pageYOffset + targetElement.getBoundingClientRect().top - headerHeight - 20;
            window.scrollTo({
                top: targetOffsetTop,
                behavior: "smooth"
            });
        });
    });
});


