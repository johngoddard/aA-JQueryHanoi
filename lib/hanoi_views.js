class HanoiView {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.moveIdx = null;

    this.setupTowers();
    this.render();

    $('ul').on('click', event => this.clickTower(event));
  }

  render() {
    let game = this.game;
    let $disks = $('li');
    $('li').each( function(){
      let $disk = $(this);
      let pos = $disk.data('pos');
      $disk.removeClass("disk-1 disk-2 disk-3");

      let towerVal = game.towers[pos[0]][pos[1]];

      if (towerVal) {
        $disk.addClass(`disk-${towerVal}`);
      }
    });
  }

  setupTowers() {
    for (let i = 0; i < 3; i++) {
      let $tower = $('<ul></ul>');
      $tower.data('pos', i);
      for (let j = 2; j >= 0; j--) {
        let $disk = $('<li></li>').data('pos', [i, j]);
        $tower.append($disk);
      }
      this.$el.append($tower);
    }
  }

  clickTower(event){
    const $clickedTower = $(event.currentTarget);
    const pos = $clickedTower.data('pos');

    if(this.moveIdx || this.moveIdx === 0){
      $('ul.toggled').removeClass('toggled');
      this.game.move(this.moveIdx, pos);
      this.moveIdx = null;
      this.youWon();
      this.render();
    } else{
      $clickedTower.addClass('toggled');
      this.moveIdx = pos;
    }
  }

  youWon() {
    if (this.game.isWon()) {

      $('body').append('<p>You Won!</p>');
    }
  }
}



module.exports = HanoiView;
