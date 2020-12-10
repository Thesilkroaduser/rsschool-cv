export default class Meteor {
  constructor(content) {
    this.structure = document.createElement('div');
    this.startPosition = -70;
    this.structure.textContent = content;
    this.structure.classList.add('meteor');
  }

  hideMeteor() {
    this.structure.style.display = 'none';
  }

  blowUpMeteor() {
    this.structure.textContent = '';
    this.structure.classList.add('boom');
    setTimeout(() => this.hideMeteor(), 300);
  }

  // fallDown() {
  //   const timerId = setInterval(() => {
  //     this.startPosition += 1;
  //     this.structure.style.top = `${this.startPosition}px`;
  //     if (this.startPosition > 440) {
  //       this.blowUpMeteor();
  //       clearInterval(timerId);
  //     }
  //   }, 10);
  // }
}
