const newHomes = [
  { address: '27569 Cedarwood Drive', sf: '2,535', bedrooms: 3, baths: 2.5, price: '$496,500' },
  { address: '316 Annandale Drive', sf: '1,326', bedrooms: 4, baths: 2, price: '$275,000' },
  { address: '251 Grandview Road', sf: '3,800', bedrooms: 3, baths: 2, price: '$699,900' },
  { address: '28571 Manitoba', sf: '2,960', bedrooms: 4, baths: 3.5, price: '$775,000' },
];
let $addHomeBtn = $('#addHome');

$addHomeBtn.removeClass('btn-danger').addClass('btn-success');

// $('h1.jumbotron').addClass('text-center');
$('h1').addClass('text-center');

const $newLink = $('<br><br><a id="zillowLink" href="http://www.zillow.com">Visit Zillow</a>');

$('body').append($newLink);

// $newLink.insertBefore('table');
// $('table').before($newLink);

// $newLink.eq(2).attr('target', '_blank');
$('#zillowLink').attr('target', '_blank');

console.log($('#zillowLink').attr('href'));
console.log($('#zillowLink').html());

$addHomeBtn.on('click', function (evt) {
  // make sure we have homes left to add
  if (newHomes.length === 0) {
    // return early, will not execute the rest of the function
    return;
  }

  let home = newHomes.pop();

  let newHomeHTML = `<tr>
                      <td>${home.address}</td>
                      <td>${home.sf}</td>
                      <td>${home.bedrooms}</td>
                      <td>${home.baths}</td>
                      <td>${home.price}</td>
                      <td><button class="btn btn-xs btn-danger">Remove</button></td>
                    </tr>`;
  // document.querySelector('#homes tbody').innerHTML += newHomeHTML;
  $('#homes tbody').append(newHomeHTML);

  if (!newHomes.length) {
    $addHomeBtn.attr('disabled', true);
  }
});

console.log($('#homes tbody'));

$('#homes tbody').on('click', 'button', function () {
  console.log('Event Callback:', this);
  $(this)
    .closest('tr')
    .fadeOut(1000, function () {
      console.log('FadeOut Callback:', this);
      $(this).remove();
    });
});
