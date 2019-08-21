// show cart
(function() {
  const cartInfo = document.getElementById('cart-info');
  const cart = document.getElementById('cart');

  cartInfo.addEventListener('click', function() {
    cart.classList.toggle('show-cart');
  });
})();

// add items to the cart
(function() {
  const cartBtn = document.querySelectorAll('.store-item-icon');

  cartBtn.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
      if (event.target.parentElement.classList.contains('store-item-icon')) {
        let fullPath = event.target.parentElement.previousElementSibling.src;
        let pos = fullPath.indexOf('img') + 3;
        let partPath = fullPath.slice(pos);

        const item = {};
        item.img = `img-cart${partPath}`;

        let name =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[0].textContent;

        item.name = name;

        let price =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[1].textContent;

        let finalPrice = price.slice(1).trim();

        item.price = finalPrice;

        // console.log(item);

        const cartItem = document.createElement('div');
        cartItem.classList.add(
          'cart-item',
          'd-flex',
          'justify-content-between',
          'text-capitalize',
          'my-3'
        );

        cartItem.innerHTML = `
              <img src="${
                item.img
              }" class="img-fluid rounded-circle" id="item-img" alt="">
              <div class="item-text">
                <p id="cart-item-title" class="font-weight-bold mb-0">
                  ${item.name}</p>
                <span>$</span>
                <span id="cart-item-price" class="cart-item-price mb-0">${
                  item.price
                }</span>
              </div>
              <a href="#" id="cart-item-remove" class="cart-item-remove">
                <i class="fas fa-trash"></i>
              </a>
            `;

        // select cart
        const cart = document.getElementById('cart');
        const total = document.querySelector('.cart-total-container');

        cart.insertBefore(cartItem, total);
        alert('item added to the cart');
        showTotals();
      }
    });
  });

  // show totals
  function showTotals() {
    const total = [];
    const items = document.querySelectorAll('.cart-item-price');

    items.forEach(function(item) {
      total.push(parseFloat(item.textContent));
    });

    const totalMoney = total.reduce(function(total, item) {
      total += item;
      return total;
    }, 0);

    const finalMoney = totalMoney.toFixed(2);

    // console.log(finalMoney);

    document.getElementById('cart-total').textContent = finalMoney;
    document.querySelector('.item-total').textContent = finalMoney;
    document.getElementById('item-count').textContent = total.length;
  }
})();

// Back to top btn
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 800 ||
    document.documentElement.scrollTop > 800
  ) {
    document.getElementById('myBtn').style.display = 'block';
  } else {
    document.getElementById('myBtn').style.display = 'none';
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// filter
filterSelection('all');
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName('filterDiv');
  if (c == 'all') c = '';
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], 'show');
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], 'show');
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(' ');
  arr2 = name.split(' ');
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += ' ' + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(' ');
  arr2 = name.split(' ');
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(' ');
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById('myBtnContainer');
var btns = btnContainer.getElementsByClassName('btn');
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function() {
    var current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
    this.className += ' active';
  });
}
