export default class Meteor {
  constructor(content) {
    this.startPosition = -70;
    this.structure = document.createElement('div');
    this.structure.textContent = content[0];
    this.distructionKey = content[1];
    this.structure.classList.add('meteor');
  }

  hideMeteor() {
    this.structure.classList.add('hidden');
  }

  blowUpMeteor() {
    this.structure.textContent = '';
    this.structure.classList.add('boom');
    setTimeout(() => this.hideMeteor(), 300);
  }
}
