export default class Meteor {
  constructor(content) {
    this.startPosition = -150;
    this.structure = document.createElement('div');
    this.structure.textContent = content[0];
    this.distructionKey = content[1];
    this.isGolden = false;
    this.structure.classList.add('meteor');
  }

  hideMeteor() {
    this.structure.classList.add('hidden');
  }

  blowUpMeteor(keys, music) {
    this.structure.textContent = '';
    this.structure.classList.add('boom');
    setTimeout(() => this.hideMeteor(), 300);
    const index = keys.indexOf(this.distructionKey);
    keys[index] = null;
    music.currentTime = 0;
    music.play();
  }
}
