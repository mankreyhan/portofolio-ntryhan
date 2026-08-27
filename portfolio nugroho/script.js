const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');

menuButton.addEventListener('click', () => navMenu.classList.toggle('active'));
document.querySelectorAll('#navMenu a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// Menampilkan foto profil dan foto project hanya jika file-nya memang sudah dimasukkan.
const profileImg = document.querySelector('.id-photo img');
const profilePlaceholder = document.querySelector('.photo-placeholder');
profileImg.addEventListener('load', () => {
  profileImg.style.display = 'block';
  profilePlaceholder.style.display = 'none';
});
profileImg.addEventListener('error', () => {
  profileImg.style.display = 'none';
  profilePlaceholder.style.display = 'grid';
});

const project = document.querySelector('.project-image');
const projectImg = document.querySelector('.project-image img');
projectImg.addEventListener('load', () => project.classList.add('has-image'));
projectImg.addEventListener('error', () => project.classList.remove('has-image'));

// Kartu profil + lanyard: bergerak bersama dan kembali dengan efek pegas yang lembut.
const rig = document.getElementById('profileRig');
let dragging = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;

function applyRigTransform(x, y, smooth = true) {
  const rotateY = Math.max(-14, Math.min(14, x * 0.12));
  const rotateX = Math.max(-10, Math.min(10, -y * 0.10));
  const rotateZ = 5 + Math.max(-6, Math.min(6, x * 0.035));
  rig.style.transition = smooth ? 'transform .65s cubic-bezier(.18,.82,.24,1)' : 'none';
  rig.style.transform = `translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
  const lanyard = rig.querySelector('.lanyard');
  lanyard.style.transform = `translateX(-50%) rotate(${Math.max(-8, Math.min(8, x * 0.08))}deg)`;
}

rig.addEventListener('pointerdown', (event) => {
  dragging = true;
  startX = event.clientX - currentX;
  startY = event.clientY - currentY;
  rig.classList.add('dragging');
  rig.setPointerCapture(event.pointerId);
});

rig.addEventListener('pointermove', (event) => {
  if (!dragging) return;
  currentX = Math.max(-70, Math.min(70, event.clientX - startX));
  currentY = Math.max(-50, Math.min(50, event.clientY - startY));
  applyRigTransform(currentX, currentY, false);
});

function releaseRig() {
  if (!dragging) return;
  dragging = false;
  rig.classList.remove('dragging');
  currentX = 0;
  currentY = 0;
  applyRigTransform(0, 0, true);
}

rig.addEventListener('pointerup', releaseRig);
rig.addEventListener('pointercancel', releaseRig);

rig.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    rig.classList.add('dragging');
    rig.style.transform = 'translateY(-8px) rotateZ(7deg)';
    setTimeout(() => {
      rig.classList.remove('dragging');
      applyRigTransform(0, 0, true);
    }, 280);
  }
});
