class HanoiView {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
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
    this.render();
  }
}

module.exports = HanoiView;
