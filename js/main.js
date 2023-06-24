var menu = document.getElementById("menu");
var menuBtn = document.getElementById("menuBtn");
var body = document.body;

const closeMenu = () => {
  menu.classList.remove("active");
  menuBtn.classList.remove("active");
  body.classList.remove("active");
};

menuBtn.onclick = function () {
  menu.classList.toggle("active");
  menuBtn.classList.toggle("active");
  body.classList.toggle("active");
};
window.onclick = function (event) {
  if (event.target == menu) {
    closeMenu();
  }
};

const header = document.getElementById("header");
if (header)
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 400) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

/// Tab
const tabBtn = document.querySelectorAll(".tabBtn");
const tabEvent = document.querySelectorAll(".tabEvent");
const tabsWrapper = document.querySelector(".main__inner-body");
const scrollTo = (item) => {
  if (!item) {
    window.scrollTo(0, 0);
    tabsWrapper.scrollTo(0, 0);
    return;
  }
  console.log("item", item.offsetTop);
  window.scrollTo(0, item.offsetTop);
  tabsWrapper.scrollTo(0, item.offsetTop);
};
if (tabBtn && tabBtn.length > 0) {
  tabBtn.forEach((e) => {
    onTabClick(tabBtn, tabEvent, e);
  });
  function onTabClick(tabBtns, tabItems, item) {
    item.addEventListener("click", function (e) {
      let currentBtn = item;
      let tabId = currentBtn.getAttribute("data-tab");
      let currentTab = document.querySelector(tabId);
      if (!currentBtn.classList.contains("active")) {
        tabBtns.forEach(function (item) {
          item.classList.remove("active");
        });
        tabItems.forEach(function (item) {
          item.classList.remove("active");
        });
        currentBtn.classList.add("active");
        currentTab.classList.add("active");
        scrollTo(null);
        if (currentBtn && currentBtn.dataset?.scrollto) {
          scrollTo(document.querySelector(currentBtn.dataset?.scrollto));
        }
      }
    });
  }
}
const tabNavs = document.querySelectorAll(".tabNav");
if (tabNavs && tabNavs.length > 0) {
  tabNavs.forEach(
    (item) =>
      (item.onclick = () => {
        window.location.replace(`/works/${item.dataset?.tab ?? ""}`);
      })
  );
}

if (window.location.hash) {
  var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
  let activeItem = null;
  if (hash.startsWith("tab-")) {
    tabBtn.forEach((item) => {
      isActive = item.dataset?.tab === `#${hash}`;
      item.classList.toggle("active", isActive);
      activeItem = isActive ? item : null;
    });
    tabEvent.forEach((item) =>
      item.classList.toggle("active", item.id === hash)
    );
    if (activeItem && activeItem.dataset?.scrollto) {
      scrollTo(document.querySelector(activeItem.dataset?.scrollto));
    } else scrollTo(null);
  }
  // hash found
}

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const lazy = entry.target;
      const img = lazy.querySelector('[loading="lazy"]');
      const lazyPreloader = lazy.querySelector(".lazy__preloader");

      img.src = img.dataset.srcset;
      img.onload = () => {
        lazy.classList.add("done");
        lazyPreloader.remove();
      };

      imageObserver.unobserve(lazy);
    }
  });
});
document.querySelectorAll(".lazy").forEach((lazy) => {
  imageObserver.observe(lazy);
});
