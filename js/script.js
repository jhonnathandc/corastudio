const btnMenu = document.querySelector('.button-menu-mobile');
const linksMenu = document.querySelectorAll('.menu-mobile-links li');

function handleClick() {
  const isActive = document.body.classList.toggle('active');

  btnMenu.setAttribute('aria-expanded', isActive);

  document.documentElement.style.overflow = isActive ? 'hidden' : 'auto';
}

btnMenu.addEventListener('click', handleClick);

function closeMenu() {
  document.documentElement.style.overflow = 'auto';
  document.body.classList.remove('active');
  btnMenu.setAttribute('aria-expanded', false);
}

linksMenu.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

const container = document.querySelector('.list-projects');
const modal = document.getElementById('project-modal');
const modalBody = document.querySelector('.modal-body');
const modalImage = document.querySelector('.modal-image');
const modalClose = document.querySelector('.modal-close');
const overlay = document.querySelector('.modal-overlay');
const projectTitle = document.querySelector('.project-title');
const projectLink = document.querySelector('.project-link');
const boxContent = document.querySelector('.box-content');

let projectsData = [];

// Renderiza os cards
function renderProjects(projects) {
  projects.forEach((project) => {
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.dataset.id = project.id;

    card.innerHTML = `
      <button>
        <div class="project-title">
          <h3 class="name-project h4 gray-200">${project.nome}</h3>
        </div>

        <div class="project-cover">
          <img src="${project.cover}" alt="${project.nome}">
        </div>
      </button>
    `;

    container.appendChild(card);
  });
}

// Abre modal
function openModal(projectId) {
  const project = projectsData.find((p) => p.id === projectId);
  if (!project) return;

  modalImage.innerHTML = `
    <img src="${project.cover}">
  `;

  projectTitle.innerHTML = `
    <h2 class="h4 white-light">${project.nome}</h2>
  `;

  projectLink.setAttribute('href', project.link);

  boxContent.innerHTML = `
    <h3 class="h6 gray-500">Visão Geral</h3>
    <p class="b3 gray-100">${project.content}</p>
  `;

  modal.classList.add('active');
  document.body.classList.add('modal-open');
  modal.setAttribute('aria-hidden', 'false');
  document.documentElement.style.overflow = 'hidden';
}

// Fecha modal
function closeModal() {
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
  modal.setAttribute('aria-hidden', 'true');
  document.documentElement.style.overflow = 'auto';
}

// Fetch do JSON
fetch('./list-projects.json')
  .then((response) => response.json())
  .then((data) => {
    projectsData = data;
    renderProjects(data);
  })
  .catch((error) => console.error('Erro ao carregar projetos:', error));

// Delegação de evento
container.addEventListener('click', (e) => {
  const card = e.target.closest('.project-card');
  if (!card) return;
  openModal(card.dataset.id);
});

// Eventos de fechar
modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
