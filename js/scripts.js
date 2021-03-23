$(document).ready(() => {
  //$('#main').height($('#project-list').height())

  const aboutCards = [$('#who'), $('#what'), $('#where')]
  const aboutCardHeight = aboutCards
    .sort((a, b) => b.height() - a.height())[0]
    .height()
  aboutCards.forEach((card) => card.height(aboutCardHeight))

  $.getJSON('data/mywork.json', (response) => {
    let count = 0
    response.projects.forEach((project) => {
      if (project.isImportant) {
        $('#mywork-list').append(getProjectCardHTML(project, count % 2 === 1))
        count += 1
      }
    })
  })

  window.addEventListener('scroll', () => {
    $('#name').css('opacity', ((200 - scrollY) / 200).toString())
    $('#slogan').css('opacity', ((200 - scrollY) / 200).toString())
    if (window.scrollY != 0) {
      $('#nav-bar').css('box-shadow', '0 4px 8px 0 rgba(0, 0, 0, 0.2)')
    } else {
      $('#nav-bar').css('box-shadow', '')
    }
  })
})

const getProjectCardHTML = (project, reverseCard) => {
  let imageSide = reverseCard ? 'right' : 'left'
  let techStackHTML =
    '<ul class="tech-stack-list">' +
    project.technologyStack
      .map((tech) => {
        return `<li><img class="logo" src="images/logos/${tech}.svg"></img></li>`
      })
      .join('') +
    '</ul>'
  return (
    `<li class="card mywork-card ${reverseCard && 'reverse'}">` +
    '<div class="img-container">' +
    `<img class="mywork-card-img card-img-${imageSide} shadow" src=${project.imagePath}></img>` +
    '</div>' +
    '<div class="mywork-card-content">' +
    '<div class="mywork-card-header-row">' +
    `<p class="mywork-card-header">${project.header}</p>` +
    techStackHTML +
    '</div>' +
    `<p class="mywork-card-body">${project.description}</p>` +
    '<div class="mywork-card-button-row">' +
    `<a class="mywork-card-btn" href=${project.demo}>VIEW DEMO</a>` +
    `<a class="mywork-card-btn" href=${project.github}>VIEW IN GITHUB</a>` +
    '</div>' +
    '</div>' +
    '</li>'
  )
}
