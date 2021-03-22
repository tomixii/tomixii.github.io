$(document).ready(() => {
  $('#main').height($('#project-list').height())

  $.getJSON('data/mywork.json', (response) => {
    let count = 0
    response.projects.forEach((project) => {
      if (project.isImportant) {
        let reverseCard = count % 2 === 1
        let imageSide = reverseCard ? 'right' : 'left'
        let techStackHTML =
          '<ul class="tech-stack-list">' +
          project.technologyStack
            .map((tech) => {
              return `<li><img class="logo" src="images/logos/${tech}.svg"></img></li>`
            })
            .join('') +
          '</ul>'
        const imageHTML = $('#mywork-list').append(
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
        count += 1
      }
    })
  })

  window.addEventListener('scroll', () => {
    if (window.scrollY != 0) {
      $('#nav-bar').css('box-shadow', '0 4px 8px 0 rgba(0, 0, 0, 0.2)')
    } else {
      $('#nav-bar').css('box-shadow', '')
    }
  })
})
