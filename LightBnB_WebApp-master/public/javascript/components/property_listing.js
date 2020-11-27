$(() => {
  window.propertyListing = {};
  
  function createListing(property, isReservation) {
    const $listing = $(`
    <article class="property-listing">
        <section class="property-listing__preview-image">
          <img src="${property.thumbnail_photo_url}" alt="house">
        </section>
        <section class="property-listing__details">
          <h3 class="property-listing__title">${property.title}</h3>
          <ul class="property-listing__details">
            <li>number_of_bedrooms: ${property.number_of_bedrooms}</li>
            <li>number_of_bathrooms: ${property.number_of_bathrooms}</li>
            <li>parking_spaces: ${property.parking_spaces}</li>
          </ul>
          ${isReservation ? 
            `<p>${moment(property.start_date).format('ll')} - ${moment(property.end_date).format('ll')}</p>` 
            : ``}
          <footer class="property-listing__footer">
            <div class="property-listing__rating">${Math.round(property.average_rating * 100) / 100}/5 stars</div>
            <div class="property-listing__price">$${property.cost_per_night/100.0}/night</div>
            ${ !isReservation ? `<form method="post" action="/api/reservations">
              <label for="start_date">Start Date: <label><input type="date" name="start_date"/><br/>
              <label for="end_date">End Date: <label><input type="date" name="end_date"/><br/>
              <input type="submit" value="RESERVE"/>
            </form>` : ``}
          </footer>
        </section>
      </article>
    `);
    
    $listing.find('form').on('submit', function(event) {
      event.preventDefault();

      views_manager.show('none');

      const data = $(this).serialize() + `&id=${property.id}`;
      submitReservation(data)
        .then(() => {
          views_manager.show('listings');
        })
        .catch((error) => {
          console.error(error);
          views_manager.show('listings');
        });
      $(this).empty().replaceWith('<span>Reserved!</span>');
    });

    return $listing;
  }

  window.propertyListing.createListing = createListing;

});