'use strict'
console.log('Starting up');

$(document).ready(init)

$('#submit-form button').on('click' , onSubmit)



function init() {
    renderPortfolios()
}



function renderPortfolios() {
    const projects = getProjects()
    const strHtmls = projects.map((project) => ` <div class="col-md-4 col-sm-6 portfolio-item" data-proj="${project.id}">
    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
      <div class="portfolio-hover">
        <div class="portfolio-hover-content">
          <i class="fa fa-plus fa-3x"></i>
        </div>
      </div>
      <img class="img-fluid" src="img/portfolio/00${project.idx}.jpg" alt="">
    </a>
    <div class="portfolio-caption bg-dark text-light">
      <h4>${project.name}</h4>
      <p class="text-muted">Illustration</p>
    </div>
    </div>
    `)


    $('.portfolio-container').html(strHtmls)
    $('.portfolio-item').on('click' , onOpenModal)
}


function onOpenModal(id) {
    const projId = $(this).data().proj
    const project = getProjectById(projId)
    const strHtml = `
                   <h2>${project.name}</h2>
                    <p class="item-intro text-muted">${project.title}</p>
                    <img class="img-fluid d-block mx-auto" src="img/portfolio/00${project.idx}-full.jpg" alt="">
                    <p>${project.desc}</p>
                    <ul class="list-inline">
                      <li>Date: ${project.publishedAt}</li>
                      <li>Client: Threads</li>
                      <li>Category: Illustration</li>
                    </ul>
                    <button class="btn btn-primary" data-dismiss="modal" type="button">
                      <i class="fa fa-times"></i>
                      Close Project</button>
                      <button class="btn btn-secondery" type="button" onclick="onOpenProj('${project.name}')">Check It Out!</button>

                      `

    $('.modal-body').html(strHtml)
}

function onOpenProj(projName){
    // console.log('hi')
    window.location.href=`projects/${projName}/index.html`
}

function onSubmit(){
    const $elMail = $('.email').val().trim() 
    const $elSubject = $('.subject').val().trim() 
    const $elMessage = $('.message').val().trim() 


    if(!$elMail || !$elSubject|| !$elMessage)    return

    const link = `https://mail.google.com/mail/?view=cm&fs=1&to=${$elMail}&su=${$elSubject}&body=${$elMessage}&bcc=someone.else@example.com`
    window.open(link)

    $('.email').val('')
    $('.subject').val('')
    $('.message').val('')
}