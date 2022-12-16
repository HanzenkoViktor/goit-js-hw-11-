export function cardTemplate(props) {
  const {
    webformatURL,
    tags,
    views,
    likes,
    comments,
    downloads,
    largeImageURL,
  } = props;

  return `<div class="photo-card">
      <div class="img-wrapper">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
      </div>
      <div class="info">
        <p class="info-item">
            <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
            <b>Views: ${views}</b>
        </p>
        <p class="info-item">
            <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
            <b>Downloads: ${downloads}</b>
        </p>
      </div>
  </div>`;
}